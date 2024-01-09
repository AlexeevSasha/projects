import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { ITextOnRedBackground } from "../../modules/cms/interfaces/ITextOnRedBackground";
import { IMainInfo } from "./IMainInfo";
import { IImgWithWysiwygInline } from "../../modules/cms/interfaces/IImgWithWysiwygInline";

export interface ICorporateClients {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  form?: {
    img: string;
    show: boolean;
  };
  imgWithWysiwygInline?: IImgWithWysiwygInline[];
  redBanner: ITextOnRedBackground;
}
