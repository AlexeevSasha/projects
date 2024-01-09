import { useRouter } from "next/router";
import { useContext } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { InputPhone } from "../../../components/input/inputPhone";
import { DataContext } from "../../../core/dataProvider";
import { ThemeContext } from "../../../core/themeProvider";
import { ISignInSmsForm } from "../interfaces/ISignInSmsForm";
import { usePressEnter } from "../hooks/usePressEnter";
import { WarningTriangle } from "../../../assets/icon/warningTriangle";
import { identityRepository } from "../../../api/identityRepository";
import { useReCaptcha } from "next-recaptcha-v3";
import { getUtcDateNow } from "../../../assets/constants/date";

interface IProps {
  onSubmit: (value: ISignInSmsForm) => void;
}
// Экспортировать вне модуля только через конструкцию SignIn.[Component]
export const FormForPhone = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const { executeRecaptcha } = useReCaptcha();
  const { setLoading } = useContext(DataContext);
  const { isDarkTheme } = useContext(ThemeContext);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignInSmsForm>({ mode: "onChange" });
  const { field: login, fieldState: loginState } = useController({
    control,
    name: "phone",
    rules: {
      validate: (phone: string) => {
        if (phone && phone.length === 12) return true;
        else return lang[locale].auth.wrongPhone;
      },
    },
  });

  const submitPhone: SubmitHandler<ISignInSmsForm> = async (data) => {
    try {
      setLoading(true);
      const res = await identityRepository.authorizationSMS(data, await executeRecaptcha("SendSmsCodeWeb"));

      const sendAgain = JSON.parse(localStorage.getItem("sendAgain") || "{}");
      const time = getUtcDateNow() + res.NoUntil * 1000;
      localStorage.setItem("sendAgain", JSON.stringify({ ...sendAgain, time }));

      props.onSubmit(data);
      setLoading(false);
    } catch (e) {
      const error = e as { error_description?: string; message?: string };
      switch (error?.message) {
        case "try some later": {
          setError("BruteforceCooldown", { message: lang[locale].auth.tryLater });
          break;
        }
        default: {
          setError("BruteforceCooldown", { message: lang[locale].auth.tryLater });
          break;
        }
      }
      setLoading(false);
    }
  };

  usePressEnter(handleSubmit(submitPhone));

  return (
    <>
      {errors.BruteforceCooldown && (
        <Alert>
          <WarningTriangle />
          <span>{lang[locale].auth.tryLater}</span>
        </Alert>
      )}
      <form onSubmit={handleSubmit(submitPhone)}>
        <InputPhone
          label={lang[locale].auth.phone}
          onChange={(value) => login.onChange(login.value === "+" && !value ? value : `+${value}`)}
          value={login.value}
          onBlur={login.onBlur}
          autoFocus
          error={loginState.error?.message}
          lightStyle={!isDarkTheme}
        />

        <Spacer />

        <CustomButton type="red" onClick={handleSubmit(submitPhone)} className="submitBtn">
          {lang[locale].auth.getCode}
        </CustomButton>
      </form>
    </>
  );
};

const Spacer = styled.div`
  height: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 6.4vw;
  }
`;

const Alert = styled.div`
  background: ${theme.colors.pink}10;
  display: flex;
  gap: 0.41vw;
  padding: 0.41vw 0.83vw;
  font-size: 0.73vw;
  color: ${(props) => props.theme.colors.redLight_grayDark1};
  margin-bottom: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.82vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;
