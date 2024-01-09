import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { IMainInfo } from "./IMainInfo";
import { LocaleType } from "./LocaleType";

export interface IPrivacy {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  description?: LocaleType;
}
