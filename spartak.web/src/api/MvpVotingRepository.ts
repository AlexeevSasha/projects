import { VotingDataType, VotingEntity, VotingVariant } from "../componentPages/voting/interfaces/VotingT";
import { BaseApiService } from "./BaseApiService";

export enum VotingType {
  match = "Match",
  month = "Month",
  season = "Season",
}

export type VotingFilters = {
  matchId?: string;
  mvpVotingType?: VotingType;
};

class MvpVotingRepository extends BaseApiService {
  constructor() {
    super("match/");
  }

  fetchVotings = (filter?: VotingFilters) =>
    this.get<VotingEntity[]>(
      `MvpVoting/GetActiveVoting?api-version=2.0${
        filter
          ? `&${Object.entries(filter)
              .map(([key, value]) => `${key}=${value}`)
              .join("&")}`
          : ""
      }`,
      []
    );

  fetchVotingData = (votingId: VotingDataType["Id"]) =>
    this.get<VotingDataType>(`MvpVoting/GetVotingData?mvpVotingId=${votingId}`, {});

  vote = (VariantId: VotingVariant["Id"]) => this.post<VotingDataType>("MvpVoting/Vote", JSON.stringify({ VariantId }));
}

export const mvpVotingRepository = new MvpVotingRepository();
