import { useRouter } from "next/router";
import React, { useContext } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { Error, Input } from "../../../components/input/input";
import { userRepository } from "../../../api/userRepository";
import { NewPassFormValues } from "../../autn/newPass";
import { ThemeContext } from "../../../core/themeProvider";
import { DataContext } from "../../../core/dataProvider";

export const ChangePasswordForm = () => {
  const { locale = "ru", push, asPath } = useRouter();
  const { control, handleSubmit } = useForm<NewPassFormValues>({ mode: "onBlur" });
  const { isDarkTheme } = useContext(ThemeContext);
  const { setShowNotification } = useContext(DataContext);

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

  const onSubmit: SubmitHandler<NewPassFormValues> = async ({ password }) => {
    await userRepository.changePassword({ NewPassword: password }).then(() => {
      setShowNotification(true);
      push(`/auth/signin?backUrl=${encodeURIComponent(asPath)}`);
    });
  };

  return (
    <DropdownList title={lang[locale].modalWindow.nameOfButton.changePass}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputsContainer>
          <InputBlock>
            <Input
              lightStyle={!isDarkTheme}
              onChange={password.onChange}
              onBlur={password.onBlur}
              value={password.value}
              label={lang[locale].auth.password}
              autoFocus
              type="password"
              paddingPosition="right"
            />

            <Err isActiveErr={!!fieldState.error?.message} isStadiumForm>
              {lang[locale].auth.passError}
            </Err>
          </InputBlock>

          <InputBlock>
            <Input
              lightStyle={!isDarkTheme}
              onChange={confirm.onChange}
              onBlur={confirm.onBlur}
              value={confirm.value}
              label={lang[locale].auth.confirm}
              error={confirmState.error?.message}
              type="password"
              paddingPosition="right"
              isStadiumForm
            />
          </InputBlock>
        </InputsContainer>

        <InputsContainer>
          <StyledButton type={"red"} onClick={handleSubmit(onSubmit)}>
            {lang[locale].form.validation.saveChanges}
          </StyledButton>
        </InputsContainer>
      </Form>
    </DropdownList>
  );
};

const Form = styled.form`
  & label > *:first-child {
    color: ${({ theme }) => theme.colors.gray_grayDark1};
    font-size: 0.83vw;
    padding-bottom: 0.21vw;
    margin-top: 1.46vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.09vw;
      padding-bottom: 0.52vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.27vw;
      padding-bottom: 1.07vw;
    }
  }
`;

const InputsContainer = styled.div`
  display: grid;
  width: 100%;
  justify-content: flex-start;
  grid-template-columns: repeat(2, 26.67vw);
  gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 66.75vw;
    gap: 3vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 100%;
  }
`;

const InputBlock = styled.div`
  display: grid;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    & > *:not(:nth-child(1)) {
      margin-bottom: 1vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    & > *:not(:nth-child(1)) {
      margin-bottom: 2.2vw;
    }
  }
`;

const StyledButton = styled(CustomButton)`
  justify-content: center;
  margin-top: 2.1vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 4vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
  }
`;

const Err = styled(Error)<{ isActiveErr: boolean }>`
  color: ${({ isActiveErr }) => (isActiveErr ? theme.colors.red : theme.colors.grayDark)};
`;
