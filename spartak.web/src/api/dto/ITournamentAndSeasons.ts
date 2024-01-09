import { LocaleType } from "./LocaleType";

export interface ITournament {
  Id: string;
  Name: LocaleType;
  ShortName: LocaleType;
  SortOrder: number;
  ImageUrl: string;
  ShowTournamentTable?: boolean;
}

export interface ISeason {
  Id: string;
  Name: LocaleType;
  EndDate: string;
  StartDate: string;
}

export interface ISeasonNoLocate {
  Id: string;
  Name: string;
}

export interface ITournamentAndSeasons {
  Tournament: ITournament;
  Seasons: ISeason[];
}
