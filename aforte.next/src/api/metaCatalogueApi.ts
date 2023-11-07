import {
  metaCatalogueMock,
  categoryMetaCatalogue,
  mediaCatalogueProductMock,
} from "./mockData/metaCatalogueMock";
import {
  AlphabetSearchResultT,
  MetaCatalogueT,
} from "../modules/metacatalogue/interfaces/metaCatalogue";
import { CategoryButtonT } from "../common/interfaces/categoryButton";
import { api } from "./baseApi";
import { FiltersT } from "../modules/filters/interfaces/filters";

export const getAlphabetSearchResult = async (): Promise<AlphabetSearchResultT[]> =>
  metaCatalogueMock;

export const getCategoryMetaCatalogue = async (): Promise<CategoryButtonT[]> =>
  categoryMetaCatalogue;

export const getMetaCatalogue = async (
  type: "medicinal-product" | "active-ingredient" | "manufacturer" | "disease" | "analogs"
): Promise<MetaCatalogueT> => {
  switch (type) {
    case "medicinal-product":
      return mediaCatalogueProductMock.medicinalProduct;
    case "active-ingredient":
      return mediaCatalogueProductMock.activeIngredient;
    case "manufacturer":
      return mediaCatalogueProductMock.manufacturer;
    case "disease":
      return mediaCatalogueProductMock.disease;
    case "analogs":
      return mediaCatalogueProductMock.analogs;
  }
};

export const gerMetaCatalogueFilter = async () =>
  api.get<FiltersT>("products/filters?regionFias=0c5b2444-70a0-4932-980c-b4dc0d3f02b5");
