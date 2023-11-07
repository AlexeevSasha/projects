import { createContext } from "react";
import { IOrderSearchParams } from "../interfaces/FilterT";

export type FilterOrderT = { page: number } & IOrderSearchParams;

interface IOrderFilterContext {
  filterData: FilterOrderT;
  setFilterData: (
    cb: (value: IOrderFilterContext["filterData"]) => IOrderFilterContext["filterData"]
  ) => void;
}

export const OrderFilterContext = createContext<IOrderFilterContext>({} as IOrderFilterContext);
