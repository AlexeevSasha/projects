// eslint-disable-next-line boundaries/element-types
import type { DreamCategory, DreamerCategoryOption } from '@entities/catalogue/@x/dreamer';

export interface Dreamer {
  id: number;
  photo: FileData;
  age: string;
  photo_id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  nationality: string;
  birth_date: string;
  document_number: string;
  document_file: FileData;
  document_file_id: number;
  snils_number: string;
  snils_file: FileData;
  snils_file_id: number;
  agreement_file: FileData;
  agreement_file_id: number;
  category: DreamerCategoryOption;
  category_id: number;
  document_front_file: FileData;
  document_front_file_id: number;
  document_back_file: FileData;
  document_back_file_id: number;
  nosology: Option[];
  nosology_ids: number[];
  interest: Option[];
  interest_ids: number[];
  dreamer_info: string;
  participation_experience: string;
  achievements: string;
  cherished_desire: string;
  good_deed_category: Option;
  good_deed_category_id: number;
  good_deed_description: string;
  good_deed_url: string;
  dream_category: DreamCategory;
  dream_category_id: number;
  present_link_1: string;
  present_link_2: string;
  present_title: string;
  theme: Option;
  theme_id: number;
  theme_specification: Option;
  theme_specification_id: number;
  dream_description: string;
  short_dream_description: string;
  parent_fio: string;
  parent_birth_date: Date | string;
  parent_settlement: string;
  parent_address: string;
  is_dreamer_info: boolean;
  is_dreamer_category: boolean;
  is_additional_info: boolean;
  is_good_deed: boolean;
  is_dream: boolean;
  is_approved_moderation: boolean;
  status: DreamerStatus;
  report: FileData[];
  executor_comment: string;
  can_toggle_status: boolean;
  isDreamNotStarted: boolean;
  isDreamExecuted: boolean;
  isDreamHasReportAttached: boolean;
  all_fields_filled: boolean;
}

export interface DreamModerationRate {
  id: number;
  dreamer: Dreamer;
  created: Date;
  updated: Date;
  deleted: Date;
  good_deed_mark: number;
  dream_mark: number;
  present_title: string;
  price: number;
  short_dream_description: string;
  birth_date: number[];
  document_number: number[];
  snils_number: number[];
  document_front_file: number[];
  parent_fio: number[];
  agreement_file: number[];
  dream_category: number[];
  present_link_1: number[];
  present_link_2: number[];
  theme_specification: number[];
}

export const enum DreamerStatus {
  // PLACEHOLDER
  EMPTY,
  // Не исполнено
  NOT_EXECUTED,
  // Исполнено
  EXECUTED,
  // Отчет прикреплен
  REPORT_ATTACHED,
}

export enum DreamerWishType {
  MATERIAL = 1,
  NON_MATERIAL = 2,
  SUPRISE = 3,
  MIXED = 4,
}

export type DreamerAboutFields = Pick<
  Dreamer,
  | 'last_name'
  | 'first_name'
  | 'middle_name'
  | 'birth_date'
  | 'photo_id'
  | 'document_number'
  | 'document_file_id'
  | 'snils_number'
  | 'snils_file_id'
  | 'agreement_file_id'
  | 'nosology_ids'
>;

export type DreamerCategoryFields = Pick<
  Dreamer,
  | 'dream_category_id'
  | 'document_back_file_id'
  | 'document_front_file_id'
  | 'parent_address'
  | 'parent_fio'
  | 'parent_birth_date'
  | 'parent_settlement'
>;

export type DreamerInfoFields = Pick<
  Dreamer,
  'interest_ids' | 'dreamer_info' | 'participation_experience' | 'achievements' | 'cherished_desire'
>;

export type DreamerGoodDeedFields = Pick<
  Dreamer,
  'good_deed_category_id' | 'good_deed_description' | 'good_deed_url'
>;

export type DreamerWishFields = Pick<
  Dreamer,
  | 'dream_category_id'
  | 'present_link_1'
  | 'present_link_2'
  | 'theme_id'
  | 'theme_specification_id'
  | 'dream_description'
>;

export type DreamerSection =
  | 'is_dreamer_info'
  | 'is_dreamer_category'
  | 'is_additional_info'
  | 'is_good_deed'
  | 'is_dream';

export const dreamerSectionList: DreamerSection[] = [
  'is_dreamer_info',
  'is_dreamer_category',
  'is_additional_info',
  'is_good_deed',
  'is_dream',
];
