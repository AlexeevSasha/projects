import { LocaleType } from "./common";
import { IBlockAboutSector } from "./IBlockAboutSector";
import { IMetaTags } from "./IMetaTags";
import { IMainInfo } from "./IMainInfo";

export interface IServicesVip {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  redBanner?: {
    text1?: LocaleType;
    text2?: LocaleType;
  };
  blockInfo?: IBlockAboutSector[];
  boxesList: {
    numbersOfBoxes: LocaleType;
    countSeats: LocaleType;
    boxSquare: LocaleType;
    tier: LocaleType;
  }[];
  packagesOfHospitality?: {
    base: {
      label: LocaleType[];
    };
    exclusive: {
      label: LocaleType[];
    };
  };
  additionalServices: IBlockAboutSector[];
  triplePhoto: {
    photo1: LocaleType;
    photo2: LocaleType;
    mainPhoto: LocaleType;
  };
}
