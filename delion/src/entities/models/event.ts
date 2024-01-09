import type { Catalogue } from './catalogue';

export type MolEvent = {
  id?: number;
  name?: string;
  description?: string;
  poster?: File;
  poster_id?: number;

  author?: EventOrganizer;
  organization?: EventOrganizer;
  can_manage?: boolean;

  responsible_last_name?: string;
  responsible_first_name?: string;
  responsible_middle_name?: string;
  responsible_phone?: string;
  responsible_email?: string;

  scope?: number;
  event_type?: Catalogue;
  event_type_id?: number;
  support_type?: number;
  categories?: Catalogue[];
  categories_ids?: number[];
  categories_directions?: Catalogue[];
  categories_directions_ids?: number[];
  event_format?: number;

  settlement?: string;

  event_address?: string;
  event_place?: string;

  event_platform?: string;

  start?: Date;
  end?: Date;
  registration_start?: Date;
  registration_end?: Date;

  min_age?: number;
  max_age?: number;
  target_audience?: string;
  participants_count_limit?: number;

  photos?: File[];
  // TODO unknown type
  reviews?: unknown[];

  applications_count?: number;

  is_applied_for?: boolean;
  status?: number;
  moderation_status?: number;
  moderation_comment?: string;

  is_confirmation_required?: boolean;
  is_confirmed?: boolean;
  is_feedback_required?: boolean;
  is_canceled?: boolean;

  /** Текст ошибки о том, что человек не может записаться на мероприятие */
  can_not_apply_error_msg?: string;
};

export type EventOrganizer = {
  id?: number;
  logo?: { file?: string; name?: string };
  name?: string;
  site_url?: string;
};

export type MolEventCatalogue = {
  id?: number;
  name?: string;

  organizers?: Catalogue[];
  organizers_ids?: number[];

  scope?: number;
  event_type?: Catalogue;
  event_type_id?: number;
  categories?: Catalogue[];
  categories_ids?: number[];

  youngsters_politics_directions?: Catalogue[];
  youngsters_politics_directions_ids?: number[];
};
