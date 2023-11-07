import styled from "astroturf/react";
import { StarRating } from "./StarRating";
import { NextImage } from "../../../common/components/NextImage";
import { StoryReviewsT } from "../interfaces/reviews";
import { useContext, useMemo } from "react";
import { AppContext } from "../../../common/components/ContextProvider";
import { ModalNames } from "../../../common/interfaces/modal";
import { useResize } from "../../../common/hooks/useResize";

type Props = {
  review: StoryReviewsT;
  isModal?: boolean;
};

export const StoryReviewsSmallCard = ({ review, isModal }: Props) => {
  const { openModal } = useContext(AppContext);
  const { width } = useResize();
  const lengthFromWidth = useMemo(() => (width > 768 ? 215 : 115), [width]);

  return (
    <Container isModal={isModal}>
      <ContainerFlex>
        <StarRating total={5} active={review.star} disable />
        <ContainerImage>
          <NextImage src={review.image} alt={"avatar"} />
        </ContainerImage>
      </ContainerFlex>
      <ReviewContent>
        <h4>{review.title}</h4>
        <Description isModal={isModal}>
          <p>{review.description}</p>
          {review.description.length > lengthFromWidth && !isModal ? (
            <div
              onClick={() =>
                openModal(ModalNames.POPUP_MODAL, {
                  children: <StoryReviewsSmallCard review={review} isModal={true} />,
                })
              }
              className={"more"}
            >
              Читать полностью
            </div>
          ) : null}
        </Description>
        <span>{review.author}</span>
      </ReviewContent>
    </Container>
  );
};

const Container = styled.div<{ isModal?: boolean }>`
  @import "variables";

  padding: 40px;
  background: $white;
  color: $black;
  border-radius: 40px;

  &.isModal {
    width: 600px;
  }

  @include respond-to(small) {
    padding: 24px;

    &.isModal {
      width: 100%;
    }
  }
`;

const ContainerFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ContainerImage = styled.div`
  @import "variables";

  width: 60px;
  height: 60px;

  @include respond-to(small) {
    width: 40px;
    height: 40px;
  }
`;

const ReviewContent = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.02em;

  h4 {
    font-weight: 600;
    font-size: 18px;
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

const Description = styled.div<{ isModal?: boolean }>`
  @import "variables";

  p {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    margin: 0;
    height: 110px;
    overflow: hidden;
  }

  div[class="more"] {
    cursor: pointer;
    margin-top: 10px;
    font-weight: 500;
    color: $blue1;
  }

  &.isModal {
    p {
      display: block;
      height: fit-content;
      max-height: 400px;
      overflow-y: auto;
    }
  }
`;
