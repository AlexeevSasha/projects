import styled from "astroturf/react";
import React from "react";
import { NextImage } from "./NextImage";
import { Button } from "./Button";
import Link from "next/link";

export const SavePoints = () => {
  return (
    <Container>
      <ImageContainer>
        <NextImage src={"/images/savePoints.png"} alt={"review"} />
      </ImageContainer>
      <div>
        <Title>Копите и раплачивайтесь баллами</Title>
        <Paragraph>
          Присоединяйтесь к программе лояльности Polza, чтобы получать баллы за покупки и
          расплачиваться ими
        </Paragraph>
      </div>
      <Link style={{ marginTop: "auto" }} href={"/profile/settings"}>
        <CustomButton typeBtn={"blue"}>Присоединиться</CustomButton>
      </Link>
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
`;
