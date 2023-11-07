import styled from "astroturf/react";
import { Button } from "../../../common/components/Button";
import { StarRating } from "../../reviews/components/StarRating";
import { Filters } from "../../filters/components/Filters";
import { Reviews } from "../../reviews/components/Reviews";
import { ProductReviewsT } from "../../reviews/interfaces/reviews";
import { useContext, useState } from "react";
import { AppContext } from "../../../common/components/ContextProvider";
import { ModalNames } from "../../../common/interfaces/modal";
import { Forms } from "../../forms/components";

type Props = {
  reviews: ProductReviewsT[];
  totalReview: number | null;
};

export const ReviewsProduct = ({ reviews, totalReview }: Props) => {
  const { openModal } = useContext(AppContext);
  const [showMore, setShowMore] = useState(3);
  const handleClick = () => setShowMore((prev) => prev + 3);
  return (
    <Container>
      <Head>
        <Title>
          <div>
            Отзывы <span>{totalReview}</span>
          </div>
          <StarRating total={5} active={3.5} disable />
        </Title>
        <div>
          <CustomButton
            onClick={() => openModal(ModalNames.POPUP_MODAL, { children: <Forms.AddReview /> })}
            typeBtn={"blue"}
          >
            Оставить отзыв
          </CustomButton>
        </div>
        <Filters.Sorting />
      </Head>
      <Content>{reviews?.slice(0, showMore).map(Reviews.ProductReviewCard)}</Content>
      {showMore < reviews.length ? (
        <CustomButton onClick={handleClick} typeBtn={"lightBlue"}>
          Показать больше отзывов
        </CustomButton>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  background: $white;
  color: $black;
  padding: 40px;
  border-radius: 32px;

  @include respond-to(small) {
    padding: 20px;
  }
`;

const Head = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr fit-content(250px);

  & > div:nth-child(2) {
    grid-row-start: 2;
    grid-column-start: 1;
    grid-column-end: 3;
    padding-top: 24px;
    margin-top: 24px;
    border-top: 1px solid rgba(22, 30, 37, 0.1);
    width: 100%;
  }

  @include respond-to(small) {
    grid-template-columns: 1fr;
    & > div:nth-child(2) {
      grid-row-start: 2;
      grid-column-start: 1;
      grid-column-end: 1;
      padding-top: 0;
      margin: 16px 0 24px;
      border-top: none;
      width: 100%;
    }
    margin-bottom: 16px;
  }
`;

const Title = styled.div`
  @import "variables";

  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 18px;
  line-height: 137%;
  letter-spacing: 0.02em;

  span {
    color: rgb($black, 0.5);
  }

  & > div:last-child {
    display: none;
  }

  @include respond-to(small) {
    & > div:last-child {
      display: block;
    }
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  padding: 20px 0;
  width: 100%;
`;

const Content = styled.div`
  @import "variables";

  display: grid;
  grid-gap: 40px;
  margin: 40px 0;

  & > div:last-child {
    border: none;
    padding: 0;
  }

  @include respond-to(small) {
    margin: 24px 0;
    grid-gap: 24px;
  }
`;
