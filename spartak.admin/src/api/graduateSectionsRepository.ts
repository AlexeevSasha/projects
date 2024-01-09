import { BaseResponce } from "common/interfaces/common";
import { GraduateSection, GraduateSectionsFiltersEntity } from "common/interfaces/graduateSections";
import { BaseApiService } from "./BaseApiService";

class GraduateSectionsRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchByFilter = async (filter: GraduateSectionsFiltersEntity) => {
    const res = await this.get(`odata/GraduateSection?${this.getODataQuery(filter)}`);

    return { items: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: GraduateSection["Id"]) => {
    const { value } = await this.get<BaseResponce<GraduateSection[]>>(`odata/GraduateSection?$filter=Id eq ${id}`);

    return value[0];
  };

  publish = async (partner: GraduateSection) => await this.post("GraduateSection/Publish", JSON.stringify(partner));

  draft = async (partner: GraduateSection) => await this.post("GraduateSection/Draft", JSON.stringify(partner));

  deleteById = async (id: GraduateSection["Id"]) => await this.delete(`GraduateSection/Delete?id=${id}`);
}

export const graduateSectionsRepository = new GraduateSectionsRepository();
