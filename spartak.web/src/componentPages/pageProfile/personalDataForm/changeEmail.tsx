import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { EmailChangeAbilityDto, userRepository } from "../../../api/userRepository";
import { emailRegexp } from "../../../assets/constants/regexp";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { Input } from "../../../components/input/input";
import { LoadingScreen } from "../../../ui/LoadingScreen ";
import { ModalState } from "./changeModal";

type Props = ModalState & {
  setState: (callBack: (state: ModalState) => ModalState) => void;
};

export const ChangeEmail = ({ setState }: Props) => {
  const { locale = "ru" } = useRouter();
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, setError } = useForm<EmailChangeAbilityDto>({ mode: "onBlur" });
  const { field: email, fieldState: emailState } = useController({
    control,
    name: "Email",
    rules: {
      validate: (value = "") => (!value || !emailRegexp.test(value) ? lang[locale].auth.wrongEmail : true),
    },
  });
  const { field: password, fieldState: passwordState } = useController({
    control,
    name: "Password",
    rules: { required: lang[locale].form.validation.required },
  });

  const onSubmit: SubmitHandler<EmailChangeAbilityDto> = async (data) => {
    setLoading(true);
    await userRepository
      .emailCheckAbility(data)
      .then(() => {
        setState((state) => ({ ...state, form: "code", sentTo: email.value, sentBy: "byEmail", email: email.value }));
      })
      .catch((e) => {
        e.Message === "incorrect password" && setError("Password", { message: lang[locale].auth.wrongPassword });
        e.Type === "errors.EmailAlreadyIsUsedException" &&
          setError("Email", { message: lang[locale].auth.changeEmailError });
      });
    setLoading(false);
  };

  return (
    <Container>
      {loading && <LoadingScreen />}

      <H1>{lang[locale].modalWindow.modalTitle.changeEmail}</H1>

      <FormContainer>
        <Input
          lightStyle
          error={emailState.error?.message}
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          label={lang[locale].modalWindow.inputsLabels.changeEmail}
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

        <RestyledButton onClick={handleSubmit(onSubmit)} type={"red"}>
          {lang[locale].modalWindow.nameOfButton.changeEmail}
        </RestyledButton>
      </FormContainer>
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

const FormContainer = styled.div`
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
  font-family: FCSM Text;
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

const RestyledButton = styled(CustomButton)`
  margin-top: 1.88vw;
  justify-content: center;
  margin-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 2.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 5.33vw;
  }
`;
