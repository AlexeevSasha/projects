import styled from "astroturf/react";
import { FiltersT, FilterType } from "../../interfaces/filters";
import { useMemo } from "react";
import { PriceProducts } from "../PriceProducts";
import { SwitchFilter } from "../SwitchFilter";
import { FilterDesktop } from "./FilterDesktop";
import { useQueryFilters } from "../../hooks/useQueryFilters";

type Props = {
  filters: FiltersT[];
};

export const FiltersDesktop = ({ filters }: Props) => {
  const { getQueryFilters, router } = useQueryFilters();

  const items = useMemo(
    () =>
      filters?.map((filter) => {
        switch (filter.type) {
          case FilterType.RANGE:
            return (
              <PriceProducts
                getValuesPrice={getQueryFilters}
                title={filter.name}
                key={filter.alias}
                min={filter.values.min}
                max={filter.values.max}
                query={{
                  minPrice: router.query?.minPrice,
                  maxPrice: router.query?.maxPrice,
                }}
              />
            );
          case FilterType.BOOL:
            return (
              <SwitchFilter
                alias={filter.alias}
                getValue={getQueryFilters}
                key={filter.alias}
                title={filter.name}
                id={filter.alias}
                query={router.query[filter.alias]}
              />
            );
          case FilterType.MULTI:
            return (
              <FilterDesktop
                alias={filter.alias}
                key={filter.alias}
                title={filter.name}
                id={filter.alias}
                filters={filter.values}
                query={router.query[filter.alias]}
                getValuesFilter={getQueryFilters}
              />
            );
        }
      }),
    [filters]
  );
  return <ContainerFilters>{items}</ContainerFilters>;
};

const ContainerFilters = styled.aside`
  @import "variables";

  border-radius: 28px;
  background: $white;
  padding: 32px 24px;
  max-width: 400px;
  width: 100%;
  height: fit-content;

  @include respond-to(small) {
    display: none;
  }
`;
