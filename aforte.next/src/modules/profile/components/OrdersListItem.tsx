import styled from "astroturf/react";
import { Button } from "common/components/Button";
import { NextImage } from "common/components/NextImage";
import { OrdersItemsT } from "../interfaces/userOrders";

type Props = {
  oredrItem: OrdersItemsT;
};

export const OrdersListItem = ({ oredrItem }: Props) => {
  return (
    <Wrapper>
      <Container>
        <CustomBlock>
          <BackgroundImage>
            <ContainerImage>
              <NextImage src={oredrItem.image} alt={"asd"} />
            </ContainerImage>
          </BackgroundImage>
          <ContentContainer>
            <Name>{oredrItem.name}</Name>
            <MobileBlock>
              <CurrentPriceMobile>{oredrItem.subtotal} руб</CurrentPriceMobile>
              <Count>{oredrItem.quantity} шт.</Count>
            </MobileBlock>
          </ContentContainer>
        </CustomBlock>
        <ButtonContainer>
          <Price>
            <CurrentPrice>{oredrItem.subtotal} руб</CurrentPrice>
            <Discount>–{oredrItem.discount}%</Discount>
          </Price>
          <CustomButton>Купить</CustomButton>
        </ButtonContainer>
      </Container>
      <CustomLine />
    </Wrapper>
  );
};

const Container = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BackgroundImage = styled.div`
  @import "variables";
  background: rgba($blue-2, 0.3);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  height: 80px;
  margin-right: 28px;
  @include respond-to(small) {
    margin-right: 20px;
  }
`;

const ContainerImage = styled.div`
  width: 68px;
  height: 44px;
`;

const ContentContainer = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  @include respond-to(medium) {
    margin-right: 0px;
    width: 100%;
  }
`;

const Name = styled.h6`
  @import "variables";
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  margin: 0 0 4px 0;
  @include respond-to(medium) {
    font-size: 14px;
    margin: 0 0 12px 0;
  }
`;
const Count = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 16px;
  opacity: 0.4;
  @include respond-to(medium) {
    font-weight: 500;
    font-size: 15px;
    opacity: 0.3;
  }
`;
const ButtonContainer = styled.div`
  @import "variables";
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @include respond-to(medium) {
    display: none;
  }
`;
const Price = styled.div`
  @import "variables";
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const CurrentPrice = styled.span`
  @import "variables";
  white-space: nowrap;
  font-weight: 600;
  line-height: 137%;
  color: $black;
  margin-right: 8px;
  font-size: 16px;
  @include respond-to(medium) {
    font-size: 15px;
  }
`;
const Discount = styled.span`
  @import "variables";

  white-space: nowrap;
  background: $orange1;
  color: $white;
  border-radius: 10px;
  padding: 2px 6px;
  font-weight: 600;
  font-size: 14px;
  line-height: 126%;
  text-align: center;
  letter-spacing: 0.02em;
  width: fit-content;
  @include respond-to(small) {
    display: none;
  }
`;
const CustomBlock = styled.div`
  @import "variables";
  display: flex;
  @include respond-to(small) {
    width: 100%;
  }
`;
const CustomButton = styled(Button)`
  @import "variables";
  border-radius: 16px;
  padding: 8.5px 49.5px;
  background: $blue-3;
  font-weight: 600;
  font-size: 16px;
  color: $blue1;
  &:hover {
    background: $blue-2;
  }
`;
const Wrapper = styled.div`
  &:last-child hr {
    display: none;
  }
`;
const CustomLine = styled.hr`
  @import "variables";
  width: 100%;
  margin: 25px 0px;
  border-color: #7aa0db;
  opacity: 0.1;
  @include respond-to(small) {
    margin: 20px 0px;
  }
`;
const MobileBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CurrentPriceMobile = styled(CurrentPrice)`
  @import "variables";
  display: none;
  @include respond-to(medium) {
    display: block;
  }
`;
