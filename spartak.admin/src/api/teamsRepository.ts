import { BaseResponce } from "common/interfaces/common";
import { Team, TeamsFilters } from "common/interfaces/teams";
import { BaseApiService } from "./BaseApiService";

class TeamsRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchAll = async (Section: string | undefined) => {
    const sectionFilter = Section ? ` and (Section eq '${Section}' or Section eq 'None')` : "";

    return (
      await this.get(`odata/Team?$count=true&$filter=DeletedUtc eq null and Status eq 'Published'${sectionFilter}`)
    ).value;
  };

  fetchByFilter = async (filter: TeamsFilters) => {
    const res = await this.get(`odata/Team?${this.getODataQuery(filter)}`);

    return { teams: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: Team["Id"]) => {
    const { value } = await this.get<BaseResponce<Team[]>>(`odata/Team?$filter=Id eq ${id}`);

    return {
      ...value[0],
      CityId: value[0].City?.Id,
      CountryId: value[0].Country?.Id,
    };
  };

  publish = async (partner: Team) => await this.post("Team/Publish", JSON.stringify(partner));

  draft = async (partner: Team) => await this.post("Team/Draft", JSON.stringify(partner));

  deleteById = async (id: Team["Id"]) => await this.delete(`Team/Delete?teamId=${id}&api-version=Directories`);
}

export const teamsRepository = new TeamsRepository();
