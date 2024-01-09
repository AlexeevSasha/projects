import { BaseFilters } from "./common";

export type BannersFiltersType = BaseFilters & {
  Status?: string;
};

export enum BannerSizeToSort {
  Default = 1,
  Tablet = 2,
  MobileSite = 3,
}

enum BannerSize {
  Default = "Default",
  Tablet = "Tablet",
  MobileSite = "MobileSite",
}

export type BannerEntity = {
  Id: string;
  StartPublish: string;
  EndPublish: string;
  Name: string;
  LocationKey: string;
  LocationName: string;
  LocationId: string;
  ImageUri: string;
  IsHidden: boolean;
  TransitionUri: string;
  Status: string;
  Author: string;
  BannerImages: {
    Size: BannerSize;
    ImageUri: string;
  }[];
};

export type BannersResponce = {
  banners: BannerEntity[];
  count: number;
};

export type BannerLocation = {
  Id: string;
  Name: string;
  Width: number;
  Height: number;
  LocationKey: string;
  AccessToLocation: string;
  MaxCountImage: number;
  CurrentCountImage: number;
  DeviceImageSlots: {
    BannerLocationDbId: string;
    Height: number;
    Id: string;
    Size: BannerSize;
    Width: number;
  }[];
};
