import { IContent } from "../content";

export interface IStoryResponse extends IContent {
  additionalInfo: string;
}

export interface IStory extends IContent {
  additionalInfo: {
    isAutoPlayStory: boolean;
    previewTitle?: string;
    text: string;
    linkType: number;
    textButton: string;
    linkValue: string;
    imageMiniUrl: string;
    imageUrl?: string;
    videoUrl?: string;
    component: IComponentInfo[];
  };
}

export interface IComponentInfo {
  title: string;
  text: string;
  imageUrl?: string;
  videoUrl?: string;
  linkType: number;
  linkValue: string;
  textButton: string;
  position: number;
}

export interface IStorySortUpdate {
  orders: IOrders[];
}

interface IOrders {
  storyId: string;
  sortOrder: number;
}
