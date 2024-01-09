import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { LocaleType } from "./LocaleType";
import { IBlockAboutSector } from "../../components/blockAboutSector/blockAboutSector";
import { IMainInfo } from "./IMainInfo";

export interface IServicesVip {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  redBanner?: {
    text1?: LocaleType;
    text2?: LocaleType;
  };
  blockInfo?: IBlockAboutSector[];
  planImage: LocaleType;
  exclusiveConditions: LocaleType[];
  additionalServices: IBlockAboutSector[];
  triplePhoto: {
    photo1: LocaleType;
    photo2: LocaleType;
    mainPhoto: LocaleType;
  };
}
