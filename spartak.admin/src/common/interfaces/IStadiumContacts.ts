import { IMetaTags } from "./IMetaTags";
import { LocaleType } from "./common";
import { IMainInfo } from "./IMainInfo";

export interface IStadiumContacts {
  metaTags?: IMetaTags;
  stadiumContacts?: {
    title?: LocaleType;
    titleDescription?: LocaleType;
    info?: LocaleType;
    infoDescription?: LocaleType;
  }[];
  mainInfo?: IMainInfo;
}
