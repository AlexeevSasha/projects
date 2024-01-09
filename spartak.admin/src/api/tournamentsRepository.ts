import { BaseResponce } from "common/interfaces/common";
import { Tournament, TournamentFilter, TournamentTable } from "common/interfaces/tournaments";
import { BaseApiService } from "./BaseApiService";
import { Team } from "common/interfaces/teams";

class TournamentsRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchByFilter = async (filter: TournamentFilter = {}) => {
    const res = await this.get<BaseResponce<Tournament[]>>(`odata/Tournament?${this.getODataQuery(filter)}`);

    return { tournaments: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: Tournament["Id"]) =>
    await this.get<Tournament>(`Tournament/GetTournamentInfo?tournamentId=${id}`);

  publish = async (tournament: Tournament) => await this.post("Tournament/Publish", JSON.stringify(tournament));

  draft = async (tournament: Tournament) => await this.post("Tournament/Draft", JSON.stringify(tournament));

  fetchTable = async (tournamentId: Tournament["Id"], seasonId: string) => {
    const res = await this.get<TournamentTable>(
      `Tournament/GetTournamentTable?tournamentId=${tournamentId}&seasonId=${seasonId}`
    );
    res.Items = res.Items.map((item) => ({ ...item, TeamId: item.Team?.Id }));

    return res;
  };

  saveTable = async (table: TournamentTable) =>
    await this.post("Tournament/SaveTournamentTable", JSON.stringify(table));

  getTeams = async (tournamentId: Tournament["Id"], seasonId: string) =>
    await this.get<Team[]>(`Tournament/GetTournamentTeams?tournamentId=${tournamentId}&seasonId=${seasonId}`);

  saveTeams = async (TournamentId: Tournament["Id"], SeasonId: string, TeamIds: string[]) =>
    await this.post(`Tournament/SaveTournamentTeams`, JSON.stringify({ TournamentId, SeasonId, TeamIds }));
}

export const tournamentsRepository = new TournamentsRepository();
