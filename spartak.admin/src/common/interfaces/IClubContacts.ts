import { IMetaTags } from "./IMetaTags";
import { LocaleType } from "./common";
import { IMainInfo } from "./IMainInfo";

export interface IClubContacts {
  metaTags?: IMetaTags;
  clubContacts?: {
    title: LocaleType;
    description: LocaleType;
  };
  mainInfo?: IMainInfo;
}
