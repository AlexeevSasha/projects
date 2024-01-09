import { BaseResponce } from "common/interfaces/common";
import { ComicEntity, ComicFilterEntity } from "common/interfaces/kids";
import { BaseApiService } from "./BaseApiService";

class ComicRepository extends BaseApiService {
  constructor() {
    super("media");
  }

  fetchByFilter = async (filter: ComicFilterEntity) => {
    const res = await this.get(`odata/Comic?${this.getODataQuery(filter)}`);

    return { items: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: ComicEntity["Id"]) => {
    const { value } = await this.get<BaseResponce<ComicEntity[]>>(`odata/Comic?$filter=Id eq ${id}`);

    return value[0];
  };

  save = async (body: ComicEntity) => await this.post("Comic/Save", JSON.stringify(body));

  uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("formFile", file);

    return await this.post("ImageComic/Add", formData, {
      headers: {},
    }).catch(() => file.name);
  };

  deleteById = async (id: ComicEntity["Id"]) => await this.delete(`Comic/Delete/${id}`);
}

export const comicRepository = new ComicRepository();
