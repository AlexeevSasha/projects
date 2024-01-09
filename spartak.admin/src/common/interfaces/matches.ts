import { Moment } from "moment";
import { BaseFilters, LocaleType } from "./common";
import { PlayerType } from "./players";

export type MatchFilters = BaseFilters & {
  DateRange?: Moment[];
  StartDate?: string;
  EndDate?: string;
  MatchTeamId?: string[];
  IsDraft?: "true" | "false";
  MatchStartFromDate?: Moment;
  SeasonId?: string;
  MatchDateTime?: string;
};

export type MatchListItem = {
  CreatedUtc: string;
  Id: string;
  IsDraft: false;
  MatchStartDateTime: string;
  TeamHomeId: string;
  TeamHomeEnName: string;
  TeamHomeRuName: string;
  TeamVisitorId: string;
  TeamVisitorEnName: string;
  TeamVisitorRuName: string;
  TournamentId: string;
  TournamentName: LocaleType;
  SeasonId?: string;
  SeasonName?: LocaleType;
};

export type Match = {
  Id: string;
  MatchStartDateTime: string;
  MatchType: "Custom" | "InStat";
  VisitorsNumber: number | null;
  IsDraft?: boolean;
  IsTechnicalWin: boolean;
  IsPenalty: boolean;
  IsMatchOver: boolean;
  IsAdditionalTime: boolean;
  CreatedUtc: string;
  TournamentId?: string;
  Tournament?: { Id: string; Name: LocaleType };
  StadiumId?: string;
  Stadium?: { Id: string; Name: LocaleType };
  SeasonId?: string | null;
  Season?: { Id: string; Name: LocaleType };
  MatchInfoStat?: [MatchInfoStat, MatchInfoStat];
  infoHome?: MatchInfoStat;
  infoGuest?: MatchInfoStat;
  InStatId?: string;
};

export type MatchInfoStat = {
  Id?: string;
  MatchId?: string;
  TeamId?: string;
  Team?: MatchTeam;
  IsHomeTeam?: boolean;
  ScoredGoal?: number;
  ConcededGoal?: number;
  ScoredPenaltyGoal?: number;
  ConcededPenaltyGoal?: number;
};

export type MatchResponce = {
  items: MatchListItem[];
  count: number;
};

export type MatchLineUp = {
  MatchId: string;
  Referee: LineUpReferee;
  Teams: LineUpTeam[];
};

export type LineUpTeam = {
  Id: string;
  Name: LocaleType;
  IsHomeTeam?: boolean;
  Players: MatchPlayer[];
  Coach?: { Id: string; FullName: LocaleType };
};

export type LineUpReferee = {
  Name: LocaleType;
  Position: LocaleType;
};

export type MatchPlayer = {
  Id: string;
  Name: LocaleType;
  ImageUrl: string;
  PlayerNumber: number;
  AmpluaId?: string;
  PlayerType: PlayerType;
};

type MatchCoach = {
  FullName: LocaleType;
  Id: string;
};

export enum EventType {
  goal = "Goal",
  replace = "Replace",
  yellowCard = "YellowCard",
  secondYellowCard = "SecondYellowCard",
  redCard = "RedCard",
  textTranslation = "TextTranslation",
  missedPenalty = "MissedPenalty",
  timeAddStart = "TimeAddStart",
  secondPeriodStart = "SecondPeriodStart",
  firstHalfOfAdditionalTimeStart = "FirstHalfOfAdditionalTimeStart",
  secondHalfOfAdditionalTimeStart = "SecondHalfOfAdditionalTimeStart",
  penaltyShootoutStart = "PenaltyShootoutStart",
  goalPenalty = "GoalPenalty",
  getPenalty = "GetPenalty",
  var = "Var",
  timeout = "Timeout",
  matchEnd = "MatchEnd",
  matchStart = "MatchStart",
  autoGoal = "AutoGoal",
  goalPenaltyInGameTime = "GoalPenaltyInGameTime",
  missedPenaltyInGameTime = "MissedPenaltyInGameTime",
}

export type MatchEvent = {
  key?: string;
  Id: string;
  Type: EventType;
  MatchId: string;
  Half: number;
  Minute: number;
  Team?: MatchTeam;
  TeamId?: string;
  Player?: MatchPlayer;
  PlayerId?: string;
  OtherPlayer?: MatchPlayer;
  OtherPlayerId?: string;
  AddedTime: number;
  Comment: LocaleType;
  Description?: LocaleType;
  NeedSendPush?: boolean;
  Coach?: MatchCoach;
};

export type MatchTeam = {
  Id: string;
  Name: LocaleType;
  ImageUrl: string;
  Type?: "OwnTeam" | "OppositeTeam";
};
