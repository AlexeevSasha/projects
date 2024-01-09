import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { IMainInfo } from "./IMainInfo";
import { LocaleType } from "./LocaleType";

export interface IClubLeaders {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  blockInfo?: {
    name: LocaleType;
    surname: LocaleType;
    position: LocaleType;
    img: LocaleType;
  }[];
}