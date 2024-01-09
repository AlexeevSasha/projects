import { Moment } from "moment";
import { BaseFilters } from "./common";

export type LoyaltyFilterEntity = BaseFilters & {
  [key: string]: any;
};

export type LoyaltyResponce = {
  items: LoyaltyEntity[];
  count: number;
};

export enum AwardType {
  FreeBet = "FreeBet",
  VoucherToTheBox = "VoucherToTheBox",
  CouponForMerchandise = "CouponForMerchandise",
  ExternalReference = "ExternalReference",
  FreeBetByPhone = "FreeBetByPhone",
}

export type LoyaltyStatus = "scheduled" | "published" | "completed" | "outofstock";
export type WinConditionType = "NoCondition" | "BoughtTicket" | "NewUser";
export type AvailabilityConditionType = "AllUser" | "FromFile";

export interface LoyaltyEntity {
  Id: string;
  Name: string;
  StartDate: string;
  EndDate: string;
  OutOfStock?: string;
  Title: string;
  Description: string;
  ImageUrl: string;
  Status?: LoyaltyStatus;
  Condition: Condition;
  TotalAward: number;
  AcceptUser: { Id: string; Total: number };
  PushRequest?: {
    Heading?: string;
    Message?: string;
    SendTime?: string;
    ImageUrl?: string;
    LinkValueUrl?: string;
    TypeLink?: "Screen" | "HyperLink";
  };
}

interface Condition {
  Id: string;
  WinCondition: {
    Type: WinConditionType;
    EventId?: string;
    SectorIds?: number[];
    Quantity?: number;
  }[];
  Award: {
    Type: AwardType;
    UploadFileUrl: string;
    Quantity: number;
    Link: string;
    ButtonText: string;
  };
  AvailabilityCondition: {
    Type: AvailabilityConditionType;
    UploadFileUrl?: string;
  };
  WinnerText: string;
}
