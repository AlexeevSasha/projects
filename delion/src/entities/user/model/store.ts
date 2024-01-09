import { message } from 'antd';
import type { AxiosInstance } from 'axios';
import { makeAutoObservable, toJS, when } from 'mobx';
import type { ErrorResponseResult, VerificationCodeData } from '@shared/api';
import { messageError, messageSuccess } from '@shared/lib';
import { handleVerificationCodeAlreadySended } from '@shared/lib/handleVerificationCodeAlreadySended';
import type { TokenStore } from '@shared/model';
import { RequestStore } from '@shared/model';
import { setting } from 'config/setting';
import { prepareUserData } from '../lib/prepareUserData';
import type { AuthorizedUserData, SendFeedbackPayload, UserData } from './user';
import type { SendCode } from './user';

type Props = {
  axiosInstance: AxiosInstance;
  tokenS: TokenStore;
  initialData: UserStore;
};

export class UserStore {
  client: Props['axiosInstance'];
  request;
  tokenS: Props['tokenS'];
  initialData: Props['initialData'];

  constructor(props: Props) {
    this.client = props.axiosInstance;
    this.tokenS = props.tokenS;
    this.initialData = props.initialData;

    this.request = {
      fetchUser: new RequestStore<UserData>({
        client: this.client,
        url: '/auth/user/',
        method: 'get',
      }),
      loginUser: new RequestStore({ client: this.client, url: '/auth/login/', method: 'post' }),
      loginWithRddm: new RequestStore<AuthorizedUserData>({
        client: this.client,
        url: '/auth/rddm/',
        method: 'post',
      }),
      registerUser: new RequestStore({
        client: this.client,
        url: '/auth/register/',
        method: 'post',
      }),
      logoutUser: new RequestStore({ client: this.client, url: '/auth/logout/', method: 'post' }),
      updateUser: new RequestStore({ client: this.client, url: '/auth/user/', method: 'patch' }),
      fetchEducation: new RequestStore({ client: this.client, url: '/education/', method: 'get' }),
      updateEducation: new RequestStore({
        client: this.client,
        url: '/education/',
        method: 'post',
      }),
      emailConfirm: new RequestStore({
        client: this.client,
        url: '/auth/register/verify-email/',
        method: 'post',
      }),
      resendEmail: new RequestStore({
        client: this.client,
        url: '/auth/register/resend-email/',
        method: 'post',
      }),
      getTgLink: new RequestStore({
        client: this.client,
        url: '/auth/user/get_tg_link/',
        method: 'get',
      }),
      getOrganizerInfo: new RequestStore({
        client: this.client,
        url: '/auth/user/get_organizer_info/',
        method: 'get',
      }),
      getUserById: new RequestStore({
        client: this.client,
        url: '/users/${id}/',
        method: 'get',
      }),
      getUserEducationsById: new RequestStore({
        client: this.client,
        url: '/users/${id}/educations/',
        method: 'get',
      }),
      getUserEventsById: new RequestStore({
        client: this.client,
        url: '/users/${id}/events/',
        method: 'get',
      }),
      dobroSync: new RequestStore({
        client: this.client,
        url: 'auth/user/dobro_sync/',
        method: 'post',
      }),
      schoolboySync: new RequestStore({
        client: this.client,
        url: 'auth/user/schoolboy_sync/',
        method: 'post',
      }),
      dobroLink: new RequestStore({
        client: this.client,
        url: 'auth/user/dobro_link/',
        method: 'post',
      }),
      sendCode: new RequestStore<VerificationCodeData>({
        client: this.client,
        url: '/auth/send_code/',
        method: 'post',
      }),
      verifyCode: new RequestStore<{ detail: string }>({
        client: this.client,
        url: '/auth/verify_code/',
        method: 'post',
      }),
      verifyEmail: new RequestStore<{ key: string }>({
        client: this.client,
        url: '/auth/user/verify_email/',
        method: 'post',
      }),
      sendEmail: new RequestStore<{ detail: string }>({
        client: this.client,
        url: '/auth/user/send_email/',
        method: 'post',
      }),
      sendFeedback: new RequestStore({
        client: this.client,
        url: '/feedback/',
        method: 'post',
      }),
      subscribeNotification: new RequestStore({
        client: this.client,
        url: '/auth/user/subscribe_notification/',
        method: 'post',
      }),
      unSubscribeNotification: new RequestStore({
        client: this.client,
        url: '/auth/user/unsubscribe_notification/',
        method: 'post',
      }),
    };

    makeAutoObservable(this, {
      client: false,
      tokenS: false,
      request: false,
      initialData: false,
    });

    when(
      () => this.tokenS.isRefreshTokenUpdated && !this._user,
      () => this.fetchUser(),
    );
  }

  private _user: Partial<UserData> | null = null;

  public async onOAuthLogin(redirectUrl?: string): Promise<void> {
    // Lazyly getting URL Builder. We need it only on demand of user.
    const LazyOAuthURLBuilder = await import('@shared/lib/services/OAuthURLBuilder').then(
      (module) => module.OAuthUrlBuilder,
    );

    const oauthService = new LazyOAuthURLBuilder();

    // Generating Login Url.
    const URL = await oauthService.generateLoginUrl();
    window.open(`${URL.href}&redirect_uri=${setting.hostname}${redirectUrl ?? ''}`, '_self');
  }

  public get user(): Partial<UserData> | null {
    return toJS(this._user);
  }

  private _education: unknown;

