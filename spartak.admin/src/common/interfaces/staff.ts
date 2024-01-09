import { BaseFilters, LocaleType } from "./common";

export type StaffFilters = BaseFilters & {
  Status?: string;
};

export type Staff = {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  SortOrder: number;
  Position: LocaleType;
  Birthday: string;
  Citizenship: {
    CitizenshipId: string;
    CitizenshipName: LocaleType;
  };
  CitizenshipId: string;
  Teams?: {
    Id: string;
    Name: LocaleType;
    TeamName: string;
    Type: "None" | "OwnTeam" | "OppositeTeam";
    Section: "None" | "Academy" | "Site;";
  }[];
  TeamIds?: string[];
  Biography: LocaleType;
  ImageUrl: LocaleType;
  Type: "Ordinary" | "Medical";
};

export type StaffResponce = {
  staff: Staff[];
  count: number;
};
