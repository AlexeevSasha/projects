import { BaseFilters, LocaleType } from "./common";

export enum TeamType {
  own = "OwnTeam",
  opposite = "OppositeTeam",
}

export type TeamsFilters = BaseFilters & {
  DeletedUtc?: string;
  Status?: string;
  TeamType?: TeamType;
  DisplayTeamInTheMedia?: "true" | "false";
  SortOrder?: number;
  Section?: string;
};

export type Team = {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  InStatId: number;
  ShortName: LocaleType;
  City?: {
    Id: string;
    Name: LocaleType;
  };
  CityId?: string;
  ImageUrl: string;
  TeamType: TeamType;
  Country?: {
    Id: string;
    Name: string;
  };
  CountryId?: string;
  Section: "Academy" | "Site" | "None";
};

export type TeamsResponce = {
  teams: Team[];
  count: number;
};
