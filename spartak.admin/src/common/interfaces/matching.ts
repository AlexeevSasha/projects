import { BaseFilters, LocaleType } from "./common";
import { MatchInfoStat } from "./matches";

export type MatchingItem = {
  Id: string;
  InStatId: number;
  EventId: string;
  Event: {
    Id: string;
    Name: LocaleType;
  };
  WinlineId: string;
  MatchStartDateTime: string;
  VisitorsNumber: number;
  Tournament: { Id: string; Name: LocaleType };
  Stadium: { Id: string; Name: LocaleType };
  IsTechnicalWin: boolean;
  IsPenalty: boolean;
  IsMatchOver: boolean;
  IsAdditionalTime: boolean;
  IsDraft: boolean;
  MatchInfoStat: MatchInfoStat[];
  MatchType: string;
};

export type EventItem = {
  Id: string;
  Date: string;
  FullName: LocaleType;
  CrmEventId: string;
};

export type UpdateMatching = {
  MatchId: string;
  TicketId: string;
  ExternalTicketId?: string;
  WinlineId: string;
  MatchStartDateTime: string;
};

export type WinlineCoefficientItem = {
  Id: string;
  Date: string;
  Name: string;
};

export type MatchingResponse = {
  items: MatchingItem[];
  count: number;
};

export type MatchingFiltersType = BaseFilters & {};
