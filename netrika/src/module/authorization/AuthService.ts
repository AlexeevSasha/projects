import { User, UserManager } from "oidc-client";
import { AppSettings } from "../../common/constants/appSettings";

export class AuthService {
  public userManager: UserManager;

  constructor() {
    const settings = {
      authority: AppSettings.get("authority"),
      client_id: AppSettings.get("clientId"),
      redirect_uri: `${window.location.origin}${AppSettings.get("REACT_APP_ROOT_FOLDER")}${AppSettings.get(
        "redirect_uri"
      )}`,
      post_logout_redirect_uri: `${window.location.origin}${AppSettings.get("REACT_APP_ROOT_FOLDER")}${AppSettings.get(
        "redirect_uri_iemk"
      )}`,
      response_type: AppSettings.get("responseType"),
      scope: AppSettings.get("clientScope"),
      client_secret: AppSettings.get("clientSecret"),
    };
    this.userManager = new UserManager(settings);
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect({ state: window.location.pathname });
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  public redirect(): Promise<User> {
    return this.userManager.signinRedirectCallback();
  }
}
