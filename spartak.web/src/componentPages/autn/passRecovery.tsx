import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { authRepository } from "../../api/authRepository";
import { emailRegexp } from "../../assets/constants/regexp";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import { Input } from "../../components/input/input";
import { InputPhone } from "../../components/input/inputPhone";
import { FormContent } from "../../components/modal/modalUi";
import { AuthState } from "./authModal";
import { SignUpFormValues } from "./signup";

type Props = AuthState & {
  setState: (callBack: (state: AuthState) => AuthState) => void;
};

export type SigninFormValues = {
  login: string;
};

export const PassRecovery = ({ setState }: Props) => {
  const { locale = "ru" } = useRouter();
  const { control, handleSubmit, formState, setError } = useForm<SigninFormValues>({ mode: "onBlur" });
  const { field: login, fieldState } = useController({
    control,
    name: "login",
    rules: {
      validate: (login?: string) => {
        if (login && login.startsWith("+") && login.length === 12) return true;
        if (login && emailRegexp.test(login)) return true;
        return lang[locale].auth.loginError;
      },
    },
  });

  const onSubmit: SubmitHandler<SigninFormValues> = async ({ login }) => {
    const userData: SignUpFormValues = { userId: await authRepository.checkAbility(login) };

    if (!Object.keys(formState.errors).length && userData.userId) {
      login?.startsWith("+") ? (userData.phoneNumber = login) : (userData.email = login);

      setState((state) => ({
        ...state,
        userData,
        sentBy: login?.startsWith("+") ? "byNumber" : "byEmail",
        sentTo: login,
        form: "code",
        isRecovery: true,
      }));
    } else {
      setError("login", { message: lang[locale].auth.userNotFound });
    }
  };

  return (
    <Container>
      <H1>{lang[locale].auth.passRecovery}</H1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          {login.value?.startsWith("+") ? (
            <InputPhone
              label={lang[locale].auth.enterPhoneOrMmail}
              onChange={(value) => login.onChange(login.value === "+" && !value ? value : `+${value}`)}
              value={login.value}
              onBlur={login.onBlur}
              autoFocus
              lightStyle
              error={fieldState.error?.message}
            />
          ) : (
            <Input
              onChange={(e) => login.onChange(e.currentTarget.value === "+" ? "+7" : e.currentTarget.value)}
              onBlur={login.onBlur}
              value={login.value}
              label={lang[locale].auth.enterPhoneOrMmail}
              lightStyle
              autoFocus
              error={fieldState.error?.message}
            />
          )}
        </FormContent>

        <Button type="red" onClick={handleSubmit(onSubmit)} className="submitBtn">
          {lang[locale].auth.proceed}
        </Button>
      </form>
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

const H1 = styled.h1`
  font-family: "FCSM Text", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1.25vw;
  margin: 0;
  text-align: center;
  align-self: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const Button = styled(CustomButton)`
  margin-top: 2.91vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 7.3vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 14.93vw;
  }
`;
