import { ODateResponce } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { ILeadership } from "./dto/ILeadership";

interface ILeadershipFilter {
  Status?: "Published";
  Id?: string;
  IsDraft?: "false" | "true";
  InTeamArray?: string;
  sorting?: string;
  Section?: "Academy" | "Site";
}

class LeadershipRepository extends BaseApiService {
  constructor() {
    super("match");
  }
  fetchLeadership = (filter: ILeadershipFilter = {}) =>
    this.get<ODateResponce<ILeadership>>(`/odata/ClientBoss${this.getODataQuery(filter)}`, {
      value: [],
    });
}

export const leadershipRepository = new LeadershipRepository();
