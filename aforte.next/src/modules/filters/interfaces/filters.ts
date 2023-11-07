export enum FilterType {
  RANGE = "range",
  MULTI = "multi",
  BOOL = "bool",
}

export type MultiFilterT = {
  count: number;
  id: string;
  name: string;
};

type RangeFilterT = {
  max: number;
  min: number;
};

export type FiltersT = {
  name: string;
  alias: string;
  type: FilterType;
  values: MultiFilterT[] & RangeFilterT;
};
