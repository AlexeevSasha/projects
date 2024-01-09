import { IMetaTags } from "./IMetaTags";
import { IMainInfo } from "./IMainInfo";
import { LocaleType } from "./common";

export interface IStadiumStaff {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  admissionConditions?: {
    title?: LocaleType;
    description?: LocaleType;
  };
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
}
