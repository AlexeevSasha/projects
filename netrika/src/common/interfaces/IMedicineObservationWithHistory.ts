import { IDefaultGroupObservationHistory } from "./IObservationHistory";

export interface IMedicineObservationWithHistory {
  name: string;
  atxGroup: string;
  atxGroupCode: string;
  history: IDefaultGroupObservationHistory[];
}
