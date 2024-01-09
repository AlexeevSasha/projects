export interface IControllerResponseJob<T> {
  errorMessage: string;
  jobId: string;
  result: T;
  status: string;
  controlListId: string;
  controlListUpdateDate: Date | string;
}
