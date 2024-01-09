import { LocaleType } from "./LocaleType";

export interface IStaff {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  SortOrder: number;
  Position: LocaleType;
  Birthday: string;
  Citizenship: {
    CitizenshipId: string;
    CitizenshipName: string;
  };
  Team: {
    TeamId: string;
    TeamName: string;
  };
  Biography: LocaleType;
  ImageUrl: string;
  PaginationKey?: string[];
  Type: "Ordinary" | "Medical";
}
