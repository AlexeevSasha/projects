import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { emailRegexp } from "../../../assets/constants/regexp";
import { WarningTriangle } from "../../../assets/icon/warningTriangle";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { Input } from "../../../components/input/input";
import { InputPhone } from "../../../components/input/inputPhone";
import { MessageModal } from "../../../components/modal/messageModal";
import { Alert } from "../../../components/modal/modalUi";
import { authorize } from "../../../core/authorize";
import { DataContext } from "../../../core/dataProvider";
import { ThemeContext } from "../../../core/themeProvider";
import { AuthState } from "../../autn/authModal";
import { usePressEnter } from "../hooks/usePressEnter";
import { ISignInPasswordForm } from "../interfaces/ISignInPasswordForm";

type Props = {
  setState?: (callBack: (state: AuthState) => AuthState) => void;
};

// Экспортировать вне модуля только через конструкцию SignIn.[Component]
export const SignInLoginForm = ({ setState }: Props) => {
  const { locale = "ru" } = useRouter();
  const { goBack, updateShopData, setLoading } = useContext(DataContext);
  const { isDarkTheme } = useContext(ThemeContext);
  const [userDeleted, setUserDeleted] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignInPasswordForm>({ mode: "onChange" });
  const { field: login, fieldState: loginState } = useController({
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
  const { field: password, fieldState: passState } = useController({ control, name: "password" });

  const onSubmit: SubmitHandler<ISignInPasswordForm> = async (data) => {
    try {
      setLoading(true);
      await authorize({ ...data, type: "password" });
      updateShopData();
      goBack().finally(() => {
        setLoading(false);
      });
    } catch (e) {
      const error = e as { error_description?: string };
      switch (error.error_description) {
        case "BruteforceCooldown": {
          setError("BruteforceCooldown", { message: lang[locale].auth.wrongPassword });
          break;
        }
        case "incorrect password": {
          setError("password", { message: lang[locale].auth.wrongPassword });
          break;
        }
        case "The user account has been deleted": {
          setUserDeleted(true);
          break;
        }
        default: {
          if (error.error_description && lang[locale].auth.errors[error.error_description]) {
            setError(+error.error_description < 100030 ? "password" : "login", {
              message: lang[locale].auth.errors[error.error_description],
            });
          } else setError("login", { message: lang[locale].auth.userNotFound });
        }
      }
      setLoading(false);
    }
  };

  usePressEnter(handleSubmit(onSubmit));

  return (
    <>
      <Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          {login.value?.startsWith("+") ? (
            <InputPhone
              label={lang[locale].auth.phoneOrMmail}
              onChange={(value) => login.onChange(login.value === "+" && !value ? value : `+${value}`)}
              value={login.value}
              onBlur={login.onBlur}
              autoFocus
              error={loginState.error?.message}
              lightStyle={!isDarkTheme}
            />
          ) : (
            <Input
              onChange={(e) => {
                const value = e.currentTarget.value.startsWith("+")
                  ? "+" + e.currentTarget.value.replace(/\D/g, "")
                  : e.currentTarget.value;
                login.onChange(value === "+" ? "+7" : value);
              }}
              onBlur={login.onBlur}
              value={login.value}
              label={lang[locale].auth.phoneOrMmail}
              autoFocus
              error={loginState.error?.message}
              lightStyle={!isDarkTheme}
            />
          )}

          {/* <PhonePrompt>{!loginState.error?.message && lang[locale].auth.phonePrompt}</PhonePrompt> */}

          <Spacer />

          <Input
            onChange={password.onChange}
            value={password.value}
            label={lang[locale].auth.password}
            paddingPosition="right"
            type="password"
            error={passState.error?.message}
            onBlur={password.onBlur}
            lightStyle={!isDarkTheme}
          />

          <ForgotPassword onClick={() => setState?.((state) => ({ ...state, form: "passrecovery" }))}>
            {lang[locale].auth.forgotPassword}
          </ForgotPassword>
        </form>

        {errors.BruteforceCooldown && (
          <Alert color={theme.colors.white}>
            <WarningTriangle />
            <span>{lang[locale].auth.bruteforceCooldown}</span>
          </Alert>
        )}

        <CustomButton type="red" onClick={handleSubmit(onSubmit)} className="submitBtn">
          {lang[locale].auth.enter}
        </CustomButton>
      </Content>
      {userDeleted && (
        <MessageModal message={lang[locale].auth.deletedUserMessage} onClose={() => setUserDeleted(false)} />
      )}
    </>
  );
};

const Content = styled.div`
  width: 19.7vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const ForgotPassword = styled.div`
  text-transform: uppercase;
  text-align: right;
  margin: 0.83vw 0 2.08vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  font-size: 0.625vw;
  color: ${({ theme }) => theme.colors.white_black};
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
    margin: 2.08vw 0 5.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    margin: 4.26vw 0 6.4vw;
  }
`;

const PhonePrompt = styled.div`
  font-family: "Roboto", sans-serif;
  position: absolute;
  color: ${theme.colors.gray};
  font-size: 0.73vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const Spacer = styled.div`
  height: 2.3vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 5.73vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 11.73vw;
  }
`;
