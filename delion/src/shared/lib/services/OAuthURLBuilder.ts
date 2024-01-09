import { encode as base64encode } from 'base64-arraybuffer';
import Cookie from 'mobx-cookie';
import randomstring from 'randomstring';
import { setting } from 'config/setting';

export class OAuthUrlBuilder {
  private oauthState: string;
  private oauthCodeVerifier: string;

  constructor() {
    this.oauthState = randomstring.generate();
    this.oauthCodeVerifier = randomstring.generate(128);
  }

  public async generateLoginUrl(): Promise<URL> {
    const oauthUrl = new URL(setting.rddmOauthURL as string);

    oauthUrl.searchParams.set('response_type', 'code');
    oauthUrl.searchParams.set('code_challenge_method', 'S256');
    oauthUrl.searchParams.set('client_id', setting.clientId as string);
    oauthUrl.searchParams.set('scope', 'openid profile');
    oauthUrl.searchParams.set('state', this.oauthState);

    await this.getCodeChallenge().then((challenge) => {
      oauthUrl.searchParams.set('code_challenge', challenge);
    });

    return oauthUrl;
  }

  private async generateCodeChallenge(codeVerifier: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    const base64Digest = base64encode(digest);

    return base64Digest.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  private async getCodeChallenge(): Promise<string> {
    this.saveAndStateVerifier();

    return await this.generateCodeChallenge(this.oauthCodeVerifier);
  }

  private saveAndStateVerifier() {
    // In case we were successfully redirected from auth service.
    if (window.location.search.includes('state')) {
      return;
    }

    // Updating cookies each time we trying to reach oauth.
    const sessionStateCookie = new Cookie('session_state');
    const codeVerifierCookie = new Cookie('code_verifier');

    sessionStateCookie.remove();
    codeVerifierCookie.remove();

    if (this.oauthState && this.oauthCodeVerifier) {
      sessionStateCookie.set(this.oauthState);
      codeVerifierCookie.set(this.oauthCodeVerifier);
    }
  }
}
