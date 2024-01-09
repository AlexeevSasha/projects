import { LocaleType } from "./LocaleType";

export interface ISubscription {
  Id: string;
  Date: string;
  ShortName: LocaleType;
  FullName: LocaleType;
  Description: LocaleType;
  EventId: number;
  CrmEventId: string;
  Type: "None" | "Subscription" | "Match";
  ImageUrl: string;
  PromoCodes: [string];
  TotalTickets: number;
  PreviousImageUrl: string;
  SaleEnabled: boolean;
  GroupLimits?: number[];
  JsonData: string;
}
