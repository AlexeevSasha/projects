import styled from "astroturf/react";
import { IconShop } from "../../../common/components/icons/IconShop";
import { IconDelivery } from "../../../common/components/icons/IconDelivery";
import { IconWarning } from "../../../common/components/icons/IconWarning";

type Props = {
  isCourier?: boolean;
  handlerClick: () => void;
  active: boolean;
};

export const OrderDelivery = ({ isCourier, handlerClick, active }: Props) => {
  return (
    <Container active={active} onClick={handlerClick}>
      <IconContainer active={active}>{isCourier ? <IconDelivery /> : <IconShop />}</IconContainer>
      <Content>
        <Wrapper isTitle>
          <Title>{isCourier ? "Доставить курьером сегодня" : "Забрать из  аптеки завтра"}</Title>
          <Price isCourier={isCourier}>{isCourier ? "250 руб" : "Бесплатно"}</Price>
        </Wrapper>
        <Wrapper style={{ alignItems: "center" }}>
          <Tag isCourier={isCourier}>{isCourier ? "Удобно" : "Выгодно"}</Tag>
          {isCourier && (
            <Warning>
              <IconWarning />
            </Warning>
          )}
        </Wrapper>
      </Content>
    </Container>
  );
};

const Container = styled.div<{ active: boolean }>`
  @import "variables";

  cursor: pointer;
  display: grid;
  grid-template-columns: 24px 1fr;
  grid-column-gap: 20px;
  align-items: start;
  color: $black;
  background: $white;
  border-radius: 24px;
  padding: 20px;
  border: 2px solid $blue-2;

  @include respond-to(small) {
    grid-template-columns: 1fr;
    padding: 12px;
  }

  &.active {
    pointer-events: none;
    background: rgba(109, 196, 123, 0.08);
    border: 2px solid $greenMain;
  }
`;

const IconContainer = styled.div<{ active: boolean }>`
  @import "variables";

  display: flex;
  align-items: center;
  justify-content: center;

  @include respond-to(small) {
    display: none;
  }

  &.active {
    g {
      opacity: 1;
    }
    svg path {
      fill: $greenMain;
    }
  }
`;

const Content = styled.div`
  @import "variables";

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  @include respond-to(small) {
    flex-direction: column-reverse;
  }
`;

const Wrapper = styled.div<{ isTitle?: boolean }>`
  @import "variables";

  display: flex;
  justify-content: space-between;

  &.isTitle {
    @include respond-to(small) {
      flex-direction: column;
      height: 100%;
    }
  }
`;

const Title = styled.span`
  @import "variables";

  font-weight: 600;
  line-height: 137%;
  max-width: 180px;
  width: 100%;
  margin: 0 12px 12px 0;

  @include respond-to(small) {
    margin: 0;
  }
`;

const Price = styled.div<{ isCourier?: boolean }>`
  @import "variables";

  white-space: nowrap;
  text-align: right;
  font-weight: 500;
  line-height: 137%;
  color: $green1;

  &.isCourier {
    color: rgb($black, 0.4);
  }

  @include respond-to(small) {
    text-align: left;
    margin-top: 6px;
  }
`;

const Tag = styled.span<{ isCourier?: boolean }>`
  @import "variables";

  padding: 3px 10px;
  color: $white;
  background: $greenMain;
  border-radius: 10px;
  font-weight: 500;
  font-size: 13px;
  line-height: 137%;

  &.isCourier {
    background: $orange1;
  }

  @include respond-to(small) {
    margin-bottom: 6px;
  }
`;

const Warning = styled.div`
  @import "variables";

  svg {
    path {
      fill: $white;
    }
    rect {
      fill: $orange3;
      fill-opacity: 1;
    }
  }
`;
