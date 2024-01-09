import { BaseFilters, LocaleType } from "./common";

export type StadiumFilters = BaseFilters;

export type Stadium = {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  InStatId: number;
  YandexGoButton: boolean;
};

export type StadiumResponce = {
  stadiums: Stadium[];
  count: number;
};
