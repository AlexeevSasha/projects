import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { LocaleType } from "./LocaleType";
import { IMainInfo } from "./IMainInfo";

export interface IStadiumContacts {
  metaTags?: IMetaTags;
  stadiumContacts: {
    title: LocaleType;
    titleDescription: LocaleType;
    info: LocaleType;
    infoDescription: LocaleType;
  }[];
  mainInfo: IMainInfo
}
