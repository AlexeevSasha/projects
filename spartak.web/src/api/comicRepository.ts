import { ODateResponce } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { ComicEntity, ComicFilterEntity } from "./dto/kids";

class ComicRepository extends BaseApiService {
  constructor() {
    super("media/");
  }

  fetchByFilter = async (filter: ComicFilterEntity) => {
    const res = await this.get<ODateResponce<ComicEntity>>(`odata/ClientComic${this.getODataQuery(filter)}`);

    return { items: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: ComicEntity["Id"]) => {
    const { value } = await this.get<ODateResponce<ComicEntity>>(`odata/ClientComic?$filter=Id eq ${id}`);

    return value[0];
  };

  fetchAll = async () =>
    (await this.get<ODateResponce<ComicEntity>>("odata/ClientComic?$orderby=SortOrder DESC")).value;
}

export const comicRepository = new ComicRepository();
