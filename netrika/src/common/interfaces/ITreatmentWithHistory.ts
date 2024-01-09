import { IDefaultGroupObservationHistory } from "./IObservationHistory";

export interface ITreatmentWithHistory {
  name: string;
  count: number;
  treatmentHistory: IDefaultGroupObservationHistory[];
}
