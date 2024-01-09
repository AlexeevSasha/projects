import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { IMainInfo } from "./IMainInfo";
import { LocaleType } from "./LocaleType";

export interface IStadiumStaff {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  admissionConditions?: {
    title?: LocaleType;
    description?: LocaleType;
  }[];
  questionAnswer?: {
    title?: LocaleType;
    blockQuestionsAnswers?: {
      question?: LocaleType;
      answer?: LocaleType;
    }[];
  };
  staffEventTeam?: {
    firstColumn?: LocaleType;
    secondColumn?: LocaleType;
    title?: LocaleType;
  };
  stewardsCategory?: {
    description?: LocaleType;
    stewards?: LocaleType[];
    title?: LocaleType;
  };
  partOfTeam: { title: LocaleType; step1: LocaleType; step2: LocaleType; step3: LocaleType; description: LocaleType };
}
