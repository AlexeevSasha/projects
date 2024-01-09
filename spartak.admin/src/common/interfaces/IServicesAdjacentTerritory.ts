import { LocaleType } from "./common";
import { IBlockAboutSector } from "./IBlockAboutSector";
import { IMetaTags } from "./IMetaTags";
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
