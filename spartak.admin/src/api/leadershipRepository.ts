import { BaseResponce } from "common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { ILeadership, LeadershipFilters } from "../common/interfaces/ILeadership";

class LeadershipRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchByFilter = async (filter: LeadershipFilters) => {
    const res = await this.get(`odata/Boss?${this.getODataQuery(filter)}`);

    return { leadership: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: ILeadership["Id"]) => {
    const { value } = await this.get<BaseResponce<ILeadership[]>>(`odata/Boss?$filter=Id eq ${id}`);

    return {
      ...value[0],
    };
  };

  publish = async (leadership: ILeadership) => await this.post("Boss/Publish", JSON.stringify(leadership));

  draft = async (leadership: ILeadership) => await this.post("Boss/Draft", JSON.stringify(leadership));

  deleteById = async (id: ILeadership["Id"]) => await this.delete(`Boss/Delete?id=${id}`);
}

export const leadershipRepository = new LeadershipRepository();
