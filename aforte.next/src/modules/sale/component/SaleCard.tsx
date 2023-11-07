import styled from "astroturf/react";
import { NextImage } from "../../../common/components/NextImage";
import { SaleT } from "../interfaces/sale";
import Link from "next/link";

export const SaleCard = (props: SaleT) => {
  return (
    <Link href={`/sale/${props.id}`}>
      <Container>
        <ImageContainer>
          <NextImage src={props.image} alt={"promotions"} />
        </ImageContainer>
        <Content>
          <Label>{props.label}</Label>
          <div>
            <Title>{props.title}</Title>
            <Date>{props.date}</Date>
          </div>
        </Content>
      </Container>
    </Link>
  );
};

const Container = styled.div`
  @import "variables";

  display: flex;
  background: $white;
  padding: 16px 24px 16px 16px;
  border-radius: 28px;
  width: 100%;

  &:hover {
    box-shadow: $shadowHoverCard;
  }

  @include respond-to(small) {
    padding: 12px 16px 12px 12px;
    &:hover {
      box-shadow: none;
    }
  }
`;

const ImageContainer = styled.div`
  @import "variables";
  min-width: 130px;
  height: 150px;
  border-radius: 20px;

  @include respond-to(small) {
    min-width: 90px;
    height: 120px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 24px;
`;

const Label = styled.span`
  @import "variables";

  font-weight: 500;
  font-size: 14px;
  line-height: 126%;
  color: $orange1;

  @include respond-to(small) {
    font-size: 12px;
  }
`;
const Title = styled.div`
  @import "variables";

  font-weight: 600;
  font-size: 18px;
  line-height: 126%;
  color: $black;
  letter-spacing: 0.02em;

  @include respond-to(small) {
    font-size: 14px;
  }
`;
const Date = styled.div`
  @import "variables";

  margin-top: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 137%;
  color: rgb($black, 0.4);

  @include respond-to(small) {
    font-size: 13px;
    margin-top: 8px;
  }
`;
