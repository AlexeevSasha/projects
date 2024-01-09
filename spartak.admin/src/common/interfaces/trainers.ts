import { BaseFilters, LocaleType } from "./common";

export type TrainerFilters = BaseFilters & {
  Status?: string;
  Position: string;
  TrainerSection?: string;
};

interface TrainerTeam {
  TeamId: string;
  SortOrder: number;
  Position: LocaleType;
}

type TrainerTeamDto = Omit<TrainerTeam, "TeamId"> & {
  Team: {
    Id: string;
    Name: LocaleType;
    ImageUrl: string;
    Type: string;
    Section: string;
  };
};

export type Trainer = {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  SortOrder: number;
  Position: LocaleType;
  Birthday: string;
  CitizenshipId?: string;
  Citizenship: {
    CitizenshipId: string;
    CitizenshipName: string;
  };
  TeamIds: string[];
  Teams: TrainerTeam[];
  Biography: LocaleType;
  ImageUrl: LocaleType;
  Section: string;
};

export type TrainerDto = Omit<Trainer, "Teams"> & { Teams: TrainerTeamDto[] };

export type TrainerResponse = {
  trainers: TrainerDto[];
  count: number;
};
