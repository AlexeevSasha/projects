import { IObservation } from "./IObservation";
import { IDocumentDiseaseCard } from "./IDocumentDiseaseCard";

export interface IDiagnoseBase {
  diagnosisBizKey: number;
  stepBizKey: number;
  diagnosisDate: Date | string;
  doctorName: string;
  lpu: string;
  diagnosisName: string;
  diagnosis?: string;
  diagnosisComment?: string;
  diagnosisType?: string;
  diagnosisStatus?: string;
  deathDate: Date | string;
  deathReason?: string;
  diagnosisStatusCode: string;
  fromSms: boolean;
  observations: IObservation[];
  diagnosisParams: IObservation[];
  documents: IDocumentDiseaseCard[];
  dispensaryState?: string;
  dispensaryDateStart?: string | Date;
  dispensaryDateEnd?: string | Date;
}
