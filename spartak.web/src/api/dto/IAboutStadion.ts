import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { LocaleType } from "./LocaleType";
import { IMainInfo } from "./IMainInfo";

export interface IAboutStadium {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  characteristic?: {
    img?: LocaleType;
    list?: { name?: LocaleType; description?: LocaleType }[];
    columnText1?: LocaleType;
    columnText2?: LocaleType;
  };
  achievements: {
    img?: LocaleType;
    list?: { year?: LocaleType; description?: LocaleType; reward?: LocaleType }[];
  };
  stadiumHistory: {
    title?: LocaleType;
    firstParagraph1Column?: LocaleType;
    firstParagraph2Column?: LocaleType;
    firstParagraphImg?: LocaleType;
    secondParagraph1Column?: LocaleType;
    secondParagraphImg?: LocaleType;
    thirdParagraphImg?: LocaleType;
    thirdParagraph2Column?: LocaleType;
  };
}
