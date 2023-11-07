import styled from "astroturf/react";
import { Button, ButtonType } from "common/components/Button";
import { NextImage } from "common/components/NextImage";
import { useState } from "react";
import { ProductButtonCard } from "./ProductButtonCard";
import { ProductPrice } from "./ProductPrice";
import { IconPlus } from "../../../common/components/icons/IconPlus";

//todo добавить api и айди прокинуть ProductButtonCard

export const ProductListItem = () => {
  const [btnType, setBtnType] = useState<ButtonType>("lightBlue");

  return (
    <Container onMouseOver={() => setBtnType("blue")} onMouseLeave={() => setBtnType("lightBlue")}>
      <BackgroundImage>
        <ContainerImage>
          <NextImage src={"/mockImages/product.png"} alt={"asd"} />
        </ContainerImage>
      </BackgroundImage>
      <ContentContainer>
        <Name>Тантум верде, таблетки для рассасывания 3 мг, 40 шт </Name>
        <ProductPrice regularPrice={500} salePrice={600} size="sm" />
      </ContentContainer>
      <ButtonContainer>
        <ProductButtonCard idProduct={"12"} size="sm" type={btnType} />
      </ButtonContainer>
      <MobileButton typeBtn={"lightBlue"}>
        <IconPlus />
      </MobileButton>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";
  cursor: pointer;

  display: grid;
  grid-template-columns: 64px calc(100% - 64px - 100px) 100px;
  padding: 8px;
  border-radius: 16px;

  &:hover {
    background: $gray;
  }

  @include respond-to(small) {
    grid-template-columns: 60px 1fr 40px;
    border-radius: 0;
    padding: 20px;
    border-bottom: 1px solid $BG;
  }
`;

const BackgroundImage = styled.div`
  @import "variables";

  background: $gray;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;

  margin-right: 16px;

  @include respond-to(small) {
    margin-right: 12px;
  }
`;

const ContainerImage = styled.div`
  width: 36px;
  height: 24px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
`;

const Name = styled.h6`
  @import "variables";

  font-weight: 500;
  font-size: 14px;
  margin: 0 0 6px 0;

  @include respond-to(small) {
    font-size: 13px;
  }
`;

const ButtonContainer = styled.div`
  @import "variables";

  width: 100px;
  height: fit-content;

  @include respond-to(small) {
    display: none;
  }
`;

const MobileButton = styled(Button)`
  @import "variables";

  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 16px;

  @include respond-to(small) {
    display: flex;
  }
`;
