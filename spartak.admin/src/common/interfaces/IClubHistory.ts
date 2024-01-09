import { IMetaTags } from "./IMetaTags";
import { LocaleType } from "./common";
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
  };
}
