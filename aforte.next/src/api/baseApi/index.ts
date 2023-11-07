import { AxiosRequestConfig } from "axios";
import { isDev } from "common/constants/variables";
import { axiosInstans } from "./axios";
import { handleError } from "./handleError";
import { BaseRequest } from "../../common/interfaces/baseResponse";
import { QueryT } from "../../common/interfaces/query";

type HttpMethod = "get" | "post" | "put" | "delete";
type Params = [string, (unknown | AxiosRequestConfig)?, AxiosRequestConfig?];
type Options = AxiosRequestConfig & { url?: string };

const config = (params?: AxiosRequestConfig) => ({
  headers: { "content-type": "application/json; charset=UTF-8" },
  ...params,
});

const fetch = (url: string, method: HttpMethod, { data, ...options }: Options = {}) => {
  const path =
    (options.url || process.env.NEXT_PUBLIC_BACK_URL || process.env.SERVER_URL || "") + url;

  if (isDev) console.log(`%c ${method?.toUpperCase()}: `, "color: #29acf2;", path);

  const params: Params = [path];
  data && params.push(data);
  params.push(config(options));

  return axiosInstans[method](...params)
    .then((res) => res.data)
    .catch(handleError);
};

export const api = {
  get: <T>(uri: string, options?: Options): Promise<BaseRequest<T>> => fetch(uri, "get", options),
  post: <T>(uri: string, options?: Options): Promise<BaseRequest<T>> => fetch(uri, "post", options),
  put: <T>(uri: string, options?: Options): Promise<BaseRequest<T>> => fetch(uri, "put", options),
  delete: <T>(uri: string, options?: Options): Promise<BaseRequest<T>> =>
    fetch(uri, "delete", options),
  config,
};

export const setQueryParams = (obj: QueryT) =>
  Object.entries(obj)
    .map(([key, value]) => (value || value === null ? `${key}=${encodeURI(String(value))}` : ""))
    .filter((item) => !!item)
    .join("&");
