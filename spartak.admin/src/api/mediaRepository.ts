import { Media, MediaFilters } from "common/interfaces/media";
import { BaseApiService } from "./BaseApiService";

export class MediaRepository extends BaseApiService {
  constructor() {
    super("media");
  }

  fetchByFilter = async (filter: MediaFilters) => {
    const res = await this.get(`odata/Media?${this.getODataQuery(filter)}`);

    return { media: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: Media["Id"]) => {
    const { value } = await this.get(`odata/Media?$filter=Id eq ${id}`);

    return value[0];
  };

  create = async () => await this.post("Media/CreateEmpty");

  publish = async (id: Media["Id"]) => await this.post(`Media/Publish?mediaId=${id}`);

  draft = async (id: Media["Id"]) => await this.post(`Media/Draft?mediaId=${id}`);

  saveInfo = async (media: Media) => await this.post(`Media/SaveBaseInfo`, JSON.stringify(media));

  saveText = async (media: Media) => await this.post(`Media/SaveText`, JSON.stringify(media));

  savePicture = async (media: Media) => await this.post(`Media/SavePicture`, JSON.stringify(media));

  saveVideo = async (media: Media) => await this.post(`Media/SaveVideo`, JSON.stringify(media));

  deleteById = async (id: Media["Id"]) => await this.delete(`Media/Delete/${id}`);

  uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("formFile", file);

    return await this.post("ImageMedia/Add", formData, {
      headers: {},
    }).catch(() => file.name);
  };
}

export const mediaRepository = new MediaRepository();
