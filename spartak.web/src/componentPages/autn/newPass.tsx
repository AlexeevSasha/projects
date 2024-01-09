import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { authRepository } from "../../api/authRepository";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import { Input } from "../../components/input/input";
import { AuthState } from "./authModal";

type Props = AuthState & {
  setState: (callBack: (state: AuthState) => AuthState) => void;
};

export type NewPassFormValues = {
  password: string;
  confirm?: string;
};

export const NewPass = ({ setState, userData }: Props) => {
  const { locale = "ru" } = useRouter();
  const { control, handleSubmit, formState } = useForm<NewPassFormValues>({ mode: "onBlur" });
  const { field: password, fieldState } = useController({
    control,
    name: "password",
    rules: {
      validate: (value = "") =>
        !value || value.length < 8 || value.length > 20 || !/(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\d+)/.test(value)
          ? lang[locale].auth.passError
          : true,
    },
  });
  const { field: confirm, fieldState: confirmState } = useController({
    control,
    name: "confirm",
    rules: {
      validate: (value?: string) => (value !== password.value ? lang[locale].auth.confirmError : true),
    },
  });

  const onSubmit: SubmitHandler<NewPassFormValues> = async () => {
    if (!Object.keys(formState.errors).length && userData?.userId) {
      await authRepository.resetPassword({ newPassword: password.value, id: userData.userId });
      setState(() => ({}));
    }
  };

  return (
    <>
      <H1>{lang[locale].auth.passRecovery}</H1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <Input
            onChange={password.onChange}
            onBlur={password.onBlur}
            value={password.value}
            label={lang[locale].auth.password}
            lightStyle
            autoFocus
            error={fieldState.error?.message}
            type="password"
            paddingPosition="right"
          />
          <Input
            onChange={confirm.onChange}
            onBlur={confirm.onBlur}
            value={confirm.value}
            label={lang[locale].auth.confirm}
            lightStyle
            error={confirmState.error?.message}
            type="password"
            paddingPosition="right"
          />
        </FormContent>
      </form>

      <CustomButton type="red" onClick={handleSubmit(onSubmit)} className="submitBtn">
        {lang[locale].auth.proceed}
      </CustomButton>
    </>
  );
};

const H1 = styled.h1`
  font-family: "FCSM Text", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1.25vw;
  margin: 0;
  text-align: center;
  width: 15.6vw;
  align-self: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    width: 100%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const FormContent = styled.div`
  display: grid;
  margin: 40px 0;
  gap: 20px;
`;
