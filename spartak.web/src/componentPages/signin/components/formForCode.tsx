import { useReCaptcha } from "next-recaptcha-v3";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { identityRepository } from "../../../api/identityRepository";
import { getUtcDateNow } from "../../../assets/constants/date";
import { WarningTriangle } from "../../../assets/icon/warningTriangle";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { Input } from "../../../components/input/input";
import { Timer } from "../../../components/timer";
import { authorize } from "../../../core/authorize";
import { DataContext } from "../../../core/dataProvider";
import { ThemeContext } from "../../../core/themeProvider";
import { usePressEnter } from "../hooks/usePressEnter";

type CodeFormValues = {
  code: string[];
};

interface IProps {
  phone: string;
  //   handleSendCode: () => void;
}

// Экспортировать вне модуля только через конструкцию SignIn.[Component]
export const FormForCode = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);
  const { goBack, updateShopData, setLoading } = useContext(DataContext);
  const { control, handleSubmit, setError } = useForm<CodeFormValues>();
  const {
    field: { onChange, value },
    fieldState,
  } = useController({ control, name: "code", defaultValue: [] });
  const { executeRecaptcha } = useReCaptcha();

  const sendAgain = JSON.parse(localStorage.getItem("sendAgain") || "{}");
  const [canSendAgain, setCanSendAgain] = useState(!sendAgain.time || sendAgain.time - getUtcDateNow() < 1000);
  const [sendCount, setSendCount] = useState(sendAgain.count || 0);

  const canSubmit = value.length === 5 && value.every((item) => item) && sendCount < 5;

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleChange = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length < 2) {
      const nextValue = [...value];
      nextValue[i] = e.currentTarget.value;
      onChange(nextValue);
      e.currentTarget.value && (formRef.current?.elements[i + 1] as HTMLElement)?.focus();
    }
  };

  const handleKeyDown = (i: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value) {
      (formRef.current?.elements[i - 1] as HTMLElement)?.focus();
    }
  };

  const onSubmit: SubmitHandler<CodeFormValues> = async () => {
    if (canSubmit) {
      setLoading(true);

      try {
        await authorize({ phone: props.phone, code: value.join(""), type: "phone" });
        updateShopData();
        goBack();
      } catch (e) {
        //   const error = e as { Message?: string; Data?: { NoUntil: number } };
        //   if (error.Message === "code is invalid") {
        localStorage.setItem("sendAgain", JSON.stringify({ ...sendAgain, count: sendCount + 1 }));
        setSendCount(sendCount + 1);
        setError("code", { message: " " });
        //   }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSendCode = async () => {
    setLoading(true);

    let time = 0;
    try {
      const noUntil = (
        await identityRepository.authorizationSMS(
          { phone: props.phone, type: "phone" },
          await executeRecaptcha("SendSmsCodeWeb")
        )
      ).NoUntil;

      time = getUtcDateNow() + noUntil * 1000;
    } catch (e) {
      const error = e as { Message?: string; Data?: { NoUntil: number } };
      time = getUtcDateNow() + (error?.Data?.NoUntil || 0) * 1000;
    } finally {
      localStorage.setItem("sendAgain", JSON.stringify({ ...sendAgain, time }));
      setCanSendAgain(!time || time - getUtcDateNow() < 1000);
      setSendCount(0);
      onChange("");
      setLoading(false);
    }
  };

  usePressEnter(handleSubmit(onSubmit));

  // Очищение localStorage
  useEffect(() => {
    return () => {
      localStorage.removeItem("sendAgain");
    };
  }, []);

  return (
    <Container>
      {sendCount > 4 && (
        <Alert>
          <WarningTriangle />
          <span>{lang[locale].auth.tryLater}</span>
        </Alert>
      )}

      <Header>
        <div>
          <span>{lang[locale].auth.enteringCode} </span>
        </div>
      </Header>

      <form ref={formRef} onSubmit={() => canSubmit && handleSubmit(onSubmit)()}>
        <FormContent>
          {fieldState.error && <Error>{lang[locale].auth.wrongCode}</Error>}
          {new Array(5).fill("").map((_, i) => (
            <Input
              key={i}
              onChange={(e) => handleChange(i)(e)}
              onKeyDown={handleKeyDown(i)}
              value={value[i]}
              type="number"
              lightStyle={!isDarkTheme}
              error={fieldState.error?.message}
            />
          ))}
        </FormContent>
      </form>

      <SendAgain active={canSendAgain} onClick={canSendAgain ? handleSendCode : undefined}>
        {lang[locale].auth[canSendAgain ? "sendAgain" : "resend"]}{" "}
        {!canSendAgain && sendAgain.time && (
          <Timer endTime={new Date(sendAgain.time).toString()} onEnd={() => setCanSendAgain(true)} />
        )}
      </SendAgain>

      <CustomButton
        type="red"
        onClick={() => canSubmit && handleSubmit(onSubmit)()}
        disabled={!canSubmit}
        className="submitBtn"
      >
        {lang[locale].auth.proceed}
      </CustomButton>
    </Container>
  );
};

const Container = styled.div`
  width: 18.54vw;
  margin: 0 auto;
  margin-top: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const Header = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.83vw;
  margin-bottom: 0.41vw;
  color: ${(props) => props.theme.colors.gray_grayDark};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const FormContent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column-gap: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
  }

  & input {
    text-align: center;
  }

  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  & input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
`;

const SendAgain = styled.div<{ active?: boolean }>`
  font-family: "Roboto", sans-serif;
  font-size: 0.83vw;
  margin: 2.08vw 0;

  color: ${({ active, theme }) => theme.colors[active ? "white_black" : "gray_grayDark"]};
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    margin: 5.22vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    margin: 6.4vw 0;
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

const Error = styled.div`
  position: absolute;
  font-family: "Roboto", sans-serif;
  color: ${theme.colors.red};
  font-size: 0.83vw;
  bottom: -1vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    bottom: -3vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    bottom: -5vw;
  }
`;
