import styled from "astroturf/react";
import React from "react";
import { NextImage } from "./NextImage";
import { Button } from "./Button";
import Link from "next/link";

export const BonusPoints = () => {
  return (
    <Container>
      <ImageContainer>
        <NextImage src={"/images/savePoints.png"} alt={"review"} />
      </ImageContainer>
      <div>
        <Title>Бонусные баллы</Title>
        <Paragraph>
          Получайте бонусные баллы за заказы на сайте и оплачивайте ими свои следующие покупки.
          Оплатить баллами можно не более 30% от стоимости заказа.
          <br /> 1 бонус = 1 рублю
        </Paragraph>
      </div>
      <Link style={{ marginTop: "auto" }} href={"/profile/settings"}>
        <CustomButton typeBtn={"blue"}>Подробнее</CustomButton>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  max-width: 500px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  align-items: center;
  background: $white;
  color: $black;
  padding: 32px;
  border-radius: 32px;
  text-align: center;

  @include respond-to(small) {
    max-width: 100%;
  }
`;

const ImageContainer = styled.div`
  @import "variables";

  max-width: 100%;
  border-radius: 28px;
  background: $grey;
  padding: 20px 40px;

  div {
    height: 120px;
  }
`;

const Title = styled.h4`
  margin: 0 0 16px;
  font-weight: 600;
  font-size: 20px;
  line-height: 137%;
  letter-spacing: 0.02em;
`;

const Paragraph = styled.p`
  text-align: center;
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
`;

const CustomButton = styled(Button)`
  width: 100%;
  padding: 16px 40px;
`;
