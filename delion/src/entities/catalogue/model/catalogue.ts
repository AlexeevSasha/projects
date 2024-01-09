export interface DreamerCategoryOption extends Option {
  two_side_doc: boolean;
  combatant_related: boolean;
  from_donbass: boolean;
}

export interface DreamCategory extends Option {
  type: 1 | 2 | 3;
  hint: string;
}

export type SearchFeedbackCategoriesParams = {
  ordering: string;
  search: string;
};
