import { IPompState } from "./IPompState";

export interface IPompStage {
  stageCode: string;
  stageOrder: number;
  stageName: string;
  pompStates: IPompState[];
}
