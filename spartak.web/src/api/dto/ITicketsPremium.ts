import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { IMainInfo } from "./IMainInfo";
import { ITextOnRedBackground } from "../../modules/cms/interfaces/ITextOnRedBackground";
import { IImgWithWysiwygInline } from "../../modules/cms/interfaces/IImgWithWysiwygInline";
import { LocaleType } from "./LocaleType";
import { IFoodCourtDescription } from "../../modules/cms/interfaces/IFoodCourtDescription";

export interface ITicketsBlock {
  title?: string;
  img?: string;
  description?: string;
  list?: {
    title: string;
    items: string[];
  };
}

export interface TicketsPremium {
  title: string;
  data: {
    redBanner: string[];
    listSectorInfo1: ITicketsBlock[];
    hospitalityPackages: {
      title: string;
      images: string[];
      foodCourtData: string[];
    }[];
  };
}

export interface ITicketsPremium {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  redBanner?: ITextOnRedBackground;
  imgWithWysiwygInline?: IImgWithWysiwygInline[];
  lodgePlan?: LocaleType;
  premiumLevel?: IFoodCourtDescription[];
}
