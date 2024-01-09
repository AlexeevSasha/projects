import { IDefaultGroupObservationHistory } from "./IObservationHistory";

export interface IServiceInterventionWithHistory {
  name: string;
  date: Date | string;
  surgicalHistory: IDefaultGroupObservationHistory[];
}
