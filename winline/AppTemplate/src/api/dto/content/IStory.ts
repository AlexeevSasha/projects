import { Moment } from "moment";
import { IContent } from "./IContent";

export interface IStoryResponse extends IContent {
  additionalInfo: string;
}

export interface IStory extends IContent {
  additionalInfo: {
    isTemplate: boolean;
    isAutoPlayStory: boolean;
    linkType: string;
    linkValue: string;
    textButton: string;
    imageMini: string;
    image: string;
    text: string;
    previewTitle: string;
    componentInfo: IComponentInfo[];
  };
}

export interface IComponentInfo {
  text: string;
  title: string;
  imageId: string;
  linkType: string;
  linkValue: string;
  textButton: string;
  position: number;
}

export interface IFiltersStory {
  title: string;
  sorting: string;
  status: string | undefined;
  date: null | [Moment, Moment];
  pagination: number;
}
