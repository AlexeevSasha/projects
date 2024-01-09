import { BaseFilters, LocaleType } from "./common";

export type BestPlayerFiltersType = BaseFilters & {
  Status?: string;
};

export type BestPlayerEntity = {
  Id: string;
  StartVoting: string;
  EndVoting: string;
  Month?: string;
  Match?: {
    Id: string;
    Name: LocaleType;
  };
  SeasonId: string;
  SeasonName: string;
  Count: number;
  Variants: {
    Player: {
      Id: string;
      Name: LocaleType;
    };
    Count: number;
    DeletedUtc: string;
  }[];
};

export type BestPlayerResponce = {
  items: BestPlayerEntity[];
  count: number;
};

export type VotingEntity = {
  Id: string;
  StartVoting: string;
  EndVoting: string;
  Month: string;
  MatchId: string;
  PlayerIds: string[];
};

export type VotingMatch = {
  MatchStartDateTime: string;
  Id: string;
  Name: LocaleType;
};

export type SeasonsForMvp = {
  Id: string;
  Name: LocaleType;
};
