import { useForm } from "react-hook-form";
import { Input } from "../../../common/components/inputs/Input";
import { TextArea } from "../../../common/components/inputs/TextArea";
import styled from "astroturf/react";
import { Button } from "../../../common/components/Button";

export interface IAskQuestionForm {
  topic: string;
  username: string;
  phone: any;
  question: string;
}

export const AskQuestion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAskQuestionForm>();

  const onSubmit = async (data: unknown) => {
    console.log(data);
  };

  return (
    <Container>
      <Title>Задать вопрос</Title>
      <TextMobile>Тема обращения</TextMobile>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex>
          <Text>Тема обращения</Text>
          <Input
            {...register("topic", {
              required: true,
            })}
            error={!!errors.topic}
            placeholder={"Как сделать возврат"}
          />
        </Flex>
        <Flex>
          <Text>Как к вам обращаться</Text>
          <Input
            {...register("username", {
              required: true,
            })}
            error={!!errors.username}
            placeholder={"Имя и фамилия"}
          />
        </Flex>
        <Flex>
          <Text>Как с вами связаться</Text>
          <Input
            {...register("phone", {
              required: true,
              pattern: /^\d+$/gi,
            })}
            error={!!errors.phone}
            type={"tel"}
            placeholder={"Телефон"}
          />
        </Flex>
        <FlexArea>
          <Text>Ваш вопрос</Text>
          <div style={{ width: "100%" }}>
            <TextArea
              {...register("question", {
                required: true,
              })}
              error={!!errors.question}
              placeholder={"Телефон"}
            />
            <CustomButton typeBtn={"blue"}>Отправить вопрос</CustomButton>
            <Agreement>
              Нажимая на кнопку, вы соглашаетесь с <span>условиями использования сервиса</span>
            </Agreement>
          </div>
        </FlexArea>
      </form>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  padding: 40px;
  width: 900px;

  @media (max-width: 1000px) {
    width: 650px;
  }
  @include respond-to(small) {
    width: 100%;
    padding: 24px;
  }
`;

const Title = styled.h2`
  @import "variables";

  margin: 0 0 32px 0;
  font-size: 28px;
  line-height: 130%;
  color: $black;
  @include respond-to(small) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const Flex = styled.div`
  @import "variables";

  display: flex;
  align-items: center;
  margin-bottom: 16px;

  @include respond-to(small) {
    margin-bottom: 12px;
  }
`;

const FlexArea = styled.div`
  @import "variables";

  display: flex;

  p {
    margin-top: 15px;
  }
  button {
    margin: 24px 0;
  }

  @include respond-to(small) {
    text-align: center;
    button {
      margin: 20px 0;
    }
  }
`;

const Text = styled.p`
  @import "variables";

  max-width: 250px;
  width: 100%;
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  color: $black;

  @include respond-to(small) {
    display: none;
  }
`;

const TextMobile = styled(Text)`
  @import "variables";

  display: none;
  margin-bottom: 12px;

  @include respond-to(small) {
    display: block;
  }
`;

const CustomButton = styled(Button)`
  padding: 16px 0;
  width: 100%;
`;

const Agreement = styled.div`
  @import "variables";

  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: #94a1ad;

  span {
    color: $blue1;
  }
`;
