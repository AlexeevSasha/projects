import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { PhoneChangeAbilityDto, userRepository } from "../../../api/userRepository";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { Input } from "../../../components/input/input";
import { InputPhone } from "../../../components/input/inputPhone";
import { LoadingScreen } from "../../../ui/LoadingScreen ";
import { ModalState } from "./changeModal";

type Props = ModalState & {
  setState: (callBack: (state: ModalState) => ModalState) => void;
};

export const ChangePhone = ({ setState }: Props) => {
  const { locale = "ru" } = useRouter();
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, setError } = useForm<PhoneChangeAbilityDto>({ mode: "onBlur" });
  const { field: phone, fieldState: phoneState } = useController({
    control,
    name: "Phone",
    rules: { validate: (value = "") => (!value || value.length < 12 ? lang[locale].auth.wrongPhone : true) },
  });
  const { field: password, fieldState: passwordState } = useController({
    control,
    name: "Password",
    rules: { required: lang[locale].form.validation.required },
  });

  const onSubmit: SubmitHandler<PhoneChangeAbilityDto> = async (data) => {
    setLoading(true);
    await userRepository
      .phoneCheckAbility(data)
      .then(() => {
        setState((state) => ({
          ...state,
          form: "code",
          sentTo: `${phone.value?.slice(0, 2)} ${phone.value?.slice(2, 5)} xxx xxxx`,
          sentBy: "byNumber",
          phone: phone.value,
        }));
      })
      .catch((e) => {
        e.Message === "incorrect password" && setError("Password", { message: lang[locale].auth.wrongPassword });
        e.Type === "errors.PhoneAlreadyIsUsedException" &&
          setError("Phone", { message: lang[locale].auth.changePhoneError });
      });
    setLoading(false);
  };

  return (
    <Container>
      {loading && <LoadingScreen />}

      <H1>{lang[locale].modalWindow.modalTitle.changePhone}</H1>

      <FormContent>
        <InputPhone
          lightStyle
          error={phoneState.error?.message}
          value={phone.value}
          onChange={(value) => phone.onChange(`+${value}`)}
          onBlur={phone.onBlur}
          label={lang[locale].modalWindow.inputsLabels.changePhone}
        />

        <Input
          lightStyle
          paddingPosition={"right"}
          error={passwordState.error?.message}
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
          type="password"
          label={lang[locale].modalWindow.inputsLabels.pass}
        />

        <StyledButton onClick={handleSubmit(onSubmit)} type={"red"}>
          {lang[locale].modalWindow.nameOfButton.changePhone}
        </StyledButton>
      </FormContent>
    </Container>
  );
};

const Container = styled.div`
  width: 18.54vw;
  margin: 0 auto;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.white};

  & > * {
    margin-bottom: 1.25vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin-bottom: 2.6vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      margin-bottom: 5.33vw;
    }
  }
`;

const H1 = styled.h1`
  font-family: "FCSM Text";
  font-weight: 500;
  font-size: 1.25vw;
  margin: 0;
  text-align: center;
  width: 100%;
  align-self: center;
  color: ${theme.colors.black};
  margin-bottom: 2.29vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    margin-bottom: 5.73vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.4vw;
    margin-bottom: 11.73vw;
  }
`;

const StyledButton = styled(CustomButton)`
  justify-content: center;
  display: flex;
  margin-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 2.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 5.33vw;
  }
`;
