import { BaseResponce } from "common/interfaces/common";
import { ComicSessonEntity, ComicSeasonFilterEntity } from "common/interfaces/kids";
import { BaseApiService } from "./BaseApiService";

class ComicSeasonRepository extends BaseApiService {
  constructor() {
    super("media");
  }

  fetchByFilter = async (filter: ComicSeasonFilterEntity) => {
    const res = await this.get(`odata/ComicSeason?${this.getODataQuery(filter)}`);

    return { items: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: ComicSessonEntity["Id"]) => {
    const { value } = await this.get<BaseResponce<ComicSessonEntity[]>>(`odata/ComicSeason?$filter=Id eq ${id}`);

    return value[0];
  };

  save = async (body: ComicSessonEntity) => await this.post("ComicSeason/Save", JSON.stringify(body));

  deleteById = async (id: ComicSessonEntity["Id"]) => await this.delete(`ComicSeason/Delete/${id}`);

  fetchAll = async () => (await this.get(`odata/ComicSeason?$filter=DeletedUtc eq null`)).value;
}

export const comicSeasonRepository = new ComicSeasonRepository();
