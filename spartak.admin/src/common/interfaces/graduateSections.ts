import { BaseFilters, LocaleType } from "./common";

export type GraduateSectionsFiltersEntity = BaseFilters & {
  Status?: string;
};

export type GraduateSection = {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  SortOrder: number;
  ImageSectionUrl: string;
  ImageTeamUrl: string;
};

export type GraduateSectionsResponce = {
  items: GraduateSection[];
  count: number;
};
