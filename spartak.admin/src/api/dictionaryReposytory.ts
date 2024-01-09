import { AmpluaFilters, CitiesFilters, CountriesFilters } from "common/interfaces/dictionary";
import { BaseApiService } from "./BaseApiService";

class DictionaryRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchCountries = async (filter?: CountriesFilters) => {
    const { value } = await this.get("odata/Country");

    return value;
  };

  fetchCities = async (filter?: CitiesFilters) => {
    const { value } = await this.get("odata/City?$orderby=Name/Ru asc");

    return value;
  };

  fetchAmplua = async (filter?: AmpluaFilters) => {
    const { value } = await this.get("odata/Amplua");

    return value;
  };
  fetchAllAmplua = async (filter?: AmpluaFilters) => {
    const { value } = await this.get("odata/BaseAmplua");

    return value;
  };
}

export const dictionaryRepository = new DictionaryRepository();
