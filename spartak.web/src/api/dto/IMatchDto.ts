import { LocaleType } from "./LocaleType";

interface IMatchScore {
  Guest: number;
  Home: number;
}

interface IHalfScore extends IMatchScore {
  HalfId: number;
}

interface IRoundDto {
  Name: LocaleType;
  IsPlayOff: boolean;
}

export interface IBaseTeam {
  Id: string;
  Logo?: string;
  Name: LocaleType;
  Events?: MatchEvent[];
}

export type MatchEvent = {
  ActionType: string;
  TeamId: string;
  TeamName: LocaleType;
  HalfId: number;
  Minute: number;
  AddedTime: number;
  PlayerId: string;
  PlayerName: LocaleType;
  OtherPlayerId: string;
  OtherPlayerName: LocaleType;
  Comment: LocaleType;
  Description: LocaleType;
  CoachId?: string;
  CoachName?: LocaleType;
};

export interface IWinlineCoefficient {
  GuestWin: number;
  HomeWin: number;
  Neutral?: number;
  EventUrl: string;
}

export interface IMatchStage {
  End: string;
  Stage: string;
  Start: string;
}

interface IMatchStaff {
  Appointment?: string;
  Name?: string;
}

export interface IMatchDto {
  Date: string;
  GuestTeam: IBaseTeam;
  HomeTeam: IBaseTeam;
  Id: string;
  EventId: number;
  Scores: IMatchScore;
  PenaltyShootoutScores: IMatchScore;
  HalfScores: IHalfScore[];
  StadiumId?: string;
  Stadium?: LocaleType;
  Tournament?: LocaleType;
  TournamentName?: LocaleType;
  Round?: IRoundDto;
  Coefficient?: IWinlineCoefficient;
  CurrentStage?: IMatchStage;
  HasTickets?: boolean;
  Judge: LocaleType;
  ViewersCount?: number;
  Staff: IMatchStaff[];
  ButtonEnum: "None" | "Taxi" | "Buy" | "Fly";
  PaginationKey?: string[];
  Type?: "Past" | "Future";
  IsLive?: boolean;
}

export type LineUp = {
  HomeTeamLineup: TeamLineup;
  GuestTeamLineup: TeamLineup;
  Referee: Referee;
};

export type Referee = {
  Name: string;
  Position: LocaleType;
};

export type TeamLineup = {
  Team: IBaseTeam;
  Main: LineUpPlayer[];
  Substitute: LineUpPlayer[];
  Coach: LineUpPlayer;
};

export type LineUpPlayer = {
  Avatar?: string;
  FullName: LocaleType;
  Id: string;
  Num: number;
  Position: LocaleType;
  TeamId?: string;
  ProfileExist?: boolean;
};
