import { BaseFilters, LocaleType } from "./common";

export enum PlayerType {
  own = "OwnPlayer",
  opposite = "OppositePlayer",
}

export type PlayersFilters = BaseFilters & {
  Amplua?: string;
  Status?: string;
  PlayerType?: PlayerType;
  AnyInTeamArray?: string[];
};

export type Achievement = {
  ImageUrl: string;
  Name: LocaleType;
};

export type PlayerCareer = {
  Position: number;
  Period: string[];
  Championship: number;
  Cup: number;
  EuroCup: number;
  Team: { Id: string };
};

export type Player = {
  Id: string;
  FullName: LocaleType;
  InStatId: number;
  AmpluaId?: string;
  Amplua?: { Id: string; Name: LocaleType };
  PlayerNumber: number;
  CitizenshipId?: string;
  Citizenship?: { Id: string; Name: LocaleType };
  PlayerCareer: PlayerCareer[];
  Birthday: string;
  InClubFrom: string;
  Height: number;
  Weight: number;
  Teams?: { Id: string; ImageUrl: string; Name: LocaleType }[];
  TeamIds?: string[];
  Achievements: Achievement[];
  Biography: LocaleType;
  ImageUrl: LocaleType;
  ShopId: number;
  PlayerType: PlayerType;
  Status?: string;
  DeletedUtc?: string;
  CreatedUtc?: string;
};

export type PlayersResponce = {
  players: Player[];
  count: number;
};
