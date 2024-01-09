import { IFilter } from "./IFilter";

export interface IPutOrderCriterionListFilters {
  items: IFilter[];
  searchSql: string;
  searchType: boolean;
}
