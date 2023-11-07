import styled from "astroturf/react";
import { IconDelivery } from "./icons/IconDelivery";
import { IconShop } from "./icons/IconShop";
import { IconFire } from "./icons/IconFire";

export const BenefitsPharmacies = () => {
  return (
    <Container>
      <ContainerGrid>
        <ContainerImage>
          <IconFire />
        </ContainerImage>
        <ContainerText>
          <div>Следим за качеством</div>
          <p>продаем только сертифицированные товары</p>
        </ContainerText>
      </ContainerGrid>
      <ContainerGrid>
        <ContainerImage>
          <IconDelivery />
        </ContainerImage>
        <ContainerText>
          <div>Доставим курьером</div>
          <p>или в удобную аптеку в течение 1-2 дней</p>
        </ContainerText>
      </ContainerGrid>
      <ContainerGrid>
        <ContainerImage>
          <IconShop />
        </ContainerImage>
        <ContainerText>
          <div>Много аптек рядом</div>
          <p>или в удобную аптеку в течение 1-2 дней</p>
        </ContainerText>
      </ContainerGrid>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 48px;
  background: $white;
  color: $black;
  border-radius: 40px;
  padding: 24px 28px;

  @include respond-to(large) {
    grid-column-gap: 8px;
  }
  @include respond-to(small) {
    grid-template-columns: 1fr;
    grid-row-gap: 24px;
  }
`;

const ContainerGrid = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 100px 1fr;
  grid-column-gap: 24px;
  align-items: center;

  @include respond-to(large) {
    align-items: start;
    grid-template-columns: 48px 1fr;
    grid-column-gap: 12px;
  }
`;

const ContainerImage = styled.div`
  @import "variables";

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba($greenMain, 0.1);

  svg {
    width: 40px;
    height: 40px;
    g,
    path {
      opacity: 1;
      fill: $greenMain;
    }
  }

  @include respond-to(large) {
    width: 48px;
    height: 48px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const ContainerText = styled.div`
  @import "variables";

  font-weight: 600;
  font-size: 18px;
  line-height: 137%;

  p {
    margin: 6px 0 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 160%;
    letter-spacing: 0.02em;
    color: rgba($black, 0.5);
  }

  @include respond-to(large) {
    font-size: 15px;

    p {
      font-size: 14px;
    }
  }
`;
