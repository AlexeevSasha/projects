import { Partner, PartnerFilters } from "common/interfaces/partners";
import { BaseApiService } from "./BaseApiService";

class PartnersRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchByFilter = async (filter: PartnerFilters) => {
    const { value: partners, ["@odata.count"]: count } = await this.get(`odata/Partner?${this.getODataQuery(filter)}`);

    return { partners, count };
  };

  fetchById = async (id: Partner["Id"]) => {
    const { value } = await this.get(`odata/Partner?$filter=Id eq ${id}`);

    return value[0];
  };

  publishPartner = async (partner: Partner) => await this.post("Partner/Publish", JSON.stringify(partner));

  draft = async (partner: Partner) => await this.post("Partner/Draft", JSON.stringify(partner));

  deletePartner = async (id: Partner["Id"]) => await this.delete(`Partner/Delete?id=${id}`);
}

export const partnersRepository = new PartnersRepository();
