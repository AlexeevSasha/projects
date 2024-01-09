import { ODateResponce } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { ITeam } from "./dto/ITeam";

interface IProps {
  expand?: string;
  currentPage?: number;
  pageSize?: number;
  TeamType?: string;
  Status?: string;
  sorting?: string;
  DisplayMatchesOnTheSite?: "true" | "false";
  DisplayTeamInTheMedia?: "true" | "false";
  DisplayTeamInfoOnTheSite?: "true" | "false";
  SortOrder?: number;
  Section?: "Academy" | "Site";
  Id?: string;
}

class TeamRepository extends BaseApiService {
  constructor() {
    super("match");
  }
  fetchTeams = (filter: IProps = {}) =>
    this.get<ODateResponce<ITeam>>(`/odata/ClientTeam${this.getODataQuery(filter)}`, {
      "value": [],
      "@odata.count": 0,
    });
}

export const teamRepository = new TeamRepository();
