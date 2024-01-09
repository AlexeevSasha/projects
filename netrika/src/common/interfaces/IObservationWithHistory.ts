import { IDefaultGroupObservationHistory, IObservationHistory } from "./IObservationHistory";
import { IDefaultGroupObservation, IObservation } from "./IObservation";

export interface IObservationWithHistory extends IObservation {
  history: IObservationHistory[];
}
export interface IDefaultGroupObservationWithHistory extends IDefaultGroupObservation {
  history: IDefaultGroupObservationHistory[];
}
