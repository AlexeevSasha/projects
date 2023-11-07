import styled from "astroturf/react";
import { useRouter } from "next/router";
import { Button } from "../../../common/components/Button";
import { NextImage } from "../../../common/components/NextImage";

export const CartEmpty = () => {
  const router = useRouter();
  return (
    <Container>
      <ImageContainer>
        <NextImage src={"/images/empty.png"} alt={"empty"} />
      </ImageContainer>
      <Title>Корзина пока пустая</Title>
      <Paragraph>
        Войдите в аккаунт. Если вы уже добавляли товары в корзину — они появятся здесь, а новые не
        потеряются
      </Paragraph>
      <CustomButton onClick={() => router.push("/auth")} typeBtn={"blue"}>
        Войти
      </CustomButton>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  color: $black;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  align-items: center;
  justify-items: center;
  margin: 68px 0;

  @include respond-to(small) {
    margin: 48px 0;
  }
`;

const ImageContainer = styled.div`
  @import "variables";

  width: 220px;
  height: 220px;

  @include respond-to(small) {
    width: 180px;
    height: 180px;
  }
`;

const Title = styled.h3`
  @import "variables";

  margin: 0;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  text-align: center;

  @include respond-to(small) {
    font-size: 20px;
    line-height: 137%;
  }
`;

const Paragraph = styled.p`
  max-width: 400px;
  width: 100%;
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
  text-align: center;
`;

const CustomButton = styled(Button)`
  @import "variables";

  padding: 16px 40px;

  @include respond-to(small) {
    width: 100%;
  }
`;
