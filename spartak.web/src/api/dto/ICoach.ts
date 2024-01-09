import { LocaleType } from "./LocaleType";

export interface ICoach {
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
  Teams: {
    Position: LocaleType;
    SortOrder: number;
    Team: {
      Id: string;
      ImageUrl: string;
      Name: LocaleType;
      Section: string;
      Type: string;
    };
  }[];
  Biography: LocaleType;
  ImageUrl: string;
  PaginationKey?: string[];
}
