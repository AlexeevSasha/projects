import { BaseFilters, LocaleType } from "./common";

export type GraduatesFiltersEntity = BaseFilters & {
  Status?: string;
  GraduateSectionId?: string;
};

export type Graduate = {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  GraduateSectionName: LocaleType;
  Birthday: string;
  GraduateUrl: string;
  Team: LocaleType;
};

export type GraduatesResponce = {
  items: Graduate[];
  count: number;
};
