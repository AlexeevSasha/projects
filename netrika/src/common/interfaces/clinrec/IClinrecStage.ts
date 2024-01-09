import { IClinrecThesis } from "./IClinrecThesis";

export interface IClinrecStage {
  stageCode: string;
  stageOrder: number;
  stageName: string;
  theses: IClinrecThesis[];
}
