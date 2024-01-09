export interface IRequestResponseError {
  isValidatorError?: boolean;
  status?: number;
  bodyError: {
    errors?: Record<string, IError[]>;
    status?: number;
    type?: string;
    message?: string;
  };
}

export interface IError {
  errorCode: string;
  params: string[] | null;
}
