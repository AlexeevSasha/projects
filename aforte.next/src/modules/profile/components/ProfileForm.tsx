import styled from "astroturf/react";
import { Button } from "common/components/Button";
import { AppContext } from "common/components/ContextProvider";
import { IconCalendar } from "common/components/icons/IconCalendar";
import { IconDistribution } from "common/components/icons/IconDistribution";
import { IconPerson } from "common/components/icons/IconPerson";
import { Checkbox } from "common/components/inputs/Checkbox";
import { Input } from "common/components/inputs/Input";
import { ModalNames } from "common/interfaces/modal";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserT } from "../interfaces/user";
import { ProfileSettingsModal } from "./ProfileSettingsModal";

export interface IProfileForm {
  name: string;
  surname: string;
  patronymic: string;
  gender: string;
  birthday: string;
  email: string;
  mailing: boolean;
  phone: string;
}

type Props = {
  user: UserT;
};

export const ProfileForm = ({ user }: Props) => {
  const { openModal } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileForm>();

  const onSubmit = async (data: unknown) => {
    console.log(data);
    openModal(ModalNames.POPUP_MODAL, {
      children: <ProfileSettingsModal />,
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex>
          <TitileBlock>
            <IconPerson />
            <Text>Имя и фамилия</Text>
          </TitileBlock>
          <InputsBlock>
            <Input
              {...register("name", {
                required: true,
              })}
              defaultValue={user.name ? user.name : ""}
              error={!!errors.name}
              placeholder={"Имя *"}
            />
            <Input
              defaultValue={user.surname ? user.surname : ""}
              {...register("surname", {
                required: true,
              })}
              error={!!errors.surname}
              placeholder={"Фамилия *"}
            />
            <Input
              defaultValue={user.patronymic ? user.patronymic : ""}
              {...register("patronymic", {
                required: false,
              })}
              error={!!errors.patronymic}
              placeholder={"Отчество"}
            />
            <RadioBlock>
              <Checkbox
                radio
                id="profileFormM"
                label="Мужчина"
                {...register("gender")}
                value="male"
                type="radio"
              />
              <Checkbox
                radio
                id="profileFormW"
                label="Женщина"
                {...register("gender")}
                value="female"
                type="radio"
              />
            </RadioBlock>
          </InputsBlock>
        </Flex>
        <Flex>
          <TitileBlock>
            <IconCalendar />
            <Text>Дата рождения</Text>
          </TitileBlock>
          <InputsBlock>
            <Input
              defaultValue={user.birthday ? user.birthday : ""}
              {...register("birthday", {
                required: true,
              })}
              error={!!errors.birthday}
              placeholder={"Дата рождения *"}
            />
          </InputsBlock>
        </Flex>
        <Flex>
          <TitileBlock>
            <IconDistribution />
            <Text>Контактные данные</Text>
          </TitileBlock>
          <InputsBlock>
            <Input
              defaultValue={user.email ? user.email : ""}
              {...register("email", {
                required: true,
              })}
              errorText={
                !user.confirmEmail
                  ? "Пожалуйста, подтвердите почту, перейдя по ссылке в письме"
                  : ""
              }
              error={!!errors.email || !user.confirmEmail}
              placeholder={"Email *"}
            />
            <CustomCheckbox>
              <Checkbox
                id="profileEmail"
                label="Получать акции и скидки по почте"
                {...register("mailing")}
              />
            </CustomCheckbox>
            <Input
              defaultValue={user.phone ? user.phone : ""}
              icon
              {...register("phone", {
                required: true,
              })}
              error={!!errors.phone}
              placeholder={"Номер телефона *"}
            />
          </InputsBlock>
        </Flex>
        <ActionBlock>
          <ActionInfo>Заполняя форму, я принимаю условия передачи информации</ActionInfo>
          <CustomButton typeBtn={"blue"}>Сохранить</CustomButton>
        </ActionBlock>
      </form>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";
  margin-bottom: 40px;
  @include respond-to(medium) {
    margin-bottom: 32px;
  }
`;
const Flex = styled.div`
  @import "variables";
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 32px;
  svg {
    width: 24px;
    height: 24px;
    ellipse {
      fill: $blue1;
      opacity: 0.4;
    }
    path {
      fill: $blue1;
      opacity: 0.4;
    }
  }
  @include respond-to(medium) {
    margin-bottom: 12px;
    flex-direction: column;
  }
`;
const TitileBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  @include respond-to(medium) {
    margin-bottom: 16px;
  }
`;
const Text = styled.p`
  @import "variables";
  margin: 0;
  font-weight: 600;
  font-size: 16px;
  color: $black;
  margin-left: 16px;
`;
const InputsBlock = styled.div`
  @import "variables";
  width: 100%;
  display: flex;
  flex-direction: column;
  div {
    margin-bottom: 12px;
  }
  div:last-child {
    margin: 0;
  }
  @include respond-to(medium) {
    input {
      font-size: 14px;
    }
  }
`;
const RadioBlock = styled.div`
  display: flex;
  align-items: flex-start;
  label {
    font-size: 14px;
    margin-right: 24px;
  }
`;
const CustomCheckbox = styled.div`
  label {
    font-size: 14px;
  }
`;
const ActionBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  align-items: center;
  @include respond-to(medium) {
    flex-direction: column-reverse;
  }
`;
const ActionInfo = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 137%;
  opacity: 0.4;
  width: 100%;
`;
const CustomButton = styled(Button)`
  @import "variables";
  padding: 16px 40px;
  @include respond-to(medium) {
    padding: 14px 0;
    width: 100%;
    margin-bottom: 16px;
  }
`;
