export interface IControllerResponse<T> {
  result: T;
  status: number;
  isError: boolean;
  message: string;
}
