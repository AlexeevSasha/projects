import styled from "astroturf/react";
import { StarRating } from "./StarRating";
import { wordDeclension } from "../../../common/utils/wordDeclension";
import { StoryAllReviewsT } from "../interfaces/reviews";

type Props = Pick<StoryAllReviewsT, "ratings">;

export const RatingList = ({ ratings }: Props) => {
  return (
    <Container>
      {ratings?.map((el) => (
        <ContainerStar key={el.star}>
          <StarRating total={5} disable active={el.star} />
          <div>
            {el.total} {wordDeclension(el.total, ["отзыв", "отзыва", "отзывов"])}
          </div>
        </ContainerStar>
      ))}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-row-gap: 15px;
  background: $white;
  color: $black;
  padding: 24px 28px 28px;
  border-radius: 32px;
`;

const ContainerStar = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: right;
  font-weight: 400;
  font-size: 16px;
  line-height: 137%;
`;
