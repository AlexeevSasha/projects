import { IFilter } from "./IFilter";

export interface IGetOrderCriterionListFiltersResponse {
  items: IFilter[];
  total: number;
  searchSql: string;
  searchType: boolean;
}
