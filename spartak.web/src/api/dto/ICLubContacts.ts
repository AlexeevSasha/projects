import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { LocaleType } from "./LocaleType";
import { IMainInfo } from "./IMainInfo";

export interface IClubContacts {
  metaTags?: IMetaTags;
  clubContacts?: {
    title?: LocaleType;
    description?: LocaleType;
  }[];
  mainInfo?: IMainInfo
}
