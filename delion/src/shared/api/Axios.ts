import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import dayjs from 'dayjs';
import { when } from 'mobx';
import qs from 'qs';
import { DATE_FORMAT, DATE_REGEX } from '@shared/const';
import type { TokenStore } from '@shared/model/TokenStore';

export const axiosInstance = (token_store: TokenStore) => {
  const $axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  $axios.defaults.headers.post['Content-Type'] = 'application/json';
  $axios.defaults.headers.put['Content-Type'] = 'application/json';
  $axios.defaults.headers.patch['Content-Type'] = 'application/json';

  $axios.interceptors.request.use(
    (config) => {
      const token = token_store.accessToken;
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      if (config.url?.includes('undefined')) {
        return config;
      }
      return config;
    },
    (err) => {
      console.error(err);
    },
  );

  $axios.defaults.paramsSerializer = {
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: 'comma' });
    },
  };

  const createUpdateAuthInterceptor = async (error: AxiosError) => {
    const originalConfig = error.config as InternalAxiosRequestConfig & { _retry: boolean };

    const isRetryable =
      originalConfig && error.response && error.response.status === 401 && !originalConfig._retry;

    if (isRetryable) {
      originalConfig._retry = true;
      await token_store.updateRefreshToken();

      const retriedRequest = axiosInstance(token_store).request(originalConfig);

      when(
        () => token_store.isRefreshTokenUpdated,
        async () => await retriedRequest,
      );

      return retriedRequest;
    }

    return Promise.reject(error);
  };

  const transformResponseData = (response: AxiosResponse) => {
    // Check if the response data is in JSON format
    if (response.headers['content-type'] === 'application/json') {
      // Recursively transform all dates in the response data
      response.data = transformDates(response.data);
    }
    return response;
  };

  const transformDates = (data: AxiosResponse['data']): unknown => {
    if (!data) return data;
    // If the data is a string and matches the expected date format, convert it to a dayjs object
    if (typeof data === 'string' && DATE_REGEX.test(data) && dayjs(data, DATE_FORMAT).isValid()) {
      return dayjs(data, DATE_FORMAT);
    }
    // If the data is an object or array, recursively transform any nested dates
    else if (typeof data === 'object' && !Array.isArray(data)) {
      // Recursively transform any nested objects
      return Object.keys(data).reduce((object: Record<string, unknown>, key) => {
        object[key] = transformDates(data[key]);
        return object;
      }, {});
    } else if (Array.isArray(data)) {
      // Recursively transform any nested arrays
      return data.map((value) => transformDates(value));
    } else {
      // Return non-date values unchanged
      return data;
    }
  };

  $axios.interceptors.response.use(transformResponseData);
  $axios.interceptors.response.use(null, createUpdateAuthInterceptor);
  return $axios;
};

export const getForServerSide = async (token: string) => {
  const $axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  $axios.defaults.headers.post['Content-Type'] = 'application/json';
  $axios.defaults.headers.put['Content-Type'] = 'application/json';
  $axios.defaults.headers.patch['Content-Type'] = 'application/json';

  $axios.interceptors.request.use(
    function (config) {
      if (token) {
        config.headers['Authorization'] = `Token ${token}`;
      }
      if (config.url?.includes('undefined')) {
        delete config.url;
        return config;
      }
      return config;
    },
    (err) => {
      console.error(err);
    },
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const createUpdateAuthInterceptor = (error) => {
    if (error.response && error.response.status === 401) {
      throw new axios.Cancel('User token was changed.');
    }
    return Promise.reject(error);
  };

  const updateAuthCb = await createUpdateAuthInterceptor(axios);

  $axios.interceptors.response.use(null, updateAuthCb);
  return $axios;
};
