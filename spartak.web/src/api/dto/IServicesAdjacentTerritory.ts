import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { IBlockAboutSector } from "../../components/blockAboutSector/blockAboutSector";
import { LocaleType } from "./LocaleType";
import { IMainInfo } from "./IMainInfo";

export interface IServicesAdjacentTerritory {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  redBanner?: {
    text1?: LocaleType;
    text2?: LocaleType;
  };
  blockInfo?: IBlockAboutSector[];
}
