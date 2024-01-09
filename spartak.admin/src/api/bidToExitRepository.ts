import { BaseResponce } from "common/interfaces/common";
import { BidToExitEntity, BidToExitFiltersEntity } from "common/interfaces/kids";
import { BaseApiService } from "./BaseApiService";

class BidToExitRepository extends BaseApiService {
  constructor() {
    super("media");
  }

  fetchByFilter = async (filter: BidToExitFiltersEntity = {}) => {
    const res = await this.get<BaseResponce<BidToExitEntity[]>>(`odata/PlayerToField?${this.getODataQuery(filter)}`);

    return { items: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: BidToExitEntity["Id"]) => {
    const { value } = await this.get(`odata/PlayerToField?$filter=Id eq ${id}`);

    return value[0];
  };

  save = async (body: BidToExitEntity) => await this.post(`PlayerToField/Save`, JSON.stringify(body));

  update = async (body: BidToExitEntity) => await this.post(`PlayerToField/Update`, JSON.stringify(body));
}

export const bidToExitRepository = new BidToExitRepository();