  public get education(): unknown {
    return toJS(this._education);
  }

  public setUser(user: Partial<UserData> | null, isStoreValueUpdate: boolean = false): void {
    // if (user && user.hasOwnProperty('birth_date') && user.birth_date) {
    //   user.birth_date = dayjs(user.birth_date, 'YYYY-MM-DD')
    // }
    if (user && !isStoreValueUpdate) {
      this._user = prepareUserData(user);

      return;
    }

    if (!user) {
      this._user = null;
    }
  }

  public setEducation(value: unknown): void {
    this._education = value;
  }

  public clearUser(): void {
    this.setUser(null);
  }

  loginUser(formValue: unknown) {
    return this.request.loginUser.request({ data: formValue }).then(() => {
      const { status } = this.request.loginUser.result;
      if (status) {
        this.setUser(null);
      }
    });
  }

  loginWithRddm(payload: { code: string; code_verifier: string }) {
    return this.request.loginWithRddm.request({ data: payload }).then(() => {
      const { status, data, errorData } = this.request.loginWithRddm.result;
      if (status && data) {
        return {
          access: data.access_token,
          refresh: data.refresh_token,
          userRole: data.user.groups?.[0],
        };
      } else {
        messageError(errorData?.message ?? 'Невозможно авторизоваться.');
      }
    });
  }

  registerUser(formValue: never) {
    return this.request.registerUser.request({ data: formValue }).then(() => {
      const { status } = this.request.registerUser.result;
      if (status) {
        this.setUser(null);
      }
    });
  }

  logoutUser() {
    return this.request.logoutUser
      .request({
        data: { refresh: this.tokenS.refreshToken },
      })
      .then(() => {
        const { status } = this.request.logoutUser.result;
        if (status) {
          this.clearUser();
          this.tokenS.remove();
        }
      });
  }

  async fetchUser() {
    return await this.request.fetchUser.request<UserData>().then(() => {
      const { status, data } = this.request.fetchUser.result;

      if (status && data) {
        this.setUser(data);
      } else {
        this.setUser(null);
      }
    });
  }

  updateUser(formValue: unknown, isHideSuccessMsg: boolean = false): Promise<void> {
    return this.request.updateUser.request({ data: formValue }).then(() => {
      const { status, data } = this.request.updateUser.result;

      if (status && data) {
        this.setUser(data);
        if (!isHideSuccessMsg)
          message.open({
            duration: 3,
            type: 'success',
            content: 'Данные обновлены успешно!',
          });
      }
    });
  }

  updateEducation(formValue: unknown) {
    return this.request.updateEducation.request({ data: formValue }).then(() => {
      const { status, data } = this.request.updateEducation.result;
      if (status) {
        this.setEducation(data);
        messageSuccess('Данные обновлены успешно!');
      }
    });
  }

  fetchEducation() {
    return this.request.fetchEducation.request().then(() => {
      const { status, data } = this.request.fetchEducation.result;
      this.setEducation(status ? data : undefined);
    });
  }

  resendEmail(email: string) {
    return this.request.resendEmail.request({ data: { email } }).then(() => {
      const { status } = this.request.resendEmail.result;
      if (status) {
        messageSuccess('Письмо для подтверждения отправлено на почту!');
      }
    });
  }

  public async sendCode(
    payload: Partial<SendCode>,
  ): Promise<{ data?: VerificationCodeData; errorData?: ErrorResponseResult }> {
    await this.request.sendCode.request({
      data: payload,
      isNullable: true,
    });

    const { data, errorData } = this.request.sendCode.result;

    if (errorData?.extra) {
      const retriedCodeErrorData = handleVerificationCodeAlreadySended(errorData?.extra);

      if (retriedCodeErrorData) {
        return { data: retriedCodeErrorData };
      } else {
        return { errorData };
      }
    }

    return { data };
  }

  public async verifyCode(payload: { uuid: string; code: string }) {
    await this.request.verifyCode.request({
      data: payload,
      isNullable: true,
    });

    const { data } = this.request.verifyCode.result;
    return data;
  }

  public async sendFeedback(payload: SendFeedbackPayload): Promise<boolean> {
    return await this.request.sendFeedback.request({ data: payload }).then(() => {
      const { status, errorData } = this.request.sendFeedback.result;

      if (!status) {
        messageError(errorData?.message);

        return false;
      }

      messageSuccess('Вы успешно оставили заявку.');

      return true;
    });
  }

  public async sendEmail(email: string) {
    await this.request.sendEmail.request({
      data: { email },
    });

    const { data } = this.request.sendEmail.result;

    if (data) {
      messageSuccess(`На ${email} отправлено письмо с подтверждением`);
    }

    return !!data;
  }

  public async verifyEmail(key: string) {
    await this.request.verifyEmail.request({
      data: { key },
      isNullable: true,
    });

    const { data, errorData } = this.request.verifyEmail.result;

    if (!data) {
      messageError(errorData?.message || 'Мы не смогли подтвердить вашу почту');
      return;
    }

    messageSuccess('Ваша почта успешно подтверждена');
  }

  public async actionSubscriptionEmail(action: 'on' | 'off') {
    const requestType = action == 'on' ? 'subscribeNotification' : 'unSubscribeNotification';
    await this.request[requestType].request();

    const { status, errorData } = this.request[requestType].result;

    if (!status) {
      messageError(errorData?.message || 'Не удалось оптисаться/подписаться');
      return false;
    }

    return true;
  }
}
