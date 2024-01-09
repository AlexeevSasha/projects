import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { LocaleType } from "./LocaleType";
import { IMainInfo } from "./IMainInfo";

export interface IClubHistory {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  anniversaryOfCreation?: {
    description?: LocaleType;
    firstImg?: string;
    secondImg?: string;
    title?: LocaleType;
  };
  historyOfCreation?: {
    description?: LocaleType;
    img?: string;
    title?: LocaleType;
  };
  emblemHistory: {
    title?: LocaleType;
    firstColumn?: LocaleType;
    secondColumn?: LocaleType;
    emblems?: {
      periodOfUseEmblem?: LocaleType;
      photoOfEmblem?: string;
    }[];
  }
}