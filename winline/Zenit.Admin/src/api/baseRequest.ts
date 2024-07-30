import { message } from "antd";
import i18next from "i18next";
import store from "../core/redux/store";
import { clearStorageAndCookie } from "../common/helpers/authorization/storageHandlers";
import { getException, IError } from "../common/helpers/getRequestErrors";
import { getToken } from "../common/helpers/getToken";
import { clearAuthData } from "../modules/authorization/authSlice";
import camelcaseKeys from "camelcase-keys";
import { refreshUser } from "../modules/authorization/authorizationActionAsync";
import { TimerController } from "../modules/authorization/constants/TimerController";

export interface IRequestBaseBody {
  method: string;
  body?: string | object | undefined;
}

export type RequestGenericType = string | object;

const base = process.env.REACT_APP_API;

const request = async (url: string, data: IRequestBaseBody, bodyType?: string, baseToken?: string): Promise<any> => {
  const token = baseToken ? baseToken : getToken();
  const headersForToken = token
    ? {
        Authorization: `Bearer ${token}`
      }
    : {};
  const headerForMultiPart = bodyType
    ? {
        "Content-Type": bodyType
      }
    : {};
  const response = await fetch(url, {
    ...data,
    // @ts-ignore
    headers: {
      ...headersForToken,
      ...headerForMultiPart
    }
  });
  if (response.ok) {
    if (response.headers.get("Content-Length") === "0") {
      return true;
    }
    const typeResponse = response.headers.get("Content-Type");
    let result;
    if (typeResponse && /json/.test(typeResponse)) {
      result = await response.json();

      return result;
    }
    result = await response.blob();

    return result;
  } else {
    if (response.status == 401) {
      return await refreshApp(async () => request(url, data, bodyType));
    }
    const bodyError = await response.json();
    if (response.status == 500) {
      message.error(i18next.t(bodyError.message));

      return;
    }
    if (response.headers.get("Content-Length") === "0" || !response.headers.get("Content-Length")) {
      const errors = bodyError.errors;
      if (bodyError.error_description) {
        message.error(i18next.t(`back:validations.${bodyError.error_description}`));
      }
      if (errors) {
        Object.values(errors).map((error: any, i) =>
          error.map((elem: { errorCode: IError }) =>
            message.error(Object.keys(errors)[i] + ": " + i18next.t(`${process.env.REACT_APP_API_LOCALE_NS}:${elem.errorCode}`))
          )
        );
      } else {
        message.error(i18next.t(`back:${bodyError.type}`));
      }
    } else {
      if (bodyError.data.Type !== "AcceptEmployeeRequest") {
        message.error(i18next.t(getException(bodyError.type)));
      }
    }
    throw { status: response.status };
  }
};

export const get = async (url: string, bodyType?: string, token?: string) => {
  const response = await request(`${base}${url}`, { method: "GET" }, bodyType, token);

  return response.value ? { ...response, value: camelcaseKeys(response.value, { deep: true }) } : response;
};

export const post = async <T extends RequestGenericType>(url: string, body: T, bodyType?: string) => {
  return request(`${base}${url}`, { method: "POST", body }, bodyType);
};

export const remove = async (url: string) => request(`${base}${url}`, { method: "DELETE" });

export const put = async <T extends RequestGenericType>(url: string, body?: T, bodyType?: string) => {
  return request(`${base}${url}`, { method: "PUT", body }, bodyType);
};

export const refreshApp = async (method?: <T>(...args: any[]) => Promise<T>) => {
  if (!navigator.onLine) {
    return;
  }
  const authData = store.getState().authData;
  const metaDataRefresh = await store.dispatch(refreshUser({ ...authData.authData, remember: authData.userInfo.remember }));
  if (metaDataRefresh.meta.requestStatus === "rejected") {
    logout();
  } else {
    if (method) {
      return await method();
    }
  }
};

export const logout = () => {
  clearStorageAndCookie();
  store.dispatch(clearAuthData());
  TimerController.clearTimers();
};
