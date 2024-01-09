import { BaseApiService } from "./BaseApiService";
import { BannerEntity, BannerEntityRequest, BannerSize, BannersResponse } from "./dto/Banner";

class AdvRepository extends BaseApiService {
  constructor() {
    super("advertisement/");
  }

  fetchAllBanners = async (): Promise<BannersResponse<BannerEntity>> => {
    const request = await this.get<BannersResponse<BannerEntityRequest>>("Banners?accommodationFacility=Web", {});
    const result: BannersResponse<BannerEntity> = {};

    // Выравнивание массива с баннерами в объект
    Object.keys(request).forEach((key) => {
      result[key as keyof BannersResponse<BannerEntityRequest>] = request[
        key as keyof BannersResponse<BannerEntityRequest>
      ]?.map((banner) => ({
        ...banner,
        BannerImages: {
          Default: banner.BannerImages.find((elem) => elem.Size === BannerSize.Default)?.ImageUri ?? "",
          MobileSite: banner.BannerImages.find((elem) => elem.Size === BannerSize.MobileSite)?.ImageUri,
          Tablet: banner.BannerImages.find((elem) => elem.Size === BannerSize.Tablet)?.ImageUri,
        },
      }));
    });

    return Promise.resolve(result);
  };
}

export const advRepository = new AdvRepository();
