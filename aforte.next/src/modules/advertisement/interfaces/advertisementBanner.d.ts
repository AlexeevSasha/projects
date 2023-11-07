import { ProductT } from "../../products/interfaces/product";

export type AdvertisementBannerT = {
  id: string;
  desktopImage: string;
  mobileImage: string;
};

export type HorizontAdvertisementT = AdvertisementBannerT & {
  isSmall?: boolean;
};

export type VerticalBannerT = AdvertisementBannerT & {
  products: ProductT[];
};

type AdvertisementAllBannersT = {
  bigBanner: HorizontAdvertisementT[];
  verticalBanner: VerticalBannerT[];
};
