import styled from "astroturf/react";
import { AttributeProduct } from "../interfaces/product";

const isBlue = ["Производитель", "Действующее вещество"];

type Props = {
  isMobile?: boolean;
  isDesktop?: boolean;
  attributes: AttributeProduct[];
};

export const ProductAttributes = ({ isMobile, isDesktop, attributes }: Props) => {
  return (
    <Container isMobile={isMobile} isDesktop={isDesktop}>
      {attributes?.map((el, i) => (
        <Attribute key={i}>
          <Title>{el.name}</Title>
          <Text isBlue={isBlue.includes(el.name)}>{el.value}</Text>
        </Attribute>
      ))}
    </Container>
  );
};

const Container = styled.div<{ isMobile?: boolean; isDesktop?: boolean }>`
  @import "variables";

  margin-top: 24px;
  color: $black;
  margin-right: 10px;

  @include respond-to(small) {
    background: $white;
    margin: 0;
    padding: 20px;
    border-radius: 28px;

    & > div:last-child {
      border: none;
    }
  }

  &.isMobile {
    display: none;
    @include respond-to(small) {
      display: block;
    }
  }

  &.isDesktop {
    display: block;
    @include respond-to(small) {
      display: none;
    }
  }
`;

const Attribute = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: minmax(100px, 1fr) minmax(150px, 1fr);
  grid-column-gap: 40px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.02em;
  width: 100%;
  padding: 4px 0;

  @include respond-to(small) {
    border-bottom: 1px solid $blue-2;
    justify-content: space-between;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px;
    padding: 12px 4px;
  }
`;

const Title = styled.span`
  @import "variables";

  font-weight: 400;
  color: rgb($black, 0.4);
`;

const Text = styled.span<{ isBlue?: boolean }>`
  @import "variables";

  &.isBlue {
    cursor: pointer;
    color: $blue1;
  }

  @include respond-to(small) {
    text-align: right;
  }
`;
