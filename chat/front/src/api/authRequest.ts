import { BaseRequest } from "@/api/baseRequest";
import { IAuthResponse, IAuthSighIn, IAuthSighUp } from "@/modules/auth/interfaces/auth";
import { urlApiPath } from "@/common/constants/urlApiPath";

export class AuthRequest extends BaseRequest {
  async signin(payload: IAuthSighIn): Promise<IAuthResponse | void> {
    try {
      return await this.post<IAuthResponse>(urlApiPath.auth.signin, JSON.stringify(payload));
    } catch (error) {
      console.error("AuthRequest-signin", error);
    }
  }
  async signup(payload: IAuthSighUp): Promise<IAuthResponse | void> {
    try {
      return await this.post<IAuthResponse>(urlApiPath.auth.signup, JSON.stringify(payload));
    } catch (error) {
      console.error("AuthRequest-signup", error);
    }
  }
  async logout(): Promise<void> {
    try {
      await this.get(urlApiPath.auth.logout);
    } catch (error) {
      console.error("AuthRequest-logout", error);
    }
  }
}
