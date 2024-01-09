import { ODateResponce } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { IStaff } from "./dto/IStaff";

interface IMedicalFilters {
  Status?: "Published";
  IsDraft?: "false" | "true";
  InTeamArray?: string;
  sorting?: string;
  StaffCoachesTeam?: string;
}

class MedicalRepository extends BaseApiService {
  constructor() {
    super("match");
  }
  fetchMedical = (filter: IMedicalFilters = {}) =>
    this.get<ODateResponce<IStaff>>(`/odata/ClientStaff${this.getODataQuery({ ...filter, Type: "Medical" })}`, {
      value: [],
    });
}

export const medicalRepository = new MedicalRepository();
