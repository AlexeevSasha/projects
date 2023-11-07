import { createContext } from "react";
import { IPrimaryOrderSearchParams } from "../interfaces/PrimaryOrderSearchParams";

export type FilterPrimaryOrderT = { page: number } & IPrimaryOrderSearchParams;

interface IPrimaryOrderFilterContext {
  filterData: FilterPrimaryOrderT;
  setFilterData: (
    cb: (
      value: IPrimaryOrderFilterContext["filterData"]
    ) => IPrimaryOrderFilterContext["filterData"]
  ) => void;
}

export const PrimaryOrderFilterContext = createContext<IPrimaryOrderFilterContext>(
  {} as IPrimaryOrderFilterContext
);
