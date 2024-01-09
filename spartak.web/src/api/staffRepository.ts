import { ODateResponce } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { IStaff } from "./dto/IStaff";

interface IStaffFilters {
  Status?: "Published";
  IsDraft?: "false" | "true";
  InTeamArray?: string;
  sorting?: string;
  StaffCoachesTeam?: string;
  Section?: "Academy" | "Site";
  coachSection?: "Academy" | "Site"; // Называется так, потому что уже есть подобный кейс в getODataQuery
  StaffSection?: "Academy" | "Site";
}

class StaffRepository extends BaseApiService {
  constructor() {
    super("match");
  }
  fetchStaff = (filter: IStaffFilters = {}) =>
    this.get<ODateResponce<IStaff>>(
      `/odata/ClientStaff${this.getODataQuery({ ...filter, Type: "Ordinary", expand: "Teams" })}`,
      {
        value: [],
      }
    );
}

export const staffRepository = new StaffRepository();
