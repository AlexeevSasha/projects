import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { IMainInfo } from "./IMainInfo";
import { ITextOnRedBackground } from "../../modules/cms/interfaces/ITextOnRedBackground";
import { LocaleType } from "./LocaleType";
import { IImgWithWysiwygInline } from "../../modules/cms/interfaces/IImgWithWysiwygInline";

export interface IFamilySector {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  imgWithWysiwygInline?: IImgWithWysiwygInline[];
  redBanner: ITextOnRedBackground;
  sectorPlane: LocaleType;
}
