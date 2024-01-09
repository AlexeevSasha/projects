import { ODateResponce } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { ComicSeasonFilterEntity, ComicSessonEntity } from "./dto/kids";

class ComicSeasonRepository extends BaseApiService {
  constructor() {
    super("media/");
  }

  fetchByFilter = async (filter: ComicSeasonFilterEntity) => {
    const res = await this.get<ODateResponce<ComicSessonEntity>>(`odata/ComicSeason?${this.getODataQuery(filter)}`);

    return { items: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: ComicSessonEntity["Id"]) => {
    const { value } = await this.get<ODateResponce<ComicSessonEntity>>(`odata/ComicSeason?$filter=Id eq ${id}`);

    return value[0];
  };

  fetchAll = async () =>
    (await this.get<ODateResponce<ComicSessonEntity>>("odata/ComicSeason?$filter=DeletedUtc eq null")).value;
}

export const comicSeasonRepository = new ComicSeasonRepository();
