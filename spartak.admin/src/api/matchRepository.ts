import { BaseResponce } from "common/interfaces/common";
import { Match, MatchEvent, MatchFilters, MatchLineUp } from "common/interfaces/matches";
import { BaseApiService } from "./BaseApiService";

class MatchRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchByFilter = async (filter: MatchFilters = {}) => {
    const { value: items, ["@odata.count"]: count } = await this.get(`odata/MatchItems?${this.getODataQuery(filter)}`);

    return { items, count };
  };

  fetchById = async (id: Match["Id"]) => this.getMatch(await this.get<Match>(`Match/GetMatchInfo?matchId=${id}`));

  publish = async (match: Match) =>
    this.getMatch(await this.post<string, Match>("Match/Publish", this.getMatchBody(match)));

  draft = async (match: Match) =>
    this.getMatch(await this.post<string, Match>("Match/Draft", this.getMatchBody(match)));

  deleteById = async (id: Match["Id"]) => await this.delete(`Match/Delete/${id}`);

  fetchLineUp = async (id: Match["Id"]) => await this.get<MatchLineUp>(`MatchLineUp/GetMatchLineUp?MatchId=${id}`);

  saveLineUp = async (lineUp: MatchLineUp) => await this.post("MatchLineUp/Save", JSON.stringify(lineUp));

  fetchEvents = async (id: Match["Id"]) => {
    const { value } = await this.get<BaseResponce<MatchEvent[]>>(
      `odata/MatchAction?$expand=Team,Coach&&$orderby=Minute desc&$filter=MatchId eq ${id}`
    );

    return value.map(this.getEvent);
  };

  saveEvent = async (event: MatchEvent) => await this.post("MatchAction/Save", JSON.stringify(event));

  deleteEvent = async (id: MatchEvent["Id"]) => await this.delete(`MatchAction/Delete/${id}`);

  fetchRuStatMatches = async (teamId: string, date: Match["MatchStartDateTime"]) =>
    await this.get(`Match/GetRustatMatches?teamId=${teamId}&matchDate=${date}&api-version=1.0`);

  private getMatchBody = ({ infoHome, infoGuest, ...match }: Match) => {
    if (infoHome && infoGuest) {
      match.MatchInfoStat = [
        { ...infoHome, IsHomeTeam: true },
        {
          ...infoGuest,
          IsHomeTeam: false,
          ScoredGoal: infoHome.ConcededGoal,
          ConcededGoal: infoHome.ScoredGoal,
          ScoredPenaltyGoal: infoHome.ConcededPenaltyGoal,
          ConcededPenaltyGoal: infoHome.ScoredPenaltyGoal,
        },
      ];
    }

    return JSON.stringify(match);
  };

  private getMatch = ({ MatchInfoStat, ...match }: Match) => {
    const infoHome = MatchInfoStat?.find((item) => item.IsHomeTeam);
    const infoGuest = MatchInfoStat?.find((item) => !item.IsHomeTeam);

    return {
      ...match,
      infoHome: { ...infoHome, TeamId: infoHome?.Team?.Id },
      infoGuest: { ...infoGuest, TeamId: infoGuest?.Team?.Id },
      StadiumId: match.Stadium?.Id,
      TournamentId: match.Tournament?.Id,
      SeasonId: match.Season?.Id || null,
    };
  };

  private getEvent = ({ Player, OtherPlayer, Team, Coach, ...event }: MatchEvent) => {
    return {
      ...event,
      key: event.Id,
      PlayerId: Player?.Id || Coach?.Id,
      OtherPlayerId: OtherPlayer?.Id,
      TeamId: Team?.Id,
    };
  };
}

export const matchRepository = new MatchRepository();
