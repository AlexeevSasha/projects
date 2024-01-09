import { BaseFilters, LocaleType } from "./common";

export interface ILeadership {
  Id: string;
  Status: "None" | "Published" | "Hidden" | "Draft";
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  SortOrder: number;
  Position: LocaleType;
  Birthday: string;
  Section: "None" | "Academy" | "Site";
  ImageUrl: string;
  Biography: LocaleType;
}

export type LeadershipResponce = {
  leadership: ILeadership[];
  count: number;
};
export type LeadershipFilters = BaseFilters & {
  Status?: string;
};
