import styled from "astroturf/react";
import { NextImage } from "../../../common/components/NextImage";
import { Button } from "../../../common/components/Button";

export const NoReview = () => {
  return (
    <Container>
      <ImageContainer>
        <NextImage src={"/images/review.png"} alt={"review"} />
      </ImageContainer>
      <div>
        <Title>Отзывов пока нет</Title>
        <Paragraph>
          Будет здорово, если вы напишете свои впечатления о товаре. Это поможет другим покупателям
        </Paragraph>
      </div>
      <CustomButton typeBtn={"blue"}>Оставить отзыв</CustomButton>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 120px 1fr 200px;
  grid-column-gap: 24px;
  align-items: center;
  background: $white;
  color: $black;
  padding: 24px 40px;
  border-radius: 32px;

  @include respond-to(small) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
    text-align: center;
    padding: 20px;
  }
`;

const ImageContainer = styled.div`
  @import "variables";

  max-width: 120px;
  width: 100%;

  div {
    height: 120px;
  }

  @include respond-to(small) {
    max-width: 100%;
    border-radius: 28px;
    background: $grey;
    padding: 20px 40px;
  }
`;

const Title = styled.h4`
  margin: 0 0 16px;
  font-weight: 600;
  font-size: 20px;
  line-height: 137%;
  letter-spacing: 0.02em;
`;

const Paragraph = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
`;

const CustomButton = styled(Button)`
  width: 100%;
  padding: 16px 40px;
  margin-top: auto;
`;
