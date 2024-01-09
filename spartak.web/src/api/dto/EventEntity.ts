import { LocaleType } from "./LocaleType";

export enum EventType {
  CustomEvent = "CustomEvent",
  CustomMatch = "CustomMatch",
  InStatMatch = "InStatMatch",
}

export type EventEntityDto = {
  OppositeTeamId: string;
  Image: string;
  EventUrl: string;
  DateStart: string;
  IsHomeMatch: boolean;
  CalendarEventType: EventType;
  TournamentShortName?: LocaleType;
  MatchId: string;
  OppositeTeamScoredGoals: number;
  OwnTeamScoredGoals: number;
};
