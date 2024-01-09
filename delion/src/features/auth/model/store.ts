import { isBrowser } from '@ant-design/pro-utils';
import type { AxiosInstance } from 'axios';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { makeAutoObservable, toJS } from 'mobx';
import {
  makePersistable,
  isHydrated,
  clearPersistedStore,
  stopPersisting,
} from 'mobx-persist-store';
import type { AuthorizedUserData, UserStore } from '@entities/user';
import type { VerificationCodeData } from '@shared/api';
import type { ErrorResponseResult } from '@shared/api/models';
import { PHONE_CODE } from '@shared/const';
import { messageError } from '@shared/lib';
import { handleVerificationCodeAlreadySended } from '@shared/lib/handleVerificationCodeAlreadySended';
import type { TokenStore } from '@shared/model';
import { RequestStore } from '@shared/model';
import { AFTER_LOGIN_REDIRECT_URL } from './auth';

type AuthStoreData = {
  phone: string | null;
  uuid: string | null;
  resendTimestamp: Dayjs | null;
  hasError: boolean;
};

type Props = {
  axiosInstance: AxiosInstance;
  userS: UserStore;
  tokenS: TokenStore;
};

export class AuthStore {
  client: AxiosInstance;
  userS: UserStore;
  request;
  tokenS: TokenStore;
  _authData: Partial<AuthStoreData> | null;

  constructor(props: Props) {
    this.client = props.axiosInstance;
    this.userS = props.userS;
    this.tokenS = props.tokenS;
    this._authData = {
      hasError: false,
    };

    this.request = {
      signInCode: new RequestStore<VerificationCodeData>({
        client: this.client,
        url: '/auth/signin_code/',
        method: 'post',
      }),
      authorizeByCode: new RequestStore<AuthorizedUserData>({
        client: this.client,
        url: '/auth/authorize/',
        method: 'post',
      }),
      signInByPassword: new RequestStore<AuthorizedUserData>({
        client: this.client,
        url: '/auth/signin_password/',
        method: 'post',
      }),
    };

    makeAutoObservable(this, {
      client: false,
      tokenS: false,
      userS: false,
    });

    makePersistable(this, {
      name: 'auth-state',
      properties: ['_authData'],
      storage: isBrowser() ? window.localStorage : undefined,
    });
  }

  private setAuthData(data: Partial<AuthStoreData>): void {
    this._authData = { ...this.authData, ...data };
  }

  private clearAuthData() {
    this._authData = null;
  }

  // Clearing persisted data. Manual cleanup. Cleaning after successfull auth.
  async clearStoredDate() {
    this.clearAuthData();
    await clearPersistedStore(this);
  }

  // Verifying that store is inited withing localstorage data.
  public get isAuthStoreInited(): boolean {
    return isHydrated(this);
  }

  public get authData(): Partial<AuthStoreData> | null {
    return toJS(this._authData);
  }

  public setAuthPhone(phone: string): void {
    this.setAuthData({ phone });
  }

  // Очистка стора после успешного логина. Превент memory-leaking.
  private stopStore() {
    stopPersisting(this);
  }

  public async verifyPhone(payload: { phone: string; is_sms: boolean }): Promise<void> {
    return this.request.signInCode
      .request({ data: { ...payload, phone: `${PHONE_CODE}${payload.phone}` } })
      .then(() => {
        const { status, data, errorData } = this.request.signInCode.result;

        if (status && data) {
          this.setAuthData({
            phone: payload.phone,
            uuid: data.uuid,
            resendTimestamp: dayjs().add(data.resend_timeout, 's'),
            hasError: false,
          });
        } else {
          this.onVerificationCodeAlreadySended(errorData?.extra);
        }
      });
  }

  public onVerificationCodeAlreadySended(extra?: ErrorResponseResult['extra']) {
    const retriedExtra = handleVerificationCodeAlreadySended(extra);

    if (retriedExtra?.uuid && retriedExtra?.resend_timeout) {
      this.setAuthData({
        ...retriedExtra,
        hasError: false,
        resendTimestamp: dayjs().add(retriedExtra.resend_timeout, 's'),
      });
      messageError('Код уже был отправлен!');
    } else {
      messageError('Что-то пошло нет так.');
      this.setAuthData({
        hasError: true,
      });
    }
  }

  public get afterLoginUrlBasedOnRole(): string {
    if (!this.userS.user?.userRole) {
      return '/';
    }

    return AFTER_LOGIN_REDIRECT_URL[this.userS.user?.userRole];
  }

  public async signInByCode(payload: { code: string }): Promise<void> {
    return this.request.authorizeByCode
      .request({ data: { uuid: this.authData?.uuid, code: payload.code } })
      .then(() => {
        const { status, data, errorData } = this.request.authorizeByCode.result;

        if (status && data) {
          this.tokenS.setRefreshToken(data.refresh_token);
          this.tokenS.setAccessToken(data.access_token);
          this.tokenS.startRefreshTokenTimer();
          this.userS.setUser(data.user);
          this.clearStoredDate();
          this.stopStore();
        } else {
          messageError(errorData?.message ?? 'Что-то пошло не так.');
        }
      });
  }

  public async signInByPass(payload: { username: string; password: string }): Promise<void> {
    return this.request.signInByPassword
      .request({ data: { ...payload, username: `${PHONE_CODE}${payload.username}` } })
      .then(() => {
        const { status, data, errorData } = this.request.signInByPassword.result;

        if (status && data) {
          this.tokenS.setAccessToken(data.access_token);
          this.tokenS.setRefreshToken(data.refresh_token);
          this.tokenS.startRefreshTokenTimer();
          this.userS.setUser(data.user);
          this.clearStoredDate();
          this.stopStore();
        } else {
          messageError(errorData?.message ?? 'Невозможно найти такого пользователя');
        }
      });
  }
}
