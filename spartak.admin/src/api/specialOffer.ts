import { BaseApiService } from "./BaseApiService";
import { SpecialOffer, SpecialOfferFilter } from "../common/interfaces/specialOffer";

class SpecialOfferRepository extends BaseApiService {
  constructor() {
    super("advertisement");
  }

  fetchByFilter = async (filter: SpecialOfferFilter) => {
    const { value: specialOffers, ["@odata.count"]: count } = await this.get(
      `odata/SpecialOffer?${this.getODataQuery(filter)}`
    );

    return { specialOffers, count };
  };

  fetchById = async (id: SpecialOffer["Id"]) => {
    const { value } = await this.get(`odata/SpecialOffer?$filter=Id eq ${id}`);

    return value[0];
  };

  publish = async (specialOffer: SpecialOffer) => await this.post("SpecialOffer/Publish", JSON.stringify(specialOffer));

  draft = async (specialOffer: SpecialOffer) => await this.post("SpecialOffer/Draft", JSON.stringify(specialOffer));

  remove = async (id: SpecialOffer["Id"]) => await this.delete(`SpecialOffer/Delete?specialOfferId=${id}`);

  uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("formFile", file);

    return await this.post("SpecialOffer/AddImage", formData, {
      headers: {},
    }).catch(() => file.name);
  };

  removeImage = async (fileName: string[]) => {
    const path = fileName.filter((p) => !!p);

    path.length && (await this.delete(`SpecialOffer/DeleteImage?fullPath=${fileName}`, JSON.stringify(path)));

    return true;
  };
}

export const specialOfferRepository = new SpecialOfferRepository();
