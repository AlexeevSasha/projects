import { LocaleType } from "./LocaleType";

export interface ITeam {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  InStatId: number;
  ShortName: LocaleType;
  City: { Id: string; Name: LocaleType };
  SortOrder: number;
  Country: { Id: string; Name: LocaleType };
  ImageUrl: string;
  TeamImageUrl: string;
  TeamType: string;
  Players?: { Id: string; Name: LocaleType; ImageUrl: string; PlayerNumber: number }[];
}
