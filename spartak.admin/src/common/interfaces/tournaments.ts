import { BaseFilters, LocaleType } from "./common";

export type TournamentFilter = BaseFilters;

export type Tournament = {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  InStatId: number;
  SortOrder: number;
  ShortName: LocaleType;
  StartDate: string;
  EndDate: string;
  Description: LocaleType;
  PointsForWinning: number;
  PointsForLosing: number;
  PointsForDraw: number;
  PointsForWinningInExtraTime: number;
  PointsForWinningPenaltyShootout: number;
  PointsForLosingInExtraTime: number;
  PointsForLosingPenaltyShootout: number;
  NumberOfExtraTimePeriods: number;
  DurationOfTheExtraPeriod: number;
  Teams: Team[];
  // TeamIds?: string[];
  ShowTournamentTable: boolean;
  ImageUrl: string;
  TournamentType: "InStat" | "Custom";
};

export type TournamentsResponse = {
  tournaments: Tournament[];
  count: number;
};

export type TournamentTable = {
  ShowTournamentTable?: boolean;
  TournamentId: string;
  SeasonId: string;
  Items: TableItem[];
};

type TableItem = {
  Position: number;
  Total: number;
  Won: number;
  Draw: number;
  Lost: number;
  Goals: number;
  Points: number;
  Team?: Team;
  TeamId?: string;
};

interface Team {
  Id: string;
  Name: LocaleType;
  ImageUrl: string;
}
