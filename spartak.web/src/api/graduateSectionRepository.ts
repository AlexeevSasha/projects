import { ODateResponce } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { GraduateSectionEntity } from "./dto/GraduateSecion";

type Filter = {
  currentPage?: number;
  pageSize?: number;
  sorting?: string;
  Status?: string;
  SortOrder?: number;
  Id?: string;
};

class GraduateSectionsRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchGraduateSections = (filter: Filter = {}) =>
    this.get<ODateResponce<GraduateSectionEntity>>(`/odata/ClientGraduateSection${this.getODataQuery(filter)}`, {
      "value": [],
      "@odata.count": 0,
    });
}

export const graduateSectionRepository = new GraduateSectionsRepository();
