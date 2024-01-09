import { BaseFilters, LocaleType } from "./common";

export enum MediaStatus {
  none = "None",
  planned = "Planned",
  published = "Published",
}

export enum MediaType {
  news = "News",
  gallery = "Gallery",
  video = "Video",
}

export type MediaFilters = BaseFilters & {
  MediaType?: MediaType;
  CategoryName?: string;
  MediaStatus?: MediaStatus;
  MediaHeader?: string;
  PublishDateTime?: string;
  Section?: string;
};

export type Media = {
  Id: string;
  mediaId: string;
  PublishDateTime: string;
  MediaType: MediaType;
  CategoryId: string;
  MediaCategoryName: string;
  MediaStatus: MediaStatus;
  IsDraft: boolean;
  TeamsIds: string[];
  PlayersIds: string[];
  MatchId: string;
  MediaHeader: LocaleType;
  MediaAnnounce: LocaleType;
  MediaText: LocaleType;
  PreviewPhoto: string;
  BigPhoto: string;
  PhotoGallery: string[];
  VideoUrl: string[];
  CreatedUtc: string;
  Section: "None" | "Academy" | "Site";
};

export type MediaResponce = {
  media: Media[];
  count: number;
};
