import type { ProgressCalculationData } from '@shared/lib/calculateProgress';

export type RegionData = {
  value: number;
  label: string;
};

export type ExecutorProfileData = {
  exceed_rejects_limit?: boolean;
  exceed_dreams_limit?: boolean;
  completed_dreams_count?: number;
  dreams_count?: number;
  userApplicationProgressInfo: ProgressCalculationData;
};

export type UserData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  birth_date: string;
  gender: number;
  phone: string;
  region: RegionData;
  region_id: number;
  groups: UserRoles[];
  userRole: UserRoles;
  mandatory_fields_filled: string;
  agree_with_pd: true;
  dream_application_id: number;
  executor_profile?: ExecutorProfileData;
  moderator_profile?: ModeratorProfileData;
  moderated_dream_application?: ModeratedDreamApplication;
  email_verified: boolean;
  notify_via_email: boolean;
  telegram_profile?: {
    tg_id: number | null;
    tg_uuid: string;
    subscribe_status: boolean;
  };
};

export type ModeratedDreamApplication = {
  dream_application_id: number;
  moderation_time?: string;
};

export type ModeratorProfileData = {
  available_apps_count: number;
  dreams_processed_today_count: number;
  dreams_processed_total_count: number;
  income: number;
  rejects_count: number;
};

export type AuthorizedUserData = {
  access_token: string;
  refresh_token: string;
  user: Partial<UserData>;
};

export const enum UserRoles {
  EXECUTOR = 'Исполнитель',
  DREAMER = 'Опекун',
  MODERATOR = 'Модератор',
  PARTNER = 'Партнер',
}

export type SendCode = {
  is_sms: boolean;
  code_type: CodeType;
  phone_number: string;
  password: string;
  dream_application_id: number;
};

export const enum CodeType {
  reset_password = 2,
  change_phone = 3,
  confirm_application = 4,
}

export type SendFeedbackPayload = {
  title: string;
  text: string;
  file_ids?: number[];
  category: number;
  email: string;
};
