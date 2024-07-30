import { IContent } from "./IContent";

export interface IBannerResponse extends IContent {
  additionalInfo: string;
}

export interface IBanner extends IContent {
  additionalInfo: {
    bannerInfo: IBannerButton[];
    image: string;
  };
}

export interface IBannerButton {
  title: string;
  xPoint: number;
  yPoint: number;
  length: number;
  fullWidth: boolean;
  color: string;
  linkType: string;
  linkValue: string;
  transparentBackGround: boolean;
  backGroundColor: string;
}
