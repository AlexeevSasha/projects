import { CategoryButtonT } from "../common/interfaces/categoryButton";
import { FiltersT } from "../modules/filters/interfaces/filters";
import { SaleDetailsT, SaleT } from "../modules/sale/interfaces/sale";
import { SaleRequest } from "../modules/sale/interfaces/SaleRequest";
import { api } from "./baseApi";
import { saleMock } from "./mockData/saleMock";

export const getSaleListFilter = () =>
  api.get<FiltersT>("products/filters?regionFias=0c5b2444-70a0-4932-980c-b4dc0d3f02b5");

export const getCategoryListSale = async (): Promise<CategoryButtonT[]> => {
  return saleMock.categorySale;
};

export const getSalesList = async (props: SaleRequest): Promise<SaleT[]> => {
  if (props.saleId) {
    return saleMock.sales;
  }
  return saleMock.sales;
};

export const getSaleById = async (id: string): Promise<SaleDetailsT> => {
  return saleMock.saleDetails;
};

export const getSalePromoCodeById = async (id: string): Promise<SaleDetailsT> => {
  return saleMock.salePromoCodeDetails;
};
