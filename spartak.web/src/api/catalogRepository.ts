import { BaseApiService } from "./BaseApiService";

export interface CatalogDto {
  ItemId: string;
  ItemName: string;
  ItemDescription: string;
}

class CatalogRepository extends BaseApiService {
  constructor() {
    super("profile/Catalog/");
  }

  fetchCitizenship = (locale: string) =>
    this.get<CatalogDto[]>("GetAllCitizenshipCountries", [], {
      "content-type": "application/json",
      "Accept-Language": locale,
    });

  fetchCities = (locale: string) =>
    this.get<CatalogDto[]>("GetCities", [], {
      "content-type": "application/json",
      "Accept-Language": locale,
    });

  fetchRegions = (locale: string) =>
    this.get<CatalogDto[]>("GetRegions", [], {
      "content-type": "application/json",
      "Accept-Language": locale,
    });
}

export const catalogRepository = new CatalogRepository();
