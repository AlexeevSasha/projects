import { ODateResponce } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { GraduateEntity } from "./dto/Graduate";

type Filter = {
  currentPage?: number;
  pageSize?: number;
  sorting?: string;
  Status?: string;
  SortOrder?: number;
  Id?: string;
  GraduateSectionId?: string;
};

class GraduateRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchGraduates = (filter: Filter = {}) =>
    this.get<ODateResponce<GraduateEntity>>(`/odata/ClientGraduate${this.getODataQuery(filter)}`, {
      "value": [],
      "@odata.count": 0,
    });
}

export const graduateRepository = new GraduateRepository();
