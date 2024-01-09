import { BaseApiService } from "./BaseApiService";
import { IPartner } from "./dto/IPartner";

class PartnerRepository extends BaseApiService {
  constructor() {
    super("match");
  }
  //Изменить когда Андрей исправит
  fetchPartners = (filter: any = {}) =>
    this.get<{ value: IPartner[] }>(`/odata/Partner${this.getODataQuery(filter)}`, { value: [] });
}

export const partnerRepository = new PartnerRepository();
