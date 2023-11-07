import styled from "astroturf/react";
import { StarRating } from "./StarRating";
import { NextImage } from "../../../common/components/NextImage";
import { StoryReviewsT } from "../interfaces/reviews";

type Props = {
  review: StoryReviewsT;
};

export const StoryReviewsBigCard = ({ review }: Props) => {
  return (
    <Container>
      <ContainerAuthor>
        <ContainerImage>
          <NextImage src={review.image} alt={"avatar"} />
        </ContainerImage>
        <ContainerName>
          <div>{review.author}</div>
          {review.date ? (
            <div className={"date-review"}>
              {new Date(review.date).toLocaleString("ru", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          ) : null}
        </ContainerName>
      </ContainerAuthor>
      <ReviewContent>
        <h4>{review.title}</h4>
        <StarRating total={5} active={review.star} disable />
        <p>{review.description}</p>
      </ReviewContent>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 240px 1fr;
  grid-column-gap: 24px;
  align-items: start;
  background: $white;
  color: $black;
  padding-bottom: 40px;
  border-bottom: 1px solid $blue-2;

  @include respond-to(small) {
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
  }
`;

const ContainerAuthor = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 48px 1fr;
  grid-column-gap: 16px;
  align-items: center;

  @include respond-to(small) {
    grid-row: 2;
  }
`;

const ContainerName = styled.div`
  @import "variables";

  font-weight: 600;
  font-size: 14px;
  line-height: 137%;
  letter-spacing: 0.02em;

  div[class="date-review"] {
    margin-top: 8px;
    color: rgba($black, 0.4);
    font-weight: 400;
    font-size: 14px;
  }

  @include respond-to(small) {
    font-size: 16px;

    div[class="date-review"] {
      margin-top: 4px;
    }
  }
`;
const ContainerImage = styled.div`
  width: 48px;
  height: 48px;
`;

const ReviewContent = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.02em;

  h4 {
    font-weight: 600;
    font-size: 14px;
    margin: 0;
  }

  p {
    margin: 0;
  }

  span {
    color: rgba($black, 0.4);
  }

  @include respond-to(small) {
    grid-row-gap: 12px;
    font-size: 13px;
    h4 {
      font-size: 14px;
    }
  }
`;
