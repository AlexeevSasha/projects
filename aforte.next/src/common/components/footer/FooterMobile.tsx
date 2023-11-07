import styled from "astroturf/react";
import { IconLogo } from "../icons/IconLogo";
import { CustomLink } from "../CustomLink";
import { SocialMediaFooter } from "./SocialMediaFooter";
import { Links } from "./Links";
import { Icon } from "../Icon";
import { ButtonAskQuestion } from "./ButtonAskQuestion";
import { Button } from "../Button";

export const FooterMobile = () => {
  return (
    <Container>
      <IconWrapper>
        <IconLogo color={"blue"} />
        <CustomLink href="tel:88003501096">8 (800) 350-10-96</CustomLink>
        <Paragraph>info@aforte.ru</Paragraph>
      </IconWrapper>
      <Media>
        <SocialMediaFooter />
        <ButtonAskQuestion />
      </Media>
      <Links />

      <MobileApps>
        Еще больше пользы и удобства в мобильном приложении. Плюс 500 баллов после первого заказа
        <MobileWrapper>
          <CustomButton typeBtn={"blue"}>
            <Icon width="16" height="18" viewBox="0 0 16 18" name={"google-pay"} />
            <span>Google Play</span>
          </CustomButton>
          <CustomButton typeBtn={"blue"}>
            <Icon width="16" height="20" viewBox="0 0 16 20" name={"app-store"} />
            <span>App Store</span>
          </CustomButton>
        </MobileWrapper>
      </MobileApps>

      <Paragraph style={{ marginBottom: 12 }}>2022 © ООО «ФК Пульс» Все права защищены</Paragraph>
      <Paragraph>
        На этом сайте используется сервис защиты от спама reCAPTCHA{" "}
        <CustomLink target="_blank" href="https://polza.ru/include/user_agreement.php">
          Конфиденциальность
        </CustomLink>{" "}
        <CustomLink target="_blank" href="https://polza.ru/include/user_agreement.php">
          Публичная оферта
        </CustomLink>
      </Paragraph>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: none;
  overflow: hidden;

  @include respond-to(small) {
    display: block;
    margin-bottom: 90px;
  }
`;

const IconWrapper = styled.div`
  a {
    display: block;
    font-size: 16px;
    margin: 24px 0 12px;
  }
  p {
    font-size: 16px;
    margin: 0 0 12px 0;
    opacity: 0.4;
  }
`;

const Media = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 28px;
  & > button {
    padding: 15px 16px;
    font-size: 14px;
  }
`;

const MobileApps = styled.div`
  @import "variables";

  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: $black;
`;

const MobileWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8px;
  align-items: center;
  margin: 12px 0 24px;
`;

const CustomButton = styled(Button)`
  border-radius: 12px;
  padding: 15px 26px;
  width: 100%;

  display: grid;
  grid-template-columns: 16px 1fr;
  align-items: center;
  grid-column-gap: 10px;
`;

const Paragraph = styled.p`
  @import "variables";

  font-size: 13px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: $black;
  opacity: 0.5;
  margin: 0;

  a {
    font-weight: normal;
    margin-left: 5px;
  }
`;
