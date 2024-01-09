import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { IMainInfo } from "./IMainInfo";
import { LocaleType } from "./LocaleType";

export interface IAcademyEnter {
  metaTags: IMetaTags;
  mainInfo?: IMainInfo;
  info: {
    firstParagraph?: LocaleType;
    firstParagraphImg?: LocaleType;
    secondParagraph?: LocaleType;
    secondParagraphImg?: LocaleType;
    thirdParagraph?: LocaleType;
    thirdParagraphImg?: LocaleType;
    fourthParagraph?: LocaleType;
    fourthParagraphImg?: LocaleType;
  };
}
