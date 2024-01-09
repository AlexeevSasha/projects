import { IMetaTags } from "./IMetaTags";
import { LocaleType } from "./common";
import { IMainInfo } from "./IMainInfo";

export interface IStadiumHowToGet {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  howToGet?: {
    title?: LocaleType;
    description?: LocaleType;
  }[];
}
