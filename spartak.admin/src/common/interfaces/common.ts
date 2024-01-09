import { StateType } from "store";
import { FieldData } from "./IField";

export type LocaleType = {
  En: string;
  Ru: string;
};

export type ThunkApiType = {
  rejectValue: { error: unknown };
  state: StateType;
};

export type BaseFilters = {
  pagination?: number;
  pageSize?: number;
  sorting?: string;
  FullName?: string;
  withOutDeletedUtc?: boolean;
  [key: string]: any;
};

export type BaseResponce<T = unknown> = {
  "value": T;
  "@odata.count": number;
  "@odata.context": string;
};

export type FilterChangeValue = {
  [name: string]: FieldData["value"];
};

export enum Statys {
  None = "None",
  Hidden = "Hidden",
  Published = "Published",
  Draft = "Draft",
}

export enum BannerStatus {
  None = "None",
  hidden = "hidden",
  published = "published",
  scheduled = "scheduled",
}

export enum Layouts {
  Static = "Static",
  Rotation = "Rotation",
}
export enum Section {
  Site = "Site",
  Academy = "Academy",
}
