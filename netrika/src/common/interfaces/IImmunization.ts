import { IVaccinationList } from "./IVaccinationList";
import { IReactList } from "./IReactList";
import { IMedicalExemptionList } from "./medical/IMedicalExemptionList";
import { IImmunizationList } from "./IImmunizationList";

export interface IImmunization {
  vaccinationList: IVaccinationList[];
  immunizationList: IImmunizationList[];
  reactList: IReactList[];
  medicalExemptionList: IMedicalExemptionList[];
}
