import { IPatientObservationRates } from "./patient/IPatientObservationRates";

export interface IIndicatorDynamics {
  codName: string;
  observations: IPatientObservationRates[];
}
