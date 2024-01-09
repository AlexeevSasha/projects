import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import type MobxCookie from 'mobx-cookie';
import Cookie from 'mobx-cookie';
import { messageError } from '@shared/lib';

export class TokenStore {
  _accessToken: MobxCookie;
  _refreshToken: MobxCookie;
  _isRefreshTokenUpdated: boolean;
  refreshTokenTimeout?: NodeJS.Timeout;

  constructor() {
    this._accessToken = new Cookie('accessToken');
    this._refreshToken = new Cookie('refreshToken');
    this._isRefreshTokenUpdated = false;

    makeAutoObservable(this);

    if (!this.refreshTokenTimeout) {
      this.updateRefreshToken();
    }
  }

  public get accessToken(): MobxCookie['value'] {
    return this._accessToken.value;
  }

  public get refreshToken(): MobxCookie['value'] {
    return this._refreshToken.value;
  }

  public get isRefreshTokenUpdated() {
    return this._isRefreshTokenUpdated;
  }

  public setRefreshTokenUpdated(isUpdated: typeof this._isRefreshTokenUpdated) {
    return (this._isRefreshTokenUpdated = isUpdated);
  }

  public setAccessToken(token: string) {
    this._accessToken?.set(token, { expires: 365 });
  }

  public setRefreshToken(token: string) {
    this._refreshToken.set(token, { expires: 365 });
  }

  private setRefreshTokenTimeout(data: NodeJS.Timeout) {
    this.refreshTokenTimeout = data;
  }

  public remove() {
    this._accessToken.remove();
    this._refreshToken.remove();
    this.setRefreshTokenUpdated(false);
  }

  // Returns flag identifyier of returned refresh token status.
  public async updateRefreshToken() {
    this.stopRefreshTokenTimer();

    if (this.refreshToken) {
      try {
        const rs = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh/`, {
          refresh: this.refreshToken,
        });
        const { access, refresh } = rs.data;
        this.setAccessToken(access);
        this.setRefreshToken(refresh);
        this.startRefreshTokenTimer();

        this.setRefreshTokenUpdated(true);
      } catch (_error) {
        console.log('refresh_token error:', _error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (_error.code !== 'ERR_NETWORK') {
          this.remove();
        } else {
          messageError('Потеряно интернет соединение!');
        }
      }
    } else {
      this.remove();
    }
  }

  public startRefreshTokenTimer() {
    const jwtToken = JSON.parse(atob(this.accessToken!.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);

    const timeout = expires.getTime() - Date.now();

    this.setRefreshTokenTimeout(setTimeout(async () => await this.updateRefreshToken(), timeout));
  }

  public stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
