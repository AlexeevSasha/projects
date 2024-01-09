import { MatchFilters } from "common/interfaces/matches";
import { BaseApiService } from "./BaseApiService";
import { MatchingItem, UpdateMatching } from "../common/interfaces/matching";

class MatchingRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchByFilter = async (filter: MatchFilters = {}) => {
    if (filter.MatchStartDateTime && filter.MatchStartFromDate) {
      delete filter.MatchStartFromDate;
    }
    const { value: items, ["@odata.count"]: count } = await this.get(
      `odata/Matching?$expand=MatchInfoStat($expand=Team)&${this.getODataQuery(filter)}`
    );

    return { items, count };
  };

  fetchById = async (id: MatchingItem["Id"]) => {
    const { value } = await this.get(`odata/Matching?$filter=Id eq ${id}&$expand=MatchInfoStat($expand=Team)`);

    return value[0];
  };

  fetchEvents = async (matchDate: string) =>
    (
      await this.get(
        `odata/Event?$filter=Date gt ${new Date(new Date(matchDate).setHours(0, 0, 0, 0)).toISOString()} 
        and Date lt ${new Date(new Date(matchDate).setHours(24, 0, 0, 0)).toISOString()}`
      )
    ).value;

  fetchWinlineCoefficients = async (matchDate: string) =>
    await this.get(`Matching/GetWinlineCoefficient?matchDate=${matchDate}`);

  updateMatching = async (body: UpdateMatching) => await this.put(`Matching/UpdateMatches`, JSON.stringify(body));
}

export const matchingRepository = new MatchingRepository();
