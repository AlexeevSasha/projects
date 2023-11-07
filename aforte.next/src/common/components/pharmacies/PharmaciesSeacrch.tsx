import styled from "astroturf/react";
import { FilterTag } from "modules/filters/components/FilterTag";
import { Favorites } from "modules/products/components/Favorites";
import { PharmaciesT } from "modules/profile/interfaces/pharmacies";
import Link from "next/link";
import { useState } from "react";
import { IconMetro } from "../icons/IconMetro";
import { Input } from "../inputs/Input";

type Props = {
  pharmacies: PharmaciesT[];
  setSearchFilters: (cb: (value: string[]) => string[]) => void;
  filters: string[];
  btnValue: "favourites" | "story" | null;
  setBtn: (cb: (value: "favourites" | "story" | null) => "favourites" | "story" | null) => void;
};

export const PharmaciesSeacrch = ({
  pharmacies,
  setSearchFilters,
  filters,
  btnValue,
  setBtn,
}: Props) => {
  const [inputValue, setInputValue] = useState("");

  const saveFilter = (event: any) => {
    if (event.key == "Enter") {
      setSearchFilters((prev) => [...prev, inputValue.trim()]);
      setInputValue("");
    }
  };
  const deleteFilter = (e: string) => {
    setSearchFilters((prev) => prev.filter((item) => item !== e));
  };

  return (
    <Conteiner>
      <TitleBlock>
        <Title>
          {btnValue === "favourites"
            ? "Избранные аптеки"
            : btnValue === "story"
            ? "Аптеки из истории заказов"
            : "Аптеки для самовывоза"}
        </Title>
        <PharmasiesCount>{pharmacies.length}</PharmasiesCount>
      </TitleBlock>
      <ScrollConteiner>
        <InputBlock>
          <CustomInput
            placeholder="Введите улицу или метро"
            onKeyPress={(e) => saveFilter(e)}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <MetroModalButton>
            <IconMetro />
          </MetroModalButton>
        </InputBlock>
        {filters.length ? (
          <ActivFiltersBlock>
            {filters.map((elem, index) => (
              <ActiveFilterItem key={index}>
                <FilterTag title={elem} handlerClick={() => deleteFilter(elem)} pharmacies />
              </ActiveFilterItem>
            ))}
          </ActivFiltersBlock>
        ) : null}
        {btnValue === "favourites" && !pharmacies.length ? (
          <FavoritesNull>
            Вы еще не добавили аптеки в избранное, перейдите в{" "}
            <span onClick={() => setBtn((prev) => (prev === "favourites" ? null : "favourites"))}>
              полный список аптек
            </span>
            , чтобы найти подходящую
          </FavoritesNull>
        ) : (
          <PharmaciesList>
            {pharmacies.map((pharmacie) => (
              <Link href={`pharmacies/${pharmacie.id}`} key={pharmacie.id}>
                <PharmacieItem>
                  <PharmacieItemHeader>
                    <PharmacieName>{pharmacie.title}</PharmacieName>
                    <Favorites id={pharmacie.id} isPharmacy />
                  </PharmacieItemHeader>
                  <PharmacieDescription>
                    {pharmacie.address} <br />
                    {pharmacie.subway ? pharmacie.subway : " "}
                    {pharmacie.workingHours.map((item: any) => (
                      <>
                        {" "}
                        {item} <br />{" "}
                      </>
                    ))}
                  </PharmacieDescription>
                </PharmacieItem>
              </Link>
            ))}
          </PharmaciesList>
        )}
      </ScrollConteiner>
    </Conteiner>
  );
};
const Conteiner = styled.div`
  @import "variables";

  display: flex;
  flex-direction: column;
  border-radius: 40px;
  width: 470px;
  background: $white;
  box-shadow: $shadowHoverCard;
  padding: 32px 18px 35px 32px;

  @include respond-to(small) {
    padding: 24px 20px 24px 20px;
    width: 100%;
    &:hover {
      box-shadow: none;
    }
  }
`;
const TitleBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;
const Title = styled.span`
  font-weight: 600;
  font-size: 20px;
  line-height: 137%;
`;
const ScrollConteiner = styled.div`
  @import "variables";

  height: 536px;
  overflow-y: auto;
  padding-right: 25px;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(83, 131, 199, 0.1);
    border-radius: 4px;
  }
  overflow-y: scroll;
  scrollbar-color: rgba(83, 131, 199, 0.1) transparent;
  scrollbar-width: thin;
`;
const PharmasiesCount = styled.span`
  @import "variables";

  font-weight: 500;
  font-size: 16px;
  line-height: 137%;
  opacity: 0.4;
  margin-left: 12px;

  @include respond-to(small) {
    font-size: 14px;
  }
`;
const InputBlock = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  align-items: center;
`;
const MetroModalButton = styled.div`
  @import "variables";

  padding: 15px;
  border: 2px solid $border;
  border-radius: 12px;
  width: 52px;
  height: 52px;
  margin-left: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    border-color: $blue1;
  }

  @include respond-to(small) {
    width: 48px;
    height: 48px;
    margin-left: 4px;
    padding: 13px;
  }
`;
const CustomInput = styled(Input)`
  @import "variables";

  width: 328px;

  @include respond-to(small) {
    min-width: 279px;
    width: 100%;
  }
`;
const ActivFiltersBlock = styled.div`
  @import "variables";

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 12px;
`;
const ActiveFilterItem = styled.div`
  margin-right: 12px;
  margin-bottom: 8px;
`;
const PharmaciesList = styled.div`
  @import "variables";

  display: flex;
  flex-direction: column;
  margin-top: 12px;
  div:last-child {
    margin-bottom: 0;
  }

  @include respond-to(small) {
    margin-top: 24px;
  }
`;
const FavoritesNull = styled.p`
  @import "variables";

  margin: 32px 0 0 0;
  padding: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.02em;
  span {
    color: $blue1;
    text-decoration: underline;
    cursor: pointer;
  }
`;
const PharmacieItem = styled.div`
  @import "variables";

  display: flex;
  flex-direction: column;
  padding: 22px 16px 22px 24px;
  cursor: pointer;
  &:hover {
    background: $grey;
    border-radius: 28px;
  }

  @include respond-to(small) {
    padding: 12px 0px;
    &:hover {
      background: transparent;
    }
  }
`;
const PharmacieItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PharmacieName = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
`;
const PharmacieDescription = styled.span`
  @import "variables";

  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  margin-top: 16px;
  width: 78%;

  @include respond-to(small) {
    font-size: 13px;
  }
`;
