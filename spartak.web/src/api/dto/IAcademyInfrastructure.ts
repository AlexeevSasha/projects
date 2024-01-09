import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { IMainInfo } from "./IMainInfo";
import { IImgWithWysiwygInline } from "../../modules/cms/interfaces/IImgWithWysiwygInline";
import { LocaleType } from "./LocaleType";
import { IBanner } from "./Banner";

export interface IAcademyInfrastructureAbout {
  images: {
    dark: string;
    light: string;
  };
  text1: LocaleType;
  text2: LocaleType;
  title: LocaleType;
}

export interface IAcademyInfrastructure {
  metaTags?: IMetaTags;
  mainInfo?: IMainInfo;
  about?: IAcademyInfrastructureAbout;
  description: {
    title: LocaleType;
    imgWithWysiwygInline: IImgWithWysiwygInline[];
  };
  redBlock: IBanner;
}
