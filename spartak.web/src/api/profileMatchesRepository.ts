import { BaseApiService } from "./BaseApiService";
import { ISeasonNoLocate } from "./dto/ITournamentAndSeasons";
import { IContactMatch } from "./dto/TicketDto";

export type MatchsFilters = {
  currentPage: number;
  pageSize: number;
  SeasonId?: string;
};

class ProfileMatchesRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchMatches = ({ pageSize, currentPage, SeasonId }: MatchsFilters) =>
    this.get<{ Items: IContactMatch[]; Count: number }>(
      `/ContactMatch/GetContactMatches?Paged.Page=${currentPage}&Paged.PageSize=${pageSize}&SeasonId=${SeasonId}&api-version=1.0`,
      { Items: [], Count: 0 }
    );

  fetchSeasonsToFilter = () => this.get<ISeasonNoLocate[]>("/ContactMatch/GetSpartakSeasons?api-version=1.0", []);
}

export const profileMatchesRepository = new ProfileMatchesRepository();
