import { BaseResponce } from "common/interfaces/common";
import { Graduate, GraduatesFiltersEntity } from "common/interfaces/graduates";
import { BaseApiService } from "./BaseApiService";

class GraduatesRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchByFilter = async (filter: GraduatesFiltersEntity) => {
    const res = await this.get(`odata/Graduate?${this.getODataQuery(filter)}`);

    return { items: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: Graduate["Id"]) => {
    const { value } = await this.get<BaseResponce<Graduate[]>>(`odata/Graduate?$filter=Id eq ${id}`);

    return value[0];
  };

  publish = async (partner: Graduate) => await this.post("Graduate/Publish", JSON.stringify(partner));

  draft = async (partner: Graduate) => await this.post("Graduate/Draft", JSON.stringify(partner));

  deleteById = async (id: Graduate["Id"]) => await this.delete(`Graduate/Delete?id=${id}`);
}

export const graduatesRepository = new GraduatesRepository();
