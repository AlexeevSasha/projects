import { BaseFilters, LocaleType } from "./common";

export type SpecialOffer = {
  Id?: string;
  StartDate: string;
  EndDate: string;
  SpecialOfferAccess: string[];
  Type: "None" | "FromClub" | "FromPartners";
  Header: LocaleType;
  Announce: LocaleType;
  Text: LocaleType;
  PreviewPhoto: string;
};

export type SpecialOfferRequest = SpecialOffer & {
  CreatedUtc: string;
  UpdatedUtc: string;
  DeletedUtc: string;
  IsDraft: boolean;
  Status: string;
};

export type SpecialOfferResponse = {
  specialOffers: SpecialOfferRequest[];
  count: number;
};

export type SpecialOfferFilter = BaseFilters & {
  Status?: string;
  Type?: string;
  Date?: string;
  Head?: string;
};

export type UserLevel = {
  Id: string;
  Name: string;
};
export type SpecialOfferFilterEntity = BaseFilters & {
  [key: string]: any;
};
