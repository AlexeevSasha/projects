import { BaseFilters, ODateResponce } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { IPlayer } from "./dto/IPlayer";

interface IPlayerFilters extends BaseFilters {
  NotId?: string;
  Id?: string;
  Status?: "Published";
  IsDraft?: "false" | "true";
  InTeamArray?: string;
}

class PlayerRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchPlayers = (filter: IPlayerFilters = {}) =>
    this.get<ODateResponce<IPlayer>>(
      `/odata/ClientPlayer?$expand=Teams,PlayerCareer/Team&${this.getODataQuery(filter)}`,
      {
        value: [{}],
      }
    );
}

export const playerRepository = new PlayerRepository();
