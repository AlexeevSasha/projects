import { IObservation } from "../IObservation";

export interface IMedDoc {
  header: string;
  docTypeName: string;
  medDocBizKey: number;
  url: string;
  medDocViewId: string;
  observation: IObservation[];
}
