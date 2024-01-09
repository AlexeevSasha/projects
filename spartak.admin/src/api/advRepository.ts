import { BannerEntity, BannerSizeToSort, BannersFiltersType } from "common/interfaces/banners";
import { BaseResponce } from "common/interfaces/common";
import { BaseApiService } from "./BaseApiService";

class AdvRepository extends BaseApiService {
  constructor() {
    super("advertisement");
  }

  fetchByFilter = async (filter: BannersFiltersType) => {
    const { value: banners, ["@odata.count"]: count } = await this.get<BaseResponce<BannerEntity[]>>(
      `odata/Banner?${this.getODataQuery({ ...filter, withOutDeletedUtc: true })}`
    );

    return { banners, count };
  };

  fetchById = async (id: BannerEntity["Id"]) => {
    const { value } = await this.get<BaseResponce<BannerEntity[]>>(`odata/Banner?$filter=Id eq ${id}`);

    value[0]?.BannerImages.sort((a, b) => BannerSizeToSort[a.Size] - BannerSizeToSort[b.Size]);

    return value[0];
  };

  add = (partner: BannerEntity) => this.post("Banner/AddBanner", JSON.stringify(partner));

  update = (partner: BannerEntity) => this.put("Banner/UpdateBanner", JSON.stringify(partner));

  remove = (Id: BannerEntity["Id"]) => this.delete(`Banner/DeleteBanner?Id=${Id}`);

  hide = (Id: BannerEntity["Id"], IsHidden: BannerEntity["IsHidden"]) =>
    this.post("Banner/SetIsHiddenBanner?api-version=advertisement", JSON.stringify({ Id, IsHidden }));

  fetchLocations = async () => (await this.get(`odata/BannerLocation?$expand=DeviceImageSlots`)).value;

  uploadImage = async (locationId: string, Size: string, file: File) => {
    const formData = new FormData();
    formData.append("formFile", file);

    return await this.post(`Banner/AddImage?locationId=${locationId}&size=${Size}`, formData, { headers: {} }).catch(
      () => file.name
    );
  };
}

export const advRepository = new AdvRepository();
