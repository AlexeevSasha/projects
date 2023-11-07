import { PharmaciesT } from "../../../modules/profile/interfaces/pharmacies";
import { Input } from "../inputs/Input";
import styled from "astroturf/react";
import { Favorites } from "../../../modules/products/components/Favorites";
import { Button } from "../Button";
import { useEffect, useState } from "react";

type Props = {
  pharmacies: PharmaciesT[];
  activePharmacy: string;
  setPharmacy: (el: PharmaciesT) => void;
  setSearch: (v: string) => void;
  searchText: string;
};

export const PharmaciesSelect = ({
  pharmacies,
  activePharmacy,
  setPharmacy,
  setSearch,
  searchText,
}: Props) => {
  const [active, setActive] = useState(pharmacies[0]?.id || "");

  useEffect(() => {
    activePharmacy && setActive(activePharmacy);
  }, [activePharmacy]);

  return (
    <div>
      <Title>
        Выберите аптеку <span>{pharmacies.length}</span>
      </Title>
      <Input
        value={searchText}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={"Введите название улицы или метро"}
      />
      <ContainerPharmacies className={"container-pharmacies"}>
        {pharmacies.map((el) => (
          <ContainerCard
            className={`pharmacies-${el.id}`}
            onClick={() => setActive(el.id)}
            isActive={active === el.id}
            key={el.id}
          >
            <ContainerName>
              <div>{el.title}</div>
              <Favorites id={el.id} isPharmacy />
            </ContainerName>
            <Content>
              <div>
                {el.address} {el.subway ? ", " + el.subway : " "}
              </div>
              <div>Время работы — {el.workingHours.join(", ")}</div>
              <div>Оплата — карта, наличные</div>
            </Content>
            <CustomButton onClick={() => setPharmacy(el)} typeBtn={"blue"}>
              Забрать отсюда
            </CustomButton>
          </ContainerCard>
        ))}
      </ContainerPharmacies>
    </div>
  );
};

const Title = styled.h3`
  @import "variables";

  margin: 0 0 12px;
  font-weight: 600;
  font-size: 22px;
  line-height: 137%;
  color: $black;

  span {
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.02em;
    color: rgba($black, 0.4);
    margin-left: 12px;
  }
`;

const ContainerPharmacies = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 8px;
  margin-top: 12px;

  height: 450px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(83, 131, 199, 0.1);
    border-radius: 4px;
  }
  scrollbar-color: rgba(83, 131, 199, 0.1) transparent;
  scrollbar-width: thin;

  @include respond-to(small) {
    height: 250px;
  }
`;

const CustomButton = styled(Button)`
  display: none;
  padding: 10px;
`;

const ContainerCard = styled.div<{ isActive: boolean }>`
  @import "variables";

  cursor: pointer;
  display: grid;
  height: fit-content;
  grid-row-gap: 16px;
  padding: 20px 24px;
  border-radius: 28px;
  color: $black;
  max-height: 250px;

  &:hover {
    background: $grey;
  }

  &.isActive {
    background: $grey;
    ${CustomButton} {
      display: block;
    }
  }
`;

const ContainerName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
`;

const Content = styled.div`
  @import "variables";

  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.02em;

  @include respond-to(small) {
    font-weight: 400;
    font-size: 13px;
    margin-top: 12px;
    padding-left: 40px;
  }
`;
