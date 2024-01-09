import { IMedicineObservationWithHistory } from "./IMedicineObservationWithHistory";

export interface IAllMedicineWithHistory {
  medClassificationName: string;
  medWithHistory: IMedicineObservationWithHistory[];
}
