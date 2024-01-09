import { LocaleType } from "./LocaleType";
import { IMainInfo } from "./IMainInfo";
import { IMetaTags } from "../../components/baseMeta/baseMeta";

export interface IPriceBlock {
  label?: LocaleType;
  value?: LocaleType;
}

export interface IStandardTour {
  title?: LocaleType;
  description?: LocaleType;
  options?: LocaleType[];
  img?: string;
  price1?: IPriceBlock;
  price2?: IPriceBlock;
  pricesDescription?: LocaleType;
  link?: LocaleType;
  buttonName?: LocaleType;
}
export interface ICustomTour {
  additionalDescription?: LocaleType;
  description?: LocaleType;
  img?: LocaleType;
  link?: LocaleType;
  buttonName?: LocaleType;
  price1?: IPriceBlock;
  price2?: IPriceBlock;
  priceFrom?: LocaleType;
  priceTo?: LocaleType;
  title?: LocaleType;
  additionalInfo?: LocaleType;
  type?: string;
}
export interface IExcursionTour {
  excursionTours?: {
    mainInfo?: IMainInfo;
    metaTags?: IMetaTags;
    redBanner?: {
      text1?: LocaleType;
      text2?: LocaleType;
    };
    standardTour?: IStandardTour;
    customTours?: ICustomTour[];
    additional?: {
      img?: LocaleType;
      text?: LocaleType;
    };
  };
}
//Экскурсии из билетки
export interface IExcursion {
  Id: string;
  InfoTechId: number;
  Name: LocaleType;
  ExcursionDate: string;
  Limit: number;
  TypeId: number;
  TypeName: LocaleType;
  CategoryName: LocaleType;
  Price: number;
  SeatrootId: number;
  SeatrootName: LocaleType;
}
