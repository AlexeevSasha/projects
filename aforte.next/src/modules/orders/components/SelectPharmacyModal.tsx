import styled from "astroturf/react";
import { PharmaciesMapObjectManager } from "../../../common/components/pharmacies/PharmaciesMapObjectManager";
import { PharmaciesT } from "../../profile/interfaces/pharmacies";
import { useContext, useEffect, useMemo, useState } from "react";
import { PharmaciesSelect } from "../../../common/components/pharmacies/PharmaciesSelect";
import { UseFormSetValue } from "react-hook-form";
import { OrderFormT } from "../../forms/interfaces/orderForm";
import { AppContext } from "../../../common/components/ContextProvider";
import { ModalNames } from "../../../common/interfaces/modal";
import { Button } from "../../../common/components/Button";

type Props = {
  pharmacies: PharmaciesT[];
  getPharmacy?: (v: PharmaciesT) => void;
  setValue?: UseFormSetValue<OrderFormT>;
  currentPharmacyId?: string;
  pharmaciesOrderHistories: PharmaciesT[];
  pharmaciesFavourites: PharmaciesT[];
};

export const SelectPharmacyModal = ({
  pharmacies,
  setValue,
  currentPharmacyId,
  pharmaciesFavourites,
  pharmaciesOrderHistories,
  getPharmacy,
}: Props) => {
  const { closeModal } = useContext(AppContext);
  const [pharmaciesData, setPharmaciesData] = useState<PharmaciesT[]>(pharmacies);
  const [btn, setBtn] = useState<"favourites" | "order-histories" | null>(null);
  const [search, setSearch] = useState("");
  const [pharmacyId, setPharmacyId] = useState(currentPharmacyId || "");

  const searchPharmacies = useMemo(
    () =>
      search
        ? pharmaciesData.filter((el) => el.title.toLowerCase().includes(search.toLowerCase()))
        : pharmaciesData,
    [search, pharmaciesData]
  );

  useEffect(() => {
    if (btn === "favourites") {
      setPharmaciesData(pharmaciesFavourites);
    } else if (btn === "order-histories") {
      setPharmaciesData(pharmaciesOrderHistories);
    } else {
      setPharmaciesData(pharmacies);
    }
  }, [btn]);

  const setPharmacy = (el: PharmaciesT) => {
    setValue && setValue("pharmacyAddress", el);
    getPharmacy && getPharmacy(el);
    closeModal?.(ModalNames.POPUP_MODAL);
  };

  useEffect(() => {
    const elem = document.querySelector(`.pharmacies-${pharmacyId}`);
    elem && elem.scrollIntoView(true);
  }, [pharmacyId]);

  return (
    <Container>
      <ContainerPharmacies>
        <PharmaciesSelect
          searchText={search}
          setSearch={setSearch}
          pharmacies={searchPharmacies}
          activePharmacy={pharmacyId}
          setPharmacy={setPharmacy}
        />
      </ContainerPharmacies>
      <ContainerMap>
        <PharmaciesMapObjectManager
          setObjectId={setPharmacyId}
          pharmacies={searchPharmacies}
          favourites={pharmaciesFavourites}
        />
        <PharmaciesTopFilters>
          <FilterBtn
            active={btn === "favourites"}
            onClick={() => setBtn((prev) => (prev === "favourites" ? null : "favourites"))}
          >
            Мои аптеки ({pharmaciesFavourites?.length})
          </FilterBtn>
          <FilterBtn
            active={btn === "order-histories"}
            onClick={() =>
              setBtn((prev) => (prev === "order-histories" ? null : "order-histories"))
            }
          >
            Аптеки из истории заказов ({pharmaciesOrderHistories?.length})
          </FilterBtn>
        </PharmaciesTopFilters>
      </ContainerMap>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 960px;
  color: $black;

  @media (max-width: 1100px) {
    width: 650px;
  }

  @include respond-to(small) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const ContainerPharmacies = styled.div`
  @import "variables";

  padding: 32px 32px 0 32px;

  @include respond-to(small) {
    padding: 16px;
  }
`;

const ContainerMap = styled.div`
  @import "variables";

  position: relative;
  border-radius: 0 32px 32px 0;
  overflow: hidden;
  [class*="ymaps-2"][class*="-ground-pane"] {
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\'><filter id=\\'grayscale\\'><feColorMatrix type=\\'matrix\\' values=\\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\\'/></filter></svg>#grayscale");
    /* Firefox 3.5+ */
    -webkit-filter: grayscale(100%);
    /* Chrome 19+ & Safari 6+ */
  }

  @include respond-to(small) {
    border-radius: 0;
    grid-row: 1;
    height: 250px;
  }
`;

const PharmaciesTopFilters = styled.div`
  @import "variables";

  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: end;
  top: 22px;
  right: 30px;

  & > button:last-child {
    margin-left: 8px;
  }

  @include respond-to(small) {
  }
`;

const FilterBtn = styled(Button)<{ active: boolean }>`
  @import "variables";

  margin-top: 8px;
  width: fit-content;
  padding: 12px 20px;
  font-weight: 600;
  font-size: 13px;
  line-height: 137%;
  border-radius: 26px;
  background: $white;
  box-shadow: 4px 4px 12px rgba(69, 98, 138, 0.16);

  &:hover {
    box-shadow: 0px 4px 16px rgba(19, 51, 103, 0.08);
  }

  &.active {
    background: $blue1;
    color: $white;
    &:hover {
      background: $blue2;
    }
  }

  @include respond-to(small) {
    padding: 9px 14px;
    font-weight: 500;
    line-height: 100%;
    &:first-child {
      margin-right: 0px;
    }
  }
`;
