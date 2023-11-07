import { AdvertisementAllBannersT } from "modules/advertisement/interfaces/advertisementBanner";
import { advertisementMock } from "./mockData/advertisementMock";

export const getAdvertisement = async (): Promise<AdvertisementAllBannersT> => {
  return advertisementMock;
};
