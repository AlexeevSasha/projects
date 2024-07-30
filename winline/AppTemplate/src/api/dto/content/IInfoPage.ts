import { IContent } from "./IContent";

export interface IInfoPage extends IContent {
  additionalInfo: {
    buttons: [];
    htmlContent: string;
  };
}

export interface IInfoPageResponse extends IContent {
  additionalInfo: string;
}
