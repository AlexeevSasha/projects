import { LocaleType } from "./LocaleType";
import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { IMainInfo } from "./IMainInfo";

export interface IAcademyBlocks {
  title: LocaleType;
  contacts: {
    address: LocaleType;
    phone: LocaleType[];
    email: LocaleType;
  };
  info: {
    title: LocaleType;
    description: LocaleType;
  }[];
  coordinates: {
    subway: number[];
    train: number[];
    car: number[];
    trainSimple: number[];
    stadium: number[];
  };
}

export interface IAcademyContacts {
  metaTags: IMetaTags;
  mainInfo: IMainInfo;
  infoBlocks: IAcademyBlocks[];
}
