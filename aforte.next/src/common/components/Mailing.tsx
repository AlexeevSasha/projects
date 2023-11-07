import styled from "astroturf/react";
import { NextImage } from "./NextImage";
import { Input } from "./inputs/Input";
import { Button } from "./Button";
import { useContext } from "react";
import { AppContext } from "./ContextProvider";
import { ModalNames } from "../interfaces/modal";
import { IconCross } from "./icons/IconCross";
import { useForm } from "react-hook-form";

export const Mailing = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const { openModal, closeModal } = useContext(AppContext);

  const onSubmit = ({ email }: { email: string }) => {
    openModal(ModalNames.ALERT_MODAL, {
      children: (
        <AlertContainer>
          <div>Подписка оформлена</div>
          <p>Осталось перейти по ссылке в письме, чтобы подтвердить электронный адрес</p>
          <Close onClick={() => closeModal(ModalNames.ALERT_MODAL)}>
            <IconCross />
          </Close>
        </AlertContainer>
      ),
    });
  };

  return (
    <Container>
      <ImageContainer>
        <NextImage src={"/images/mailing.png"} alt={"mailing"} />
      </ImageContainer>
      <div>
        <Title>Польза в вашей почте</Title>
        <Paragraph>
          Раз в неделю собираем письмо с новыми статьями и самыми интересными акциями и скидками.
          Подпишитесь на нашу рассылку и получите 300 баллов на следующий заказ
        </Paragraph>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            error={!!errors.email}
            placeholder={"Электронная почта"}
          />
          <CustomButton typeBtn={"blue"}>Подписаться на рассылку</CustomButton>
        </Form>
        <FooterMailing>
          Нажимая кнопку «Подписаться» вы соглашаетесь с правилами работы и обработки персональных
          данных
        </FooterMailing>
      </div>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: minmax(200px, 400px) minmax(500px, 1fr);
  grid-column-gap: 20px;
  align-items: center;
  padding: 32px;
  background: $white;
  color: $black;
  border-radius: 40px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 20px;
  }
`;

const ImageContainer = styled.div`
  @import "variables";

  background: $grey;
  max-width: 400px;
  width: 100%;
  padding: 24px 80px;
  border-radius: 28px;

  div {
    height: 200px;
  }
  @media (max-width: 1000px) {
    max-width: 1000px;
    margin-bottom: 16px;
    padding: 20px 40px;
  }
`;

const Title = styled.h3`
  margin: 0 0 12px;
  font-weight: 600;
  font-size: 22px;
  line-height: 137%;
`;

const Paragraph = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
`;

const Form = styled.form`
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
  height: fit-content;
  padding: 18px 28px;
`;

const FooterMailing = styled.p`
  @import "variables";

  color: rgb($black, 0.4);
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.02em;
  margin: 0;
`;

const AlertContainer = styled.div`
  @import "variables";

  width: 100%;
  padding: 20px 70px 20px 40px;
  backdrop-filter: blur(8px);
  background: $greenMain;
  color: $white;
  font-weight: 600;
  font-size: 18px;
  line-height: 137%;
  border-radius: 62px;

  p {
    margin: 4px 0 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 137%;
    letter-spacing: 0.02em;
  }

  @include respond-to(small) {
    padding: 16px 50px 16px 20px;
    border-radius: 28px 28px 0 0;
  }
`;

const Close = styled.div`
  @import "variables";

  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 40px;
  padding: 12px;
  background: $white;
  transition: all 0.3s ease-in-out;
  svg {
    path {
      stroke: $greenMain;
    }
  }
  &:hover {
    transform: rotate(90deg);
  }
  @include respond-to(small) {
    border-radius: 32px;
    padding: 4px;
    top: 16px;
  }
`;
