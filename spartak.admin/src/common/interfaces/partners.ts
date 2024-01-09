import { BaseFilters, LocaleType } from "./common";

export enum PartnerType {
  own = "OwnPartner",
  opposite = "OppositePartner",
}

export type PartnerFilters = BaseFilters & {
  Status?: string;
  Layout?: string;
  PartnerType?: PartnerType;
  Section?: string;
};

export type Partner = {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  SortOrder: string;
  Layout: string;
  Information: LocaleType;
  PartnerUrl: LocaleType;
  ImageUrl: string;
  Section: "Academy" | "Site" | "None";
};

export type PartnersResponce = {
  partners: Partner[];
  count: number;
};
