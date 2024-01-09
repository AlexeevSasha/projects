import { LocaleType } from "./LocaleType";

export enum BannerSize {
  Default = "Default",
  Tablet = "Tablet",
  MobileSite = "MobileSite",
}

export interface BannerEntityRequest {
  Id: string;
  ImageUrl: string;
  Url: string;
  BannerImages: {
    Size: BannerSize;
    ImageUri: string;
  }[];
}

export interface BannerEntity {
  Id: string;
  // ImageUrl: string;
  Url: string;
  BannerImages: {
    Default: string;
    Tablet?: string;
    MobileSite?: string;
  };
}

export type BannersResponse<T> = Partial<{
  "Web.Main.Calendar": T[];
  "Web.Main.News": T[];
  "Web.Main.Video": T[];
  "Web.Main.Standings": T[];

  "Web.Media.VideoCategory": T[];
  "Web.Media.Video": T[];
  "Web.Media.Gallery": T[];
  "Web.Media.News": T[];

  "Web.Account2": T[];
  "Web.Tickets": T[];
  "Web.Main.In1Day.DownFuture": T[];
  "Web.Main.In5Days.DownFuture": T[];
}>;

export interface IBanner {
  link: LocaleType;
  photo: LocaleType;
  title: LocaleType;
  mobile: LocaleType;
  tablet: LocaleType;
  desktop: LocaleType;
  buttonTitle: LocaleType;
  description: LocaleType;
}
