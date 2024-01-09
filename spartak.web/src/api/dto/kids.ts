import { BaseFilters } from "../../common/interfaces/common";
import { LocaleType } from "./LocaleType";

export type BidToExitFiltersEntity = BaseFilters & {
  Status?: string;
  [key: string]: any;
};

export interface BidToExitEntity {
  Id: string;
  BidDate: string;
  SpartakKidsCardNumber: number;
  ParentName: string;
  ChildName: string;
  ChildHeight: number;
  Story: string;
  Email: string;
  Phone: string;
  Comment: string;
  PlayerToFieldRequestStatus: string;
}

export type BidToExitResponce = {
  items: BidToExitEntity[];
  count: number;
};

export interface ComicEntity {
  Id: string;
  Name: LocaleType;
  ComicSeasonName: LocaleType;
  ComicSeasonId: string;
  Edition: LocaleType;
  IsSpecialEdition: boolean;
  ComicFileUrl: string;
  ComicPosterUrl: string;
  CreatedUtc: string;
}

export type ComicFilterEntity = BaseFilters & {
  Name?: string;
};

export type ComicResponce = {
  items: ComicEntity[];
  count: number;
};

export interface ComicSessonEntity {
  Id: string;
  ComicSeasonName: LocaleType;
  CreatedUtc: string;
  DeletedUtc: string;
}

export type ComicSeasonFilterEntity = BaseFilters & {
  ComicSeasonName?: string;
};

export type ComicSeasonResponce = {
  items: ComicSessonEntity[];
  count: number;
};
