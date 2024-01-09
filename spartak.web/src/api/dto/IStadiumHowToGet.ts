import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { LocaleType } from "./LocaleType";
import { IMainInfo } from "./IMainInfo";

export interface IStadiumHowToGet {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  howToGet?: {
    title?: LocaleType;
    description?: LocaleType;
  }[]
}
