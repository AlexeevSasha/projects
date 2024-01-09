import { IInstrumentalResearchWithHistory } from "./IInstrumentalResearchWithHistory";
import { IDefaultGroupObservationWithHistory } from "./IObservationWithHistory";
import { IServiceInterventionWithHistory } from "./IServiceInterventionWithHistory";

export interface IInstrumentalResearchHistory {
  instrResearch: IInstrumentalResearchWithHistory[];
  observations: IDefaultGroupObservationWithHistory[];
  services: IServiceInterventionWithHistory[];
}
