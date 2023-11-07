import { api, setQueryParams } from "./baseApi";
import { FiltersT } from "../modules/filters/interfaces/filters";
import { ProductT } from "../modules/products/interfaces/product";
import { QueryT } from "../common/interfaces/query";

export const getProductsFilter = (query: QueryT) =>
  api.get<FiltersT>(
    `products/filters?regionFias=0c5b2444-70a0-4932-980c-b4dc0d3f02b5&${setQueryParams(query)}`
  );

export const getProducts = (query: QueryT) => {
  return api.get<ProductT>(
    `products?regionFias=0c5b2444-70a0-4932-980c-b4dc0d3f02b5&limit=20&${setQueryParams(query)}`
  );
};

export const getProductsById = (id: string) => {
  return api.get<ProductT>(`products/${id}?regionFias=0c5b2444-70a0-4932-980c-b4dc0d3f02b5&`);
};

export const getAnalogsProductsById = (id: string, query: QueryT) => {
  return api.get<ProductT>(
    `products/${id}/analogs?regionFias=0c5b2444-70a0-4932-980c-b4dc0d3f02b5&${setQueryParams(
      query
    )}`
  );
};
