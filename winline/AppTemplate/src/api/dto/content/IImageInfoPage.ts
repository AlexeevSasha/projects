import { IContent } from "./IContent";

export interface IImageInfoPage extends IContent {
  additionalInfo: {
    path: string;
  };
}

export interface IImageInfoPageResponse extends IContent {
  additionalInfo: string;
}
