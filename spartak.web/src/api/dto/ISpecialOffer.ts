import { LocaleType } from "./LocaleType";

export type ISpecialOffer = {
  Id: string;
  StartDate: string;
  EndDate: string;
  SpecialOfferAccess: string[];
  Type: "None" | "FromClub" | "FromPartners";
  Header: LocaleType;
  Announce: LocaleType;
  Text: LocaleType;
  PreviewPhoto: string;
  CreatedUtc: string;
  UpdatedUtc: string;
  DeletedUtc: string;
  IsDraft: boolean;
  Status: string;
  ItemType: string;
};
