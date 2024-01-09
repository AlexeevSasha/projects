import { BaseApiService } from "./BaseApiService";
import { ICoach } from "./dto/ICoach";

interface ICoachesFilters {
  Status?: "Published";
  IsDraft?: "false" | "true";
  InTeamArray?: string;
  sorting?: string;
  coachesTeam?: string;
  coachSection?: "Academy" | "Site";
  Id?: string;
  expand?: string;
}

class CoachesRepository extends BaseApiService {
  constructor() {
    super("match");
  }
  fetchCoaches = (filter: ICoachesFilters = {}) =>
    this.get<{ value: ICoach[] }>(`/odata/ClientCoach${this.getODataQuery(filter)}`, {
      value: [],
    });
}

export const coachesRepository = new CoachesRepository();
