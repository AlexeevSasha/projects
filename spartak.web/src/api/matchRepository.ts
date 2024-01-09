import { BaseFilters } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { IBlocksOfMatch } from "./dto/IBlocksOfMatch";
import { IMatchDto, LineUp, MatchEvent } from "./dto/IMatchDto";
// import { IParkingDto } from "./dto/IParkingDto";
import { IStatistic } from "./dto/IStatistic";
import { IEventTickets } from "./dto/ITickets";
import { ITournamentAndSeasons } from "./dto/ITournamentAndSeasons";
import { ITournamentTable } from "./dto/ITournamentTable";

type BaseMatchFilters = BaseFilters & {
  teamId?: string;
};

interface CalendarFilters extends BaseMatchFilters {
  tournamentId?: string;
  seasonId?: string;
  type?: "Future" | "Past" | "Current";
}

interface ITournamentTableFilters {
  tournamentId?: string;
  seasonId?: string;
  teamId?: string;
}

interface IMatchFilters {
  matchId?: string;
}

interface IMatchEventsFilters {
  matchId?: string;
}

interface IMatchLineups {
  matchId?: string;
}

interface IMatchStatistic {
  matchId?: string;
}

class MatchRepository extends BaseApiService {
  constructor() {
    super("match/MatchClient");
  }
  fetchTournamentsAndSeasons = (filters: BaseMatchFilters = {}) =>
    this.get<ITournamentAndSeasons[]>(`/TournamentsAndSeasons?${this.getFilters(filters)}`, []);

  fetchCalendar = (filters: CalendarFilters = {}) => this.get<IMatchDto[]>(`/Calendar?${this.getFilters(filters)}`, []);

  fetchBlocksOfMatches = (filters: BaseMatchFilters = {}, defaultValue = {}) =>
    this.get<IBlocksOfMatch>(`/BlockOfMatches?${this.getFilters(filters)}`, defaultValue);

  fetchMatch = (filters: IMatchFilters = {}, defaultValue = {}) =>
    this.get<IMatchDto>(`/Match?${this.getFilters(filters)}`, defaultValue);

  fetchMatchStatistic = (filters: IMatchStatistic = {}) =>
    this.get<IStatistic>(`/Statistic?${this.getFilters(filters)}`, {});

  fetchTournamentTable = (filters: ITournamentTableFilters = {}) =>
    this.get<ITournamentTable[]>(`/TournamentTable?${this.getFilters(filters)}`, []);

  fetchMatchLineups = (filters: IMatchLineups = {}) =>
    this.get<LineUp>(`/MatchLineups?${this.getFilters(filters)}`, {});

  fetchMatchEvents = (filters: IMatchEventsFilters = {}) =>
    this.get<MatchEvent[]>(`/MatchEvents?${this.getFilters(filters)}`, []);

  // fetchForSaleTickets = (filters: BaseMatchFilters = {}, access_token?: string) =>
  //   this.get<IMatchDto[]>(
  //     `/CalendarForSaleTickets?${this.getFilters(filters)}`,
  //     [],
  //     access_token ? { Authorization: `Bearer ${access_token}` } : {}
  //   );

  // getParking = (defaultValue = {}, access_token?: string) =>
  //   this.get<IParkingDto[]>(
  //     "/Parking?api-version=1.0",
  //     defaultValue,
  //     access_token ? { Authorization: `Bearer ${access_token}` } : {}
  //   );

  getTicketsList = (filters: BaseMatchFilters = {}, access_token?: string) =>
    this.get<IEventTickets[]>(
      `/EventsForSaleTickets?${this.getFilters(filters)}`,
      [],
      access_token ? { Authorization: `Bearer ${access_token}` } : {}
    );
}

export const matchRepository = new MatchRepository();
