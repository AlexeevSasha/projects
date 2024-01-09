import { BaseFilters, LocaleType } from "./common";

export type CategoryFilters = BaseFilters;

export type Category = {
  Id: string;
  CreatedUtc: string;
  CategoryName: LocaleType;
};

export type CategoryResponse = {
  categories: Category[];
  count: number;
};
