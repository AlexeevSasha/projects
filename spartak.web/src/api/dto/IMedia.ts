import { LocaleType } from "./LocaleType";

export interface IMedia {
  Id: string;
  CreatedUtc: string;
  PublishDateTime: string;
  MediaType: "Video" | "News" | "Gallery";
  MediaCategoryId: string;
  MediaCategoryName: string;
  MediaStatus: string;
  IsDraft: boolean;
  TeamId: string;
  PlayerId: string;
  MatchId: string;
  PreviewPhoto: string;
  BigPhoto: string;
  PhotoGallery: string[];
  VideoUrl: string[];
  MediaHeader: LocaleType;
  MediaAnnounce: LocaleType;
  MediaText: LocaleType;
  Section: "None" | "Academy" | "Site";
  PaginationKey?: string[];
  LocalizedMediaCategoryName?: LocaleType;
}

export type IMediaShort = {
  Id: string;
  MediaType: "Video" | "News" | "Gallery";
  PreviewPhoto: string;
  PhotoGallery: string[];
  MediaHeader: LocaleType;
  PublishDateTime: string;
  VideoUrl: string[];
  Section: "None" | "Academy" | "Site";
  MediaCategoryId: string;
  MediaCategoryName: string;
  LocalizedMediaCategoryName?: LocaleType;
  // Поле для специальных предложений(только для конкурсов), чтобы отображать анонс
  Announce?: string;
};

export const listFieldMediaShort = [
  "Id",
  "MediaType",
  "PreviewPhoto",
  "PhotoGallery",
  "MediaHeader",
  "PublishDateTime",
  "VideoUrl",
  "MediaCategoryId",
  "MediaCategoryName",
  "Section",
  "LocalizedMediaCategoryName",
];
