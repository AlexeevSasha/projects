import styled from "astroturf/react";
import { SwitchFilter } from "../SwitchFilter";
import { useContext, useMemo } from "react";
import { PriceProducts } from "../PriceProducts";
import { FiltersT, FilterType } from "../../interfaces/filters";
import { IconFilter } from "../../../../common/components/icons/IconFilter";
import { AppContext } from "../../../../common/components/ContextProvider";
import { ModalNames } from "../../../../common/interfaces/modal";
import { FilterMobile } from "./FilterMobile";
import { useQueryFilters } from "../../hooks/useQueryFilters";

type Props = {
  filters: FiltersT[];
};

export const FiltersMobile = ({ filters }: Props) => {
  const { openModal } = useContext(AppContext);
  const { getQueryFilters, router } = useQueryFilters();

  const items = useMemo(
    () =>
      filters.map((filter) => {
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
              <FilterMobile
                alias={filter.alias}
                key={filter.alias}
                title={filter.name}
                id={filter.alias}
                filters={filter.values}
              />
            );
        }
      }),
    [filters, router.query]
  );

  return (
    <Container>
      <ContainerIcon
        onClick={() =>
          openModal(ModalNames.POPUP_MODAL_MOBILE, {
            title: "Фильтры",
            children: <ContainerFilter>{items}</ContainerFilter>,
          })
        }
      >
        <span>Фильтры</span>
        <IconFilter />
      </ContainerIcon>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: none;
  position: relative;

  @include respond-to(small) {
    display: block;
  }
`;

const ContainerIcon = styled.div`
  @import "variables";

  cursor: pointer;
  display: flex;
  justify-content: right;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 137%;
  letter-spacing: 0.02em;
  color: $blue1;

  span {
    margin-right: 8px;
  }
`;

const ContainerFilter = styled.div`
  @import "variables";

  max-height: 540px;
  overflow-y: auto;
  overflow-x: hidden;

  & > div:not(:last-child, :first-child) {
    border-bottom: 1px solid $blue-2;
  }
`;
