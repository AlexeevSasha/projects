import styled from "astroturf/react";
import { Button } from "common/components/Button";
import { AppContext } from "common/components/ContextProvider";
import { IconCross } from "common/components/icons/IconCross";
import { Input } from "common/components/inputs/Input";
import { TextArea } from "common/components/inputs/TextArea";
import { ModalNames } from "common/interfaces/modal";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export interface IProfileForm {
  name: string;
  surname: string;
  email: string;
  phone: string;
  link: string;
  additional: string;
  file: any;
}

type Props = {
  detail?: boolean;
};

export const ResumeForm = ({ detail }: Props) => {
  const { closeModal } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileForm>();

  const onSubmit = async (data: unknown) => {
    console.log(data);
    closeModal(ModalNames.POPUP_MODAL);
  };

  return (
    <Container id="resume">
      <HeaderConteiner>
        <Title>Расскажите нам о себе</Title>
        <Close onClick={() => closeModal(ModalNames.POPUP_MODAL)} detail={detail}>
          <IconCross />
        </Close>
      </HeaderConteiner>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <Row>
            <Input
              {...register("name", {
                required: true,
              })}
              error={!!errors.name}
              placeholder={"Имя"}
            />
            <Input
              {...register("surname", {
                required: true,
              })}
              error={!!errors.surname}
              placeholder={"Фамилия"}
            />
            <Input
              {...register("phone", {
                required: true,
              })}
              error={!!errors.phone}
              placeholder={"Номер телефона"}
            />
          </Row>
          <Row custom={true}>
            <Input
              {...register("email", {
                required: true,
              })}
              error={!!errors.email}
              placeholder={"Электронная почта"}
            />
            <Input
              {...register("link", {
                required: true,
              })}
              error={!!errors.link}
              placeholder={"Резюме на HH, LinkedIn, Github и других сервисах"}
            />
          </Row>
          <Row>
            <TextArea
              style={{ height: 100 }}
              {...register("additional", {
                required: true,
              })}
              error={!!errors.additional}
              placeholder={"Дополнительные сведения"}
            />
          </Row>
          <ActionBlock>
            <FileBlock>
              <FileButtonBlock>
                <LabelInputFile htmlFor={"input-file"}>Выберите файл с резюме</LabelInputFile>
                <Input
                  id={"input-file"}
                  type="file"
                  {...register("file", {
                    required: true,
                    validate: (value) =>
                      /txt|pdf|docx/.test(value[0].name) && value[0].size <= 9437184,
                  })}
                  error={!!errors.file}
                />
              </FileButtonBlock>
              <FileSize>Один файл размером до 9 МБ</FileSize>
            </FileBlock>
            <FormButton typeBtn={"blue"}>Отправить</FormButton>
          </ActionBlock>
          <DexcriptionText>
            Нажимая кнопку «Подписаться» вы соглашаетесь с правилами работы и обработки персональных
            данных
          </DexcriptionText>
        </Wrapper>
      </form>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";
  padding: 40px;
  scroll-margin-top: 140px;
  @include respond-to(small) {
    padding: 24px;
  }
`;

const Title = styled.span`
  @import "variables";
  font-weight: 600;
  font-size: 22px;
  line-height: 137%;
  @include respond-to(small) {
    font-size: 20px;
  }
`;

const Wrapper = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  @include respond-to(small) {
    margin-top: 16px;
  }
`;

const Row = styled.div<{ custom?: boolean }>`
  @import "variables";
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  div {
    margin-right: 20px;
  }
  :last-child {
    margin-right: 0px;
  }
  &.custom {
    div:first-child {
      width: 33.5%;
    }
    div:last-child {
      width: 70%;
    }
  }
  @include respond-to(small) {
    flex-direction: column;
    margin-bottom: 12px;
    div {
      margin-right: 0px;
      margin-bottom: 12px;
    }
    :last-child {
      margin-right: 0px;
      margin-bottom: 0px;
    }
    &.custom {
      div:first-child {
        width: 100%;
      }
      div:last-child {
        width: 100%;
      }
    }
  }
`;

const DexcriptionText = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  opacity: 0.4;
  margin-top: 20px;
  @include respond-to(small) {
    font-size: 13px;
    margin-top: 16px;
  }
`;

const ActionBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @include respond-to(small) {
    flex-direction: column;
  }
`;

const FileBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  align-items: baseline;
  @include respond-to(small) {
    flex-direction: column;
  }
`;

const FileSize = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  opacity: 0.4;
  margin-left: 20px;
  @include respond-to(small) {
    margin-top: 8px;
    margin-left: 0px;
  }
`;

const FileButtonBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  div {
    input {
      display: none;
    }
  }
  @include respond-to(small) {
    width: 100%;
  }
`;

const LabelInputFile = styled.label`
  @import "variables";
  padding: 19px 27px;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  background: $blue-3;
  color: $blue1;
  &:hover {
    background: $blue-2;
  }
  cursor: pointer;
  border-radius: 16px;
  @include respond-to(small) {
    width: 100%;
    padding: 17px 0;
    text-align: center;
  }
`;

const FormButton = styled(Button)`
  @import "variables";
  padding: 16px 68.5px;
  height: fit-content;
  @include respond-to(small) {
    width: 100%;
    padding: 17px 0;
    margin-top: 12px;
  }
`;

const HeaderConteiner = styled.div`
  @import "variables";
  @include respond-to(small) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Close = styled.div<{ detail?: boolean }>`
  @import "variables";
  display: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background: $BG;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: rotate(90deg);
  }

  @include respond-to(small) {
    display: flex;
    &.detail {
      display: none;
    }
  }
`;
