export interface ModeratorRates {
  id: number;
  birth_date_ids: number[];
  document_number_ids: number[];
  snils_number_ids: number[];
  agreement_file_ids?: number[];
  dream_category_ids: number[];
  present_link_1_ids: number[];
  present_link_2_ids: number[];
  theme_specification_ids: number[];
  document_front_file_ids: number[];
  parent_fio_ids: number[];
  dream_mark?: number;
  good_deed_mark: number;
  present_title?: string;
  short_dream_description?: string;
  price?: number;
}
