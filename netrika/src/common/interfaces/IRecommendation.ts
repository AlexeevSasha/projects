import { IObservation } from "./IObservation";

export interface IRecommendation {
  observationDateTime: Date | string;
  observation: IObservation[];
}
