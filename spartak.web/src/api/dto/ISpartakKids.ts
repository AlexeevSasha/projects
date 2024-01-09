import { LocaleType } from "./LocaleType";
import { IMainInfo } from "./IMainInfo";
import { IMetaTags } from "../../components/baseMeta/baseMeta";

export interface IBlockDescription {
  buttonTitle?: LocaleType;
  description?: LocaleType;
  link?: LocaleType;
  title?: LocaleType;
  photo?: LocaleType;
}

export interface ISpartakKids {
  answersQuestions?: { title?: LocaleType; list?: { answer?: LocaleType; question?: LocaleType }[] };
  becomePartOfTeam?: IBlockDescription & {
    img?: LocaleType;
  };
  mainInfo?: IMainInfo;
  metaTags?: IMetaTags;
  memberPrivileges?: {
    title?: LocaleType;
    list?: LocaleType[];
  };
  redBlock?: IBlockDescription & {
    desktop?: LocaleType;
    tablet?: LocaleType;
    mobile?: LocaleType;
  };
  takePlayerToField?: IBlockDescription;
}
