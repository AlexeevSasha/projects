import { ISignInPasswordForm } from "../componentPages/signin/interfaces/ISignInPasswordForm";
import { ISignInSmsForm } from "../componentPages/signin/interfaces/ISignInSmsForm";
import { BaseApiService } from "./BaseApiService";
import { SendCodeResponceDto } from "./authRepository";

export type AuthData = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  refresh_token: string;
};

export type UserEntity = {
  name: string;
  policy: string;
  sub: string;
};

class IdentityRepository extends BaseApiService {
  constructor() {
    super("");
  }

  authorization = ({ login, password }: ISignInPasswordForm) => {
    const authDataRequest =
      `client_id=${encodeURIComponent("web.client")}` +
      `&client_secret=${encodeURIComponent("2C78048F-ED10-4DAD-AA1E-54C1C66AA897")}` +
      "&grant_type=password" +
      `&scope=${encodeURIComponent("openid profile webclient-api offline_access")}` +
      `&username=${encodeURIComponent(login)}` +
      `&password=${encodeURIComponent(password)}`;

    return this.post<AuthData>("identity/connect/token", authDataRequest, undefined, {
      "content-type": "application/x-www-form-urlencoded",
    });
  };

  authorizationSMS = ({ phone }: ISignInSmsForm, captcha?: string) => {
    return this.post<SendCodeResponceDto>(
      `profile/Authorization/SendSmsCodeWeb?api-version=1.0&captcha=${captcha}`,
      JSON.stringify({ Phone: phone, Reason: "AuthBySms" }),
      undefined,
      {
        "content-type": "application/json",
      }
    );
  };

  verificationSMS = ({ phone, code }: ISignInSmsForm) => {
    const authDataRequest =
      `client_id=${encodeURIComponent("web.client")}` +
      `&client_secret=${encodeURIComponent("2C78048F-ED10-4DAD-AA1E-54C1C66AA897")}` +
      "&grant_type=phone_number_token" +
      `&scope=${encodeURIComponent("openid profile webclient-api offline_access")}` +
      `&phone_number=${encodeURIComponent(phone)}` +
      `&verification_token=${encodeURIComponent(code || "")}`;

    return this.post<AuthData>("identity/connect/token", authDataRequest, undefined, {
      "content-type": "application/x-www-form-urlencoded",
    });
  };

  fetchUser = (token: string) => this.get<UserEntity>("connect/userinfo", {}, { Authorization: `Bearer ${token}` });
}

export const identityRepository = new IdentityRepository();
