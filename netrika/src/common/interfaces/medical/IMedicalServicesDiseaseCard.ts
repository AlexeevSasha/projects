import { IDocumentDiseaseCard } from "../IDocumentDiseaseCard";

export interface IMedicalServicesDiseaseCard {
  servicesDate: Date;
  assignedServices: IMedicalServicesItem[];
  servicesRendered: IMedicalServicesItem[];
}

export interface IMedicalServicesItem {
  fromSms: boolean;
  codeName: string;
  serviceParams: { code: string; value: string }[];
  documents: IDocumentDiseaseCard[];
}
