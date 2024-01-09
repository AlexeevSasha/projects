// eslint-disable-next-line boundaries/element-types
import type { Dreamer, DreamModerationRate } from '@entities/dreamer/@x/application';
import type {
  ApplicationExecutionType,
  GetFilterParams,
  VerificationCodeData,
} from '@shared/api/models';
import type { ProgressCalculationData } from '@shared/lib/calculateProgress';
import type { Dadata } from '@shared/model';

export interface Application extends Partial<ExecutorApplication> {
  id: number;
  dream_application_id: number;
  dreamers: Dreamer[];
  status: ApplicationStatus;
  is_new_region: boolean;
  dreamer_moderation_rate: DreamModerationRate[];
  moderation_time: Date;
  confirmation_code?: VerificationCodeData;
  created?: Date;
  isApplicationExecuted: boolean;
  /* Заявка имеет способ исполнения - самостоятельно */
  isApplicationExecutionTypeIndependent: boolean;
  /* Заявка имеет способ исполнения - через организацию */
  isApplicationExecutionTypeOrganization: boolean;
  /* Заявка имеет способ исполнения - самостоятельно, и возможно исполнение через организатора */
  isApplicationIndependetAndAvailableDelivery: boolean;
  /* Заявка может быть реджектнута только в случаях если Заявка не исполнена или Если хотя бы одна мечта не исполнена */
  isApplicationRejectable: boolean;
  isApplicationInExecute: boolean;
  is_contact_filled?: boolean;
  applicationProgressInfo?: ProgressCalculationData;
  formattedTotalPriceAmount?: string;
  formattedPrice?: Record<keyof Price, string>;
  is_changing_execution_type?: boolean;
  is_waiting_feedback: boolean;
  status_history?: ApplicationStatusHistory[];
  trustee_feedback?: TrusteeFeedback;
  report_text?: string;
  report_ids?: number[];
  report?: FileData[];
  attempts_count: number;
  orphanage?: boolean;
  is_checked: boolean;
}

export type ApplicationStatusHistory = {
  created: Date;
  status: number;
};

export interface CreateApplication {
  agree_with_pd: boolean;
}

export type ContactsFields = Pick<
  Application,
  'agent_phone' | 'agent_email' | 'settlement' | 'orphanage' | 'is_contact_filled'
>;

export interface GetPublicApplicationParams extends GetFilterParams {
  amount_max: number;
  amount_min: number;
  no_suprises: number;
  settlement: string;
}

export type ExecutorApplicationItemPayment = {
  id: number;
  transaction: {
    transaction_id: number;
  };
  is_expired: boolean;
  created: string;
  updated: string;
  deleted: string;
  amount: string;
  refund_amount: string;
  refund_attempt: number;
  refund_waiting: boolean;
  refund_reason: string;
  user: number;
  application: number;
};

export type ExecutorApplication = {
  id: number;
  agent_fio: string;
  agent_phone: string;
  agent_email: string;
  region: string;
  settlement: string;
  dreamers: Dreamer[];
  dreamers_count: number;
  dreamers_executed_count: number;
  feedback: Feedback;
  is_paid: boolean;
  payments: ExecutorApplicationItemPayment[];
  status: number;
  execution_type: ApplicationExecutionType;
  is_available_delivery: boolean;
  is_waiting_reports: boolean;
  total_amount: string;
  price: Price;
};

export type Price = {
  price_without_tax: number;
  organization_tax: number;
  transport_tax: number;
};

export type Feedback = {
  difficulties: string;
  independent_text?: string;
  organization_text?: string;
  site_proposal: string;
  promotion_proposal: string;
  questions?: string;
};

export type TFilterTag = {
  label: string;
  value: string;
  formName: string;
  dadata?: Dadata;
};

export interface PartnerApplicationsFilter {
  amount_max?: string;
  amount_min?: string;
  dream_category?: string;
  dreamers_count_max?: string;
  dreamers_count_min?: string;
  dream_category_type?: string;
  orphanage?: boolean;
  region?: string;
  theme?: string;
  is_available_delivery?: boolean;
}

export interface PartnerApplicationsForm {
  material_dream_category?: TFilterTag;
  no_material_dream_category?: TFilterTag;
  amount_max?: number;
  amount_min?: number;
  dream_category?: TFilterTag;
  dreamers_count_max?: number;
  dreamers_count_min?: number;
  dream_category_type?: TFilterTag;
  orphanage?: TFilterTag;
  region?: TFilterTag;
  theme?: TFilterTag;
  is_available_delivery?: TFilterTag;
}

export interface TrusteeFeedback {
  difficulties: string;
  mark: number;
  review: string;
}

export interface ApplicationsWithPagination {
  count: number;
  next: string;
  previous: string;
  results: Application[];
}

export type ModerationFields = keyof Pick<
  Dreamer,
  | 'birth_date'
  | 'document_number'
  | 'snils_number'
  | 'agreement_file'
  | 'dream_category'
  | 'present_link_1'
  | 'present_link_2'
  | 'theme_specification'
  | 'document_front_file'
  | 'parent_fio'
>;

export interface ModerationError extends Record<ModerationFields, Option[]> {
  id: number;
  dreamer_id: Dreamer['id'];
}

export enum RejectApplicationReason {
  REGION = 1,
  PRICE = 2,
  PERSONAL = 3,
  OTHER = 36,
}

export enum ApplicationStatus {
  DRAFT = 1, // Черновик
  WAIT_MODERATION = 2, // Ожидает модерации
  ERROR = 3, // Ошибка
  NEED_REVISION = 4, // Требуется доработка
  REJECTED = 5, // Отклонена
  POSTED = 6, // Размещена
  TAKEN_FOR_EXECUTION = 7, // Взята на исполнение
  IN_EXECUTE = 8, // На исполнении
  EXECUTED = 9, // Исполнена
  PRE_POSTED = 10, // Предразмещена
}
