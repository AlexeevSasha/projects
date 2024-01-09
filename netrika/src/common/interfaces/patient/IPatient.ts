import { ICoverage } from "../ICoverage";
import { RemdVimisControlStatusEnum } from "../RemdVimisControlStatusEnum";

export interface IPatient {
  name: string;
  birthDate: Date | string;
  deathDate?: Date | string;
  age: number;
  ageDescription: string;
  gender: string;
  doctorPortalCardUrl: string;
  firstVisitDate: Date | string;
  lastVisitDate: Date | string;
  firstVisitLpu?: string;
  lastVisitLpu?: string;
  coverage: ICoverage[];
  snilsNumber: string;
  policyUniteNumber: string;
  phone: string;
  controlVimis:
    | { recipientSystem: string; vimisControlDate: Date | string; status: RemdVimisControlStatusEnum }[]
    | null;
}
