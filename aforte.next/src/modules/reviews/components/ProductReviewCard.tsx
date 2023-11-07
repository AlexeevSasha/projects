import styled from "astroturf/react";
import { StarRating } from "./StarRating";
import { ProductReviewsT } from "../interfaces/reviews";

export const ProductReviewCard = (props: ProductReviewsT) => {
  return (
    <Container>
      <Title>
        {props.author}
        <Date>{props.date}</Date>
      </Title>
      <Content>
        <div>
          <StarRating total={5} active={props.star} disable />
        </div>
        {props.advantages ? (
          <Item>
            <span>Достоинства:</span>
            {props.advantages}
          </Item>
        ) : null}

        {props.disadvantages ? (
          <Item>
            <span>Недостатки:</span>
            {props.disadvantages}
          </Item>
        ) : null}

        {props.commentary ? (
          <Item>
            <span>Комментарий:</span>
            {props.commentary}
          </Item>
        ) : null}
      </Content>
      <FooterMobile>
        <StarRating total={5} active={props.star} disable />
        <Date mobile>{props.date}</Date>
      </FooterMobile>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: minmax(100px, 170px) 1fr;
  color: $black;
  padding-bottom: 40px;
  border-bottom: 1px solid $blue-2;

  @include respond-to(small) {
    grid-template-columns: 1fr;
    padding-bottom: 24px;
  }
`;

const Title = styled.div`
  @import "variables";

  font-weight: 600;
  font-size: 14px;
  line-height: 137%;
  letter-spacing: 0.02em;
`;

const Date = styled.span<{ mobile?: boolean }>`
  @import "variables";

  display: block;
  margin-top: 12px;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: rgb($black, 0.4);

  @include respond-to(small) {
    display: none;
  }

  &.mobile {
    display: none;
    margin: 0;

    @include respond-to(small) {
      display: block;
    }
  }
`;

const Content = styled.div`
  @import "variables";
  @include respond-to(small) {
    margin-bottom: 12px;

    & > div:first-child {
      display: none;
    }
  }
`;

const Item = styled.div`
  @import "variables";

  margin-top: 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.02em;

  span {
    font-weight: 600;
    margin-right: 6px;
  }
`;

const FooterMobile = styled.div`
  @import "variables";

  display: none;
  justify-content: space-between;
  align-items: center;

  @include respond-to(small) {
    display: flex;
  }
`;
