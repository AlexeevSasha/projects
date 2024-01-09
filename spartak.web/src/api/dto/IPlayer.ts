import type { ITeam } from "./ITeam";
import { LocaleType } from "./LocaleType";

export interface IAchievement {
  ImageUrl: string;
  Name: LocaleType;
}

export type PlayerTeam = {
  Id: string;
  ImageUrl: string;
  Name: LocaleType;
};

export interface IPlayerCareer {
  Championship: number;
  Cup: number;
  EuroCup: number;
  Period: string;
  Position: number;
  Team: PlayerTeam;
}

export interface IPlayer {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  PlayerCareer: IPlayerCareer[];
  FullName: LocaleType;
  InStatId: number;
  Amplua: {
    Id: string;
    Name: LocaleType;
  };
  PlayerNumber: number;
  Country: {
    Id: string;
    Name: LocaleType;
  };
  Birthday: string;
  InClubFrom: string;
  Height: number;
  Weight: number;
  Achievements: IAchievement[];
  Teams: ITeam[];
  Biography: LocaleType;
  ImageUrl: string;
  ShopId: number;
  MvpVotings: MvpVoting[];
  PaginationKey?: string[];
}

export type MvpVoting = {
  Month: string;
};
