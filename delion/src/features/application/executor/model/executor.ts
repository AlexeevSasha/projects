import type { RejectApplicationReason } from '@entities/application';
import type { Feedback } from '@entities/application/model/application';

export type TakeAvailableApplicationParams = {
  id: number;
};

export type RejectApplicationParams = {
  id: number;
  reason: RejectApplicationReason;
  comment?: string;
  created?: string;
};

export type UploadReportParams = {
  id: number;
  report_ids: number[];
  executor_comment: string;
};

export type LeaveFeedbackParams = Feedback & {
  id: number;
};
