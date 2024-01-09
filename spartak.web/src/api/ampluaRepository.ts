import { ODateResponce } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { LocaleType } from "./dto/LocaleType";

interface IAmpluaFilters {
  Id?: string;
}

class AmpluaRepository extends BaseApiService {
  constructor() {
    super("match");
  }
  fetchAmplua = (filter: IAmpluaFilters = {}) =>
    this.get<ODateResponce<{ Name: LocaleType }>>(`/odata/ClientAmplua${this.getODataQuery(filter)}`, { value: [] });
}

export const ampluaRepository = new AmpluaRepository();
