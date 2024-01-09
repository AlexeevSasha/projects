import { LocaleType } from "./LocaleType";

export interface IPartner {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  SortOrder: number;
  Layout: string;
  Information: LocaleType;
  PartnerUrl: LocaleType;
  ImageUrl: string;
  Section: "Academy" | "Site" | "None";
}
