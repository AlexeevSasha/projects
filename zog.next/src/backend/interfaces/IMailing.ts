import { LetterEnum } from "../../modules/mailing/interfaces/LetterEnum";
import { CriterionEnum } from "./Criterion";

export interface IMailing {
  criterion: CriterionEnum;
  letter: keyof typeof LetterEnum;
  target_email: string;
  title: string;
}
