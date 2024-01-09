import type { IMatchDto } from "./IMatchDto";

export interface IBlocksOfMatch {
  Past?: IMatchDto;
  Current?: IMatchDto;
  Future?: IMatchDto[];
}
