import { IMedicalViolation } from "./IMedicalViolation";
import { IDiseaseCard } from "../IDiseaseCard";

export interface IMedicalViolations extends IDiseaseCard {
  qualityCriterion: IMedicalViolation[];
}
