import { BaseResponce } from "common/interfaces/common";
import { Stadium, StadiumFilters } from "common/interfaces/stadiums";
import { BaseApiService } from "./BaseApiService";

class StadiumsRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchAll = async () => {
    const { value } = await this.get<BaseResponce<Stadium[]>>("odata/Stadium");

    return value;
  };

  fetchByFilter = async (filter: StadiumFilters) => {
    const res = await this.get(`odata/Stadium?${this.getODataQuery(filter)}`);

    return { stadiums: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: Stadium["Id"]) => {
    const { value } = await this.get(`odata/Stadium?$filter=Id eq ${id}`);

    return value[0];
  };

  publish = async (partner: Stadium) => await this.post("Stadium/Publish", JSON.stringify(partner));

  deleteById = async (id: Stadium["Id"]) => await this.delete(`Stadium/Delete?id=${id}`);
}

export const stadiumsRepository = new StadiumsRepository();
