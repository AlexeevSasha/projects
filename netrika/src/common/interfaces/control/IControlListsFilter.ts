import { IFilter } from "../IFilter";

export interface IControlListsFilter {
  id: number;
  parentId: number;
  userId: number;
  filters: IFilter[];
}
