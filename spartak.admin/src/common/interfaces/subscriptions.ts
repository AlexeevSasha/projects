import { LocaleType } from "./common";

export interface SubscriptionsFilterTypes {
  pagination: number;
  pageSize: number;
  FullName: string;
  sorting: string;
}

export interface SubscriptionEntity {
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
  PreviousImageUrl?: string;
  JsonData: string;
  IsHidden: boolean;
}

export interface ISubscriptionsResponse {
  subscriptions: SubscriptionEntity[];
  count: number;
}
