import { SignUpFormValues } from "../componentPages/autn/signup";
import { BaseApiService } from "./BaseApiService";

export type SendRegisterSmsCodeDto = {
  userId: string;
};

export type CheckRegisterSmsCodeDto = {
  userId: string;
  smsCode: string;
};

export type CheckRegisterEmailCodeDto = {
  userId: string;
  code: string;
};

export type SendEmailCode = {
  email: string;
  messageType: string;
};

export type SendSmsCode = {
  Phone: string;
  Reason: string;
};

export type CheckCodeDto = {
  id: string;
  code: string;
};

export type ResetPasswordDto = {
  newPassword: string;
  id: string;
};

export type SendCodeResponceDto = {
  Success: boolean;
  NoUntil: number;
};

class AuthRepository extends BaseApiService {
  constructor() {
    super("profile/Authorization/");
  }

  tryRegisterUser = (body: SignUpFormValues) => this.post<string>("TryRegisterUser", JSON.stringify(body));

  registerUser = (body: SignUpFormValues, source?: string | string[]) =>
    this.post<string>(`RegisterUser${source ? `?source=${source}` : "?source=website"}`, JSON.stringify(body), null);

  sendRegisterSmsCode = (body: SendRegisterSmsCodeDto, captcha: string) =>
    this.post<SendCodeResponceDto>(`SendRegisterSmsCodeWeb?captcha=${captcha}`, JSON.stringify(body));

  sendRegisterEmailCode = (body: string, captcha: string) =>
    this.post<SendCodeResponceDto>(`SendRegisterEmailCodeWeb?captcha=${captcha}`, JSON.stringify(body));

  checkRegisterSmsCode = (body: CheckRegisterSmsCodeDto) =>
    this.post<string>("CheckRegisterSmsCode", JSON.stringify(body));

  checkRegisterEmailCode = (body: CheckRegisterEmailCodeDto) =>
    this.post<string>("CheckRegisterEmailCode", JSON.stringify(body));

  sendSmsCode = (body: SendSmsCode, captcha: string) =>
    this.post<SendCodeResponceDto>(`SendSmsCodeWeb?captcha=${captcha}`, JSON.stringify(body));

  sendEmailCode = (body: SendEmailCode, captcha: string) =>
    this.post<SendCodeResponceDto>(`SendEmailCodeWeb?captcha=${captcha}`, JSON.stringify(body));

  checkSmsCode = (body: CheckCodeDto) => this.post<string>("CheckSmsCodeForResetPassword", JSON.stringify(body));

  checkEmailCode = (body: CheckCodeDto) => this.post<string>("CheckEmailCodeForResetPassword", JSON.stringify(body));

  checkAbility = (body: string) =>
    this.post<string>("CheckAbilityToResetPassword", JSON.stringify(body), null).then((res) => res || undefined);

  resetPassword = (body: ResetPasswordDto) => this.post<string>("ResetPassword", JSON.stringify(body), null);
}

export const authRepository = new AuthRepository();
