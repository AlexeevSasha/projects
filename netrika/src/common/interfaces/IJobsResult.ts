export interface IJobsResult<T> {
  dictionaryOid: string;
  message: string;
  jobId: string;
  result: T;
  status: string;
}
