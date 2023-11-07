import styled from "astroturf/react";
import { IconLogo } from "../icons/IconLogo";
import { CustomLink } from "../CustomLink";
import { SocialMediaFooter } from "./SocialMediaFooter";
import { Links } from "./Links";
import { ButtonAskQuestion } from "./ButtonAskQuestion";

export const FooterDesktop = () => {
  return (
    <Container>
      <LeftSide>
        <IconLogo color={"blue"} />
        <Paragraph>
          2022 © ООО «ФК Пульс»
          <br />
          Все права защищены
        </Paragraph>
        <ButtonAskQuestion />
      </LeftSide>
      <Links />
      <RightSide>
        <CustomLink href="tel:88003501096">8 (800) 350-10-96</CustomLink>
        <Paragraph isMargin={"mail"}>info@aforte.ru</Paragraph>
        <SocialMediaFooter />
        <Paragraph isMargin={"info"}>
          На этом сайте используется сервис защиты от спама reCAPTCHA
          <CustomLink target="_blank" href="/include/user_agreement.php">
            Конфиденциальность
          </CustomLink>
          <CustomLink target="_blank" href="/include/user_agreement.php">
            Публичная оферта
          </CustomLink>
        </Paragraph>
      </RightSide>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: flex;
  justify-content: space-between;

  @include respond-to(small) {
    display: none;
  }
`;

const LeftSide = styled.div`
  display: grid;
  grid-row-gap: 24px;
  height: fit-content;
`;

const RightSide = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;

  @media (max-width: 950px) {
    width: 250px;
  }
`;

const Paragraph = styled.p<{ isMargin?: "mail" | "info" }>`
  @import "variables";

  font-size: 13px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: $black;
  opacity: 0.5;
  margin: 0;

  a {
    font-weight: 400;
    margin-left: 10px;
  }

  &.isMargin-mail {
    margin: 8px 0 24px;
  }

  &.isMargin-info {
    margin: 24px 0 0;
  }

  @media (max-width: 950px) {
    a {
      display: block;
      margin: 4px 0 0;
    }
  }
`;
