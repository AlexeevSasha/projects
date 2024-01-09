import { IMedicalViolationReaderData } from "./IMedicalViolationReaderData";

export interface IMedicalViolation {
  id: number;
  qualityName: string;
  qualityDescription: string;
  parentId: number;
  medicalViolationResult: IMedicalViolationReaderData[];
}
