import { BaseResponce } from "common/interfaces/common";
import { Player, PlayersFilters, PlayerType } from "common/interfaces/players";
import { Team } from "common/interfaces/teams";
import { BaseApiService } from "./BaseApiService";

class ClubsPlayersRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchMainTeamPlayers = async (teamId: Team["Id"], status?: PlayersFilters["Status"], playerType?: PlayerType) => {
    const { value } = await this.get(
      `odata/Player?$expand=Teams&$filter=DeletedUtc eq null and Teams/any(Teams: Teams/Id eq ${teamId})${
        status ? "and Status eq '" + status + "'" : ""
      }${playerType ? " and  PlayerType eq '" + playerType + "'" : ""}`
    );

    return value;
  };

  fetchByFilter = async (filter: PlayersFilters = {}) => {
    const res = await this.get(
      `odata/Player?$expand=Teams&${this.getODataQuery({
        ...filter,
        PlayerType: PlayerType.own,
      })}`
    );

    return { players: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: Player["Id"]) => {
    const { value } = await this.get<BaseResponce<Player[]>>(
      `odata/Player?$expand=Teams,PlayerCareer/Team&$filter=Id eq ${id}`
    );
    const { Teams, Amplua, Citizenship, ...player } = value[0] || ({} as Player);

    return {
      ...player,
      TeamIds: Teams?.map(({ Id }) => Id),
      AmpluaId: Amplua?.Id,
      CitizenshipId: Citizenship?.Id,
    };
  };

  publish = async (partner: Player) => await this.post("Player/Publish", JSON.stringify(partner));

  draft = async (partner: Player) => await this.post("Player/Draft", JSON.stringify(partner));

  deleteById = async (id: Player["Id"]) => await this.delete(`Player/Delete?id=${id}`);
}

export const clubsPlayersRepository = new ClubsPlayersRepository();
