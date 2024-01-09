import { IPlayer } from "../../../api/dto/IPlayer";
import { LocaleType } from "../../../api/dto/LocaleType";

export type VotingDataType = {
  Id: string;
  Month: string;
  MatchId: string;
  SeasonId: string;
  EndVoting: string;
  UserVariantId: string;
  Variants: VotingVariant[];
};

export interface VotingVariant {
  Id: string;
  Player: VotingPlayerType;
  Percent: number;
}

interface VotingPlayerType {
  Id: string;
  Name: LocaleType;
  ImageUrl: string;
  PlayerNumber: number;
  Amplua: IPlayer["Amplua"];
}

export type VotingEntity = {
  Id: string;
  Month: string;
  MatchId: string;
  SeasonId: string;
  IsVoted: boolean;
};
