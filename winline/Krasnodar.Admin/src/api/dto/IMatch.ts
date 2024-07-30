import { Moment } from "moment";

export interface IMatch {
  id: string;
  statisticEventId: string;
  homeTeamName: string;
  guestTeamName: string;
  tournamentId: string;
  tournament: string;
  dateTimeStart: string;
  winlineOddsEventId?: string;
  ticketsEventId?: string;
}

export interface IMatchFilters {
  homeTeamName?: string;
  guestTeamName?: string;
  sorting: string;
  pagination: number;
  date: null | [Moment, Moment];
}
