import styled from "astroturf/react";
import { StoryReviewsT } from "../interfaces/reviews";
import { StoryReviewsBigCard } from "./StoryReviewsBigCard";
import { useState } from "react";
import { Button } from "../../../common/components/Button";

type Props = {
  reviews: StoryReviewsT[];
};

export const StoryReviewsContainer = ({ reviews }: Props) => {
  const [showMore, setShowMore] = useState(3);
  const handleClick = () => setShowMore((prev) => prev + 3);
  return (
    <Container>
      {reviews?.slice(0, showMore).map((el) => (
        <StoryReviewsBigCard key={el.id} review={el} />
      ))}
      {showMore < reviews.length ? (
        <CustomButton onClick={handleClick} typeBtn={"lightBlue"}>
          Показать еще отзывы
        </CustomButton>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-row-gap: 40px;
  border-radius: 32px;
  background: $white;
  cursor: $black;
  padding: 40px;

  & > div:last-of-type {
    padding: 0;
    border-bottom: none;
  }

  @include respond-to(small) {
    padding: 24px 20px;
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  padding: 20px;
  width: 100%;
`;
