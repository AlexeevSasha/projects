import type { IBaseTeam } from "./IMatchDto";

export interface ITournamentTable {
  Team: IBaseTeam;
  Total: number;
  Won: number;
  Draw: number;
  Goals: string;
  Lost: number;
  Points: number;
  index?: number;
  active?: boolean;
  GroupName?: string;
}
