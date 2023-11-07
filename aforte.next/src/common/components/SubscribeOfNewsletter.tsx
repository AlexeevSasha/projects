import { Input } from "./inputs/Input";
import styled from "astroturf/react";
import { Button } from "./Button";

type Props = {
  title: string;
};

export const SubscribeOfNewsletter = ({ title }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <InputWrapper>
        <Input placeholder={"Введите e-mail"} />
        <CustomButton typeBtn={"blue"}>Подписаться</CustomButton>
      </InputWrapper>
      <FooterSubscribe>
        Нажимая кнопку «Подписаться» вы соглашаетесь с правилами работы и обработки персональных
        данных
      </FooterSubscribe>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  align-items: center;
  padding: 32px;
  background: $white;
  color: $black;
  border-radius: 40px;

  @include respond-to(small) {
    text-align: center;
  }
`;

const Title = styled.h3`
  @import "variables";

  margin: 0;
  font-weight: 600;
  font-size: 22px;
  line-height: 137%;

  @include respond-to(small) {
    font-size: 18px;
  }
`;

const InputWrapper = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr fit-content(300px);
  grid-gap: 20px;
  margin: 20px 0;

  @include respond-to(small) {
    grid-template-columns: 1fr;
    grid-gap: 12px;
  }
`;

const CustomButton = styled(Button)`
  font-size: 15px;
  padding: 18px 28px;
`;

const FooterSubscribe = styled.p`
  @import "variables";

  color: rgb($black, 0.4);
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.02em;
  margin: 0;
`;
