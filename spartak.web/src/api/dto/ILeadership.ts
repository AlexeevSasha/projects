import { LocaleType } from "./LocaleType";

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
