import styled from "astroturf/react";
import { IconCash } from "../../../common/components/icons/IconCash";
import { IconDebitCard } from "../../../common/components/icons/IconDebitCard";

type Props = {
  isSelfPayment?: boolean;
  active: boolean;
  handleClick: () => void;
};

export const OrderPayment = ({ active, isSelfPayment, handleClick }: Props) => {
  return (
    <Container onClick={handleClick} active={active}>
      <Circle active={active} />
      <TitleContainer>
        <div>{isSelfPayment ? "При получени в аптеке" : "Банковской картой онлайн"}</div>
        <IconContainer active={active}>
          {isSelfPayment ? <IconCash /> : <IconDebitCard />}
        </IconContainer>
      </TitleContainer>
      <Text>{isSelfPayment ? "Карта или наличные" : "Visa, MasterCard, МИР"}</Text>
    </Container>
  );
};

const Circle = styled.div<{ active: boolean }>`
  @import "variables";
  @include transition();

  position: relative;
  width: 24px;
  height: 24px;
  border: 2px solid #e0e2e8;
  border-radius: 50%;

  &.active {
    border: 2px solid $blue1;
    background: $blue1;

    &:after {
      position: absolute;
      content: "";
      width: 6px;
      height: 6px;
      background: $white;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const Container = styled.div<{ active: boolean }>`
  @import "variables";
  @include transition();

  cursor: pointer;
  display: grid;
  grid-template-columns: 24px 1fr;
  grid-column-gap: 20px;
  padding: 20px 28px 20px 20px;
  border: 2px solid $blue-2;
  color: $black;
  border-radius: 24px;

  &:hover {
    border: 2px solid $blue1;

    ${Circle} {
      border: 2px solid $blue1;
    }
  }

  &.active {
    border: 2px solid $blue1;
    pointer-events: none;
  }

  @include respond-to(small) {
    grid-column-gap: 16px;
    border: none !important;
    padding: 0 0 20px;
    border-radius: 0;
    border-bottom: 1px solid $blue-2 !important;
  }
`;

const TitleContainer = styled.div`
  @import "variables";

  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
  letter-spacing: 0.02em;

  div:first-child {
    max-width: 200px;
    width: 100%;
  }

  @include respond-to(small) {
    div:first-child {
      max-width: 100%;
    }
  }
`;

const IconContainer = styled.div<{ active: boolean }>`
  @import "variables";

  &.active {
    svg g {
      opacity: 1;
    }
  }

  @include respond-to(small) {
    display: none;
  }
`;

const Text = styled.div`
  @import "variables";

  grid-column: 2;
  font-weight: 500;
  font-size: 16px;
  line-height: 137%;
  margin-top: 12px;
  opacity: 0.4;

  @include respond-to(small) {
    margin-top: 6px;
    font-size: 14px;
  }
`;
