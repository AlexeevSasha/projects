import {
  BestPlayerEntity,
  BestPlayerFiltersType,
  SeasonsForMvp,
  VotingEntity,
  VotingMatch,
} from "common/interfaces/bestPlayer";
import { BaseApiService } from "./BaseApiService";

class BestPlayerRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchByFilter = async (filter: BestPlayerFiltersType) => {
    const { value: items, ["@odata.count"]: count } = await this.get(
      `odata/MvpVoting?api-version=2.0&${this.getODataQuery(filter)}`
    );

    return { items, count };
  };

  fetchById = async (id: BestPlayerEntity["Id"]) => {
    const { value } = await this.get<{ value: BestPlayerEntity[] }>(
      `odata/MvpVoting?api-version=2.0&$filter=Id eq ${id}`
    );

    return { ...value[0], MatchId: value[0]?.Match?.Id, PlayerIds: value[0]?.Variants.map(({ Player }) => Player.Id) };
  };

  saveVoting = async (item: VotingEntity) => await this.post("MvpVoting/Save", JSON.stringify(item));

  remove = async (id: BestPlayerEntity["Id"]) => await this.delete(`MvpVoting/Delete?id=${id}`);

  getVotingMatches = () => this.get<VotingMatch[]>(`MvpVoting/GetMatchesForMvp`);

  getSeasonForMvp = () => this.get<SeasonsForMvp[]>(`MvpVoting/GetSeasonForMvp`);

  fetchResultXLS = (mvpVotingId: BestPlayerEntity["Id"]) =>
    this.post(`MvpVoting/ExportResults?mvpVotingId=${mvpVotingId}`, undefined, {
      headers: { "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
    });

  uploadResultXLS = async (file: Blob) => {
    const body = new FormData();
    body.append("file", file);

    return await this.post(`MvpVoting/ImportResults`, body, {
      headers: {},
    });
  };
}

export const bestPlayerRepository = new BestPlayerRepository();
