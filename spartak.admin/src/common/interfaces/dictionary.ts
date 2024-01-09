import { LocaleType } from "./common";

export type Country = {
  Id: string;
  DeletedUtc: string;
  CreatedUtc: string;
  Name: LocaleType;
};

export type City = {
  Id: string;
  DeletedUtc: string;
  CreatedUtc: string;
  Name: LocaleType;
  Country: Country;
};

export type Amplua = {
  Id: string;
  DeletedUtc: string;
  CreatedUtc: string;
  Name: LocaleType;
};

export type CountriesFilters = {
  [key: string]: string;
};

export type CitiesFilters = {
  [key: string]: string;
};

export type AmpluaFilters = {
  [key: string]: string;
};

export type SeasonsResponse = {
  seasons: { Id: string; Name: LocaleType }[];
  count: number;
};
