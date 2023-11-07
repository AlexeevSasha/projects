import styled from "astroturf/react";
import { ModalNames } from "common/interfaces/modal";
import Link from "next/link";
import { useContext } from "react";
import { Button } from "../Button";
import { AppContext } from "../ContextProvider";
import { IconBucket } from "../icons/IconBucket";
import { IconBurger } from "../icons/IconBurger";
import { IconHeart } from "../icons/IconHeart";
import { IconLogo } from "../icons/IconLogo";
import { IconOrder } from "../icons/IconOrder";
import { IconPerson } from "../icons/IconPerson";
import { SearchInputInHeader } from "./SearchInputInHeader";

export const HeaderControl = () => {
  const { openModal, allProductInBasket, favourites } = useContext(AppContext);

  return (
    <Container>
      <Link href={"/"} aria-label={"logo"} style={{ display: "flex" }}>
        <IconLogo color={"white"} />
      </Link>
      <CustomButton onClick={() => openModal(ModalNames.CATALOG_MODAL)} typeBtn={"green"}>
        <IconBurger size="sm" />
        <span>Каталог</span>
      </CustomButton>
      <SearchInputInHeader />
      <SectionList>
        <SectionContainer href={"/profile/orders"}>
          <SectionIcon>
            <IconOrder size="lg" />
          </SectionIcon>
          <SectionName>Заказы</SectionName>
        </SectionContainer>
        <SectionContainer href={"/favourites"}>
          <SectionIcon>
            <IconHeart />
          </SectionIcon>
          <SectionName>Избранное</SectionName>
          {favourites.filter((el) => !el.isPharmacy).length ? (
            <Count>{favourites.filter((el) => !el.isPharmacy).length} </Count>
          ) : null}
        </SectionContainer>
        <SectionContainer href={"/basket"}>
          <SectionIcon>
            <IconBucket />
          </SectionIcon>
          <SectionName>Корзина</SectionName>
          {Array.from(allProductInBasket).length ? (
            <Count>{Array.from(allProductInBasket).length}</Count>
          ) : null}
        </SectionContainer>
        <SectionContainer href={"/profile"}>
          <SectionIcon>
            <IconPerson />
          </SectionIcon>
          <SectionName>Кабинет</SectionName>
        </SectionContainer>
      </SectionList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const CustomButton = styled(Button)`
  margin-left: 30px;
  width: fit-content;
  padding: 17px 29px 17px 24px;

  display: grid;
  grid-template-columns: 14px 1fr;
  grid-column-gap: 12px;
  align-items: center;
`;

const SectionList = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 4px;
  margin-left: 8px;
`;

const SectionContainer = styled(Link)`
  @import "variables";
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  color: $white;
  svg {
    path {
      fill: $white;
    }
  }

  &:hover {
    color: $blue-2;
    svg {
      path {
        fill: $blue-2;
      }
    }
  }
`;

const SectionIcon = styled.span`
  display: flex;
  flex-direction: column;
`;

const SectionName = styled.span`
  font-weight: 500;
  font-size: 13px;
`;

const Count = styled.div`
  @import "variables";

  position: absolute;
  top: -6px;
  right: 0;

  background-color: $orange1;
  border-radius: 10px;
  padding: 1px 6px;

  color: $white;
  font-weight: 600;
  font-size: 12px;
`;
