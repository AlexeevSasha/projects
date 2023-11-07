import { MarketingBigSlide } from "modules/marketing/interfaces/marketingBigSlide";
import { marketingMock } from "./mockData/marketingMock";

export const getMarketingBigBanners = async (): Promise<MarketingBigSlide[]> =>
  marketingMock.bigBanner;

export const getMarketingSmallBanners = async (): Promise<MarketingBigSlide[]> =>
  marketingMock.smallBanner;
