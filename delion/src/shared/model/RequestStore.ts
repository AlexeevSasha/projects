import type { AxiosError, AxiosInstance, AxiosPromise, AxiosResponse, ResponseType } from 'axios';
import { makeAutoObservable, toJS } from 'mobx';
import type { ErrorResponseResult, RequestResult } from '@shared/api/models';
import { messageError } from '@shared/lib';

type Props = {
  client: AxiosInstance;
  url: string;
  method: 'get' | 'post' | 'patch' | 'put' | 'delete';
  hideErrorMessageBlock?: boolean;
};

interface RequestProps<T> {
  data?: T;
  urlProps?: {};
  isBlob?: boolean;
  isNullable?: boolean;
  avoidErrors?: boolean;
}
const interpolate = (row: unknown, params: object) => {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${row}\`;`)(...vals);
};

export class RequestStore<ResponseData> {
  readonly client: Props['client'];
  private readonly url: Props['url'];
  private readonly method: Props['method'];
  private readonly hideErrorMessageBlock: Props['hideErrorMessageBlock'];

  public constructor(props: Props) {
    this.client = props.client;
    this.url = props.url;
    this.method = props.method;
    this.hideErrorMessageBlock = !!props?.hideErrorMessageBlock;
    makeAutoObservable(this, {
      client: false,
    });
  }

  private _loader: boolean = false;

  public get loader(): boolean {
    return this._loader;
  }

  public get result(): RequestResult<ResponseData | undefined> {
    return {
      status: this.status,
      data: this.data,
      errorData: this.errorData,
      statusCode: this.statusCode,
    };
  }

  private _status: boolean = false;

  private get status(): boolean {
    return this._status;
  }

  private _statusCode: number = 0;

  private get statusCode(): number {
    return this._statusCode;
  }

  private _data: ResponseData | undefined = undefined;
  private _errorData: ErrorResponseResult | undefined = undefined;

  private get data(): ResponseData | undefined {
    return toJS(this._data);
  }

  private get errorData(): ErrorResponseResult | undefined {
    return toJS(this._errorData);
  }

  public request<RequestData>(props?: RequestProps<RequestData>) {
    const url = interpolate(this.url, props?.urlProps ? props.urlProps : {});
    const data: object | RequestData = props?.data ? props.data : {};

    if (props?.isNullable) {
      (Object.keys(data) as (keyof typeof data)[]).forEach(
        (k) => data[k] === null && delete data[k],
      );
    }

    this.setLoader(true);
    let promise: AxiosPromise;
    switch (this.method) {
      case 'get': {
        const config: { params: unknown; responseType: ResponseType } = {
          params: data,
          responseType: props?.isBlob ? 'blob' : 'json',
        };
        promise = this.client.get(url, { ...config });
        break;
      }
      case 'delete':
        promise = this.client.delete(url);
        break;
      case 'post':
        promise = this.client.post(url, data);
        break;
      case 'put':
        promise = this.client.put(url, data);
        break;
      case 'patch':
        promise = this.client.patch(url, data);
        break;
    }
    if (promise) {
      return promise
        .then((response: AxiosResponse<ResponseData>) => this.load(response))
        .catch((errorResponse: AxiosError<ErrorResponseResult>) => {
          const errors = this.errorfulLoad(errorResponse);

          if (props?.avoidErrors && errors?.errorData?.extraKeys?.length) {
            const saveData: object | RequestData = { ...data };

            errors.errorData.extraKeys.forEach((key) => {
              if (!saveData.hasOwnProperty(key)) return;
              // @ts-expect-error saveData will have key from error extra keys
              saveData[key] = null;
            });

            this.request({ ...props, data: saveData, avoidErrors: false });
          }

          return errors;
        });
    } else {
      return promise;
    }
  }

  public setLoader = (value: boolean) => {
    this._loader = value;
  };

  public clear = () => {
    this.setErrorData(undefined);
    this.setStatus(false);
    this.setData(undefined);
    this.setStatusCode(NaN);
  };

  public errorfulLoad(
    data: AxiosError<ErrorResponseResult>,
  ): RequestResult<ResponseData | undefined> | undefined {
    this.setStatus(false);

    const errorData = data;

    if (errorData?.response) {
      this.setStatusCode(errorData.response.status);
      const responseResult = errorData.response.data;

      const errorResult: ErrorResponseResult = {
        message: responseResult?.message,
        extra: [],
        extraKeys: [],
      };

      if (responseResult && responseResult.hasOwnProperty('extra')) {
        errorResult.extraKeys = errorResult.extraKeys?.concat(Object.keys(responseResult?.extra));
        if (Object.keys(responseResult?.extra).length) {
          Object.keys(responseResult?.extra).forEach((key) => {
            // @ts-ignore
            errorResult.extra.push({ name: key, errors: responseResult.extra[key] });
          });
        }
      }

      if (this.statusCode === 401) {
        return;
      }

      if (
        !this.hideErrorMessageBlock &&
        errorResult?.message &&
        [403, 404].indexOf(this.statusCode) === -1
      ) {
        messageError(errorResult.message);
      }

      if (!this.statusCode) {
        messageError('Что-то пошло не так');
      }

      this.setErrorData(errorResult);
      this.setLoader(false);

      return this.result;
    }
  }

  public load = (data: AxiosResponse<ResponseData>) => {
    this.clear();
    this.setStatus(true);
    this.setData(data?.data);
    this.setStatusCode(data?.status);
    this.setLoader(false);
    this.setErrorData(undefined);

    return this.result;
  };

  private setStatus = (value: boolean) => {
    this._status = value;
  };

  private setData = (value: ResponseData | undefined) => {
    this._data = value;
  };

  private setErrorData = (value: ErrorResponseResult | undefined) => {
    this._errorData = value;
  };

  private setStatusCode = (value: number) => {
    this._statusCode = value;
  };
}
