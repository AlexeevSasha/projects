import { LocaleType } from "./LocaleType";

export type ProfileMatch = {
  Id: string;
  InStatId: number;
  TicketId: number;
  WinlineId: number;
  MatchStartDateTime: string;
  VisitorsNumber: number;
  Tournament: {
    Id: string;
    Name: LocaleType;
  };
  Stadium: {
    Id: string;
    Name: LocaleType;
  };
  IsTechnicalWin: boolean;
  IsPenalty: boolean;
  IsMatchOver: boolean;
  IsAdditionalTime: boolean;
  IsDraft: boolean;
  MatchInfoStat: {
    Id: string;
    MatchId: string;
    ScoredGoal: number;
    ConcededGoal: number;
    ScoredPenaltyGoal: number;
    ConcededPenaltyGoal: number;
    Team: {
      Id: string;
      Name: LocaleType;
      ImageUrl: string;
    };
    IsHomeTeam: boolean;
  }[];
  MatchType: string;
};

export interface TicketDto {
  Id: string;
  Sector: string;
  Line: string;
  Seat: string;
  Barcode: string;
  Match: ProfileMatch;
  status: "paid" | "unpaid";
  [key: string]: any;
}

export interface ProfileTicket {
  Id: number;
  Status: "Created" | "Formed" | "PartiallyIssued " | "Issued" | "Returned" | "Refused";
  PayStatus: "Paid" | "NotPaid" | "PartiallyPaid";
  IsFiscal: boolean;
  LockTime: string;
  Created: string;
  Price: number;
  Tickets: OrderDetails[];
  CompanyId: number; //1 - tickets, 2 - museum
}
export interface OrderDetails {
  Id: number;
  Sector: string;
  Line: string;
  Seat: string;
  SeatFullName: string;
  Category: string;
  Quantity: number;
  Barcode: string;
  Price: number;
  Sum: number;
  Event: string;
  Status: "Created" | "Formed" | "PartiallyIssued " | "Issued" | "Returned" | "Refused";
}

export interface IContactMatch {
  Id: string;
  Bonus: number;
  BonusFinishDate: string;
  IsBonusFinished: boolean;
  IsVisited: boolean;
  Match: string;
  Date: string;
}
