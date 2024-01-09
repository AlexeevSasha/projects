import { BaseApiService } from "./BaseApiService";
import { Category, CategoryFilters } from "../common/interfaces/mediaCategory";

class MediaCategoriesRepository extends BaseApiService {
  constructor() {
    super("media");
  }

  fetchByFilter = async (filter: CategoryFilters = {}) => {
    const res = await this.get(`odata/MediaCategory?${this.getODataQuery(filter)}`);

    return { categories: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: Category["Id"]) => {
    const { value } = await this.get(`odata/MediaCategory?$filter=Id eq ${id}`);

    return value[0];
  };

  publish = async (category: Category) =>
    await this.post(
      `MediaCategory/SaveMediaCategory${category.Id ? `?id=${category.Id}` : ""}`,
      JSON.stringify(category)
    );

  deleteById = async (id: Category["Id"]) => await this.delete(`MediaCategory/Delete?mediaCategoryId=${id}`);
}

export const mediaCategoriesRepository = new MediaCategoriesRepository();
