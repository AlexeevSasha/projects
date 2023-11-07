import { AdvertisementAllBannersT } from "modules/advertisement/interfaces/advertisementBanner";

export const advertisementMock: AdvertisementAllBannersT = {
  bigBanner: [
    {
      id: Math.floor(Math.random() * 5400).toString(32),
      desktopImage: "/mockImages/horizontalBanner.png",
      mobileImage: "/mockImages/horizontalBannerMobile.png",
    },
    {
      id: Math.floor(Math.random() * 5400).toString(32),
      desktopImage: "/mockImages/horizontalBannerSmall.png",
      mobileImage: "/mockImages/horizontalBannerMobile.png",
      isSmall: true,
    },
  ],
  verticalBanner: [
    {
      id: Math.floor(Math.random() * 5400).toString(32),
      desktopImage: "/mockImages/verticalBannerDesktop.png",
      mobileImage: "/mockImages/verticalBannerMobile.png",
      products: [],
    },
    {
      id: Math.floor(Math.random() * 5400).toString(32),
      desktopImage: "/mockImages/verticalBannerDesktop.png",
      mobileImage: "/mockImages/verticalBannerMobile.png",
      products: [],
    },
  ],
};
