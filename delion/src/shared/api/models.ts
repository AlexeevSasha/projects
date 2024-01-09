export type ErrorResponseExtra = {
  name: string;
  errors: string[];
};

export type ErrorResponseResult = {
  message: string;
  extra: ErrorResponseExtra[];
  extraKeys?: string[];
};

export type RequestResult<Data = undefined> = {
  status: boolean;
  data?: Data;
  errorData?: ErrorResponseResult;
  statusCode: number;
};

export type VerificationCodeData = {
  attempts: number;
  uuid: string | null;
  resend_timeout: number;
};

export type SendCodeParams = {
  reset: boolean;
  is_sms: boolean;
};

export type VerifyCodeParams = {
  uuid: string;
  code: string;
  reset: boolean;
};

export const enum ApplicationExecutionType {
  // Самостоятельно
  INDEPENDENT = 1,
  // С помощью организатора
  WITH_DELIVERY = 2,
}

export interface GetFilterParams {
  page: number;
  pageSize: number;
  search: string;
  ordering: string;
}

export interface PagiantionResponseParams {
  count: number;
  next: string;
  previous: string;
}
