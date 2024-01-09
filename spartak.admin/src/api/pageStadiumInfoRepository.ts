import { BaseApiService } from "./BaseApiService";

class PageStadiumInfoRepository extends BaseApiService {
  constructor() {
    super("admin");
  }

  fetchByFilter = async (type: string) => {
    const res = await this.get(`odata/Cms?$filter=Type eq '${type}'`);

    return res.value[0];
  };

  uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("formFile", file);

    return await this.post("ImageCms/Add", formData, {
      headers: {},
    }).catch(() => file.name);
  };

  publish = async (partner: { type: string; jsonData: string }) => await this.post("Cms/Save", JSON.stringify(partner));
}

export const pageStadiumInfoRepository = new PageStadiumInfoRepository();
