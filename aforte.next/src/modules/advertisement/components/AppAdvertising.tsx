import styled from "astroturf/react";
import Link from "next/link";
import { Icon } from "../../../common/components/Icon";
import { NextImage } from "../../../common/components/NextImage";

export const AppAdvertising = () => {
  return (
    <Container>
      <Title>Больше пользы и&nbsp;удобства в&nbsp;приложении Polza</Title>
      <Text>Плюс 500 баллов после первого заказа</Text>
      <LinkStyle
        aria-label={"google-pay"}
        target={"_blank"}
        href={"https://play.google.com/store/apps/details?id=ru.aforte.android&pli=1"}
      >
        <Icon width="16" height="18" viewBox="0 0 16 18" name={"google-pay"} />
      </LinkStyle>
      <LinkStyle aria-label={"app-store"} target={"_blank"} href={"#"}>
        <Icon width="16" height="20" viewBox="0 0 16 20" name={"app-store"} />
      </LinkStyle>
      <ImageContainer>
        <NextImage src={"/images/advPhone.png"} alt={"phoneImage"} />
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  position: relative;
  width: 100%;
  background: $white;
  color: $black;
  border-radius: 40px;
  padding: 60px 48px;
  overflow: hidden;

  @include respond-to(small) {
    text-align: center;
    padding: 36px 24px 250px;
  }
`;

const LinkStyle = styled(Link)`
  @import "variables";

  @include transition();

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 44px;
  background: $blue1;
  margin-right: 12px;
  z-index: 2;

  &:hover {
    background: $blue2;
  }
`;

const Title = styled.h3`
  @import "variables";

  max-width: 500px;
  width: 100%;
  margin: 0;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  position: relative;
  z-index: 2;

  @include respond-to(small) {
    max-width: 100%;
  }
`;

const Text = styled.p`
  @import "variables";

  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.02em;
  margin: 16px 0 24px;
  position: relative;
  z-index: 2;
`;

const ImageContainer = styled.div`
  @import "variables";

  width: 400px;
  height: 400px;
  position: absolute;
  top: 48px;
  right: 60px;

  @include respond-to(small) {
    width: 350px;
    height: 350px;
    left: 50%;
    top: 50%;
    transform: translate(-50%);
  }
`;
