import { useReCaptcha } from "next-recaptcha-v3";
import { useRouter } from "next/router";
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { authRepository } from "../../api/authRepository";
import { getUtcDateNow } from "../../assets/constants/date";
import { WarningTriangle } from "../../assets/icon/warningTriangle";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../../components/buttons/customButton";
import { Input } from "../../components/input/input";
import { Timer } from "../../components/timer";
import { authorize } from "../../core/authorize";
import { DataContext } from "../../core/dataProvider";
import { LoadingScreen } from "../../ui/LoadingScreen ";
import { AuthState } from "./authModal";

type Props = AuthState & {
  setState: (callBack: (state: AuthState) => AuthState) => void;
};

type CodeFormValues = {
  code: string[];
};

export const Code = ({ setState, sentBy, sentTo, userData, isRecovery }: Props) => {
  const { locale = "ru", query } = useRouter();
  const [loading, setLoading] = useState(false);
  const { goBack, updateShopData } = useContext(DataContext);
  const { control, handleSubmit, setError } = useForm<CodeFormValues>();
  const {
    field: { onChange, value },
    fieldState,
  } = useController({ control, name: "code", defaultValue: [] });
  const { executeRecaptcha } = useReCaptcha();

  const sendAgain = JSON.parse(localStorage.getItem("sendAgain") || "{}");
  const [canSendAgain, setCanSendAgen] = useState(!sendAgain.time || sendAgain.time - getUtcDateNow() < 1000);
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
    if (!userData?.userId) return;
    setLoading(true);

    try {
      if (isRecovery) {
        if (sentBy === "byNumber") await authRepository.checkSmsCode({ id: userData.userId, code: value.join("") });

        if (sentBy === "byEmail") await authRepository.checkEmailCode({ id: userData.userId, code: value.join("") });
        setState((state) => ({ ...state, sentTo: undefined, sentBy: undefined, form: "newpass" }));
      } else {
        if (sentBy === "byNumber")
          await authRepository.checkRegisterSmsCode({ userId: userData.userId, smsCode: value.join("") });

        if (sentBy === "byEmail")
          await authRepository.checkRegisterEmailCode({ userId: userData.userId, code: value.join("") });

        if (sentBy === "byNumber" /*|| !userData.email*/) {
          await authRepository.registerUser(userData, query.source);
          const { phoneNumber: login, password } = userData;
          login && password && (await authorize({ login, password, type: "password" }));
          setState(() => ({}));
          updateShopData();
          goBack();
        } else {
          setState((state) => ({ ...state, sentTo: userData.phoneNumber, sentBy: "byNumber" }));
        }
      }

      onChange([]);
    } catch (e) {
      const error = e as { message?: string; mata?: { NoUntil: number } };

      if (error.message === "code is invalid" || error.message === "code not found") {
        localStorage.setItem("sendAgain", JSON.stringify({ ...sendAgain, count: sendCount + 1 }));
        setSendCount(sendCount + 1);
        setError("code", { message: " " });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
    setLoading(true);
    const { userId, phoneNumber, email } = userData || {};
    if (!userId) {
      setState(() => ({}));
      return;
    }

    const canSendSms = sentBy === "byNumber" && phoneNumber;
    const canSendEmail = sentBy === "byEmail" && email;

    if (!sentBy) {
      setState((state) => ({ ...state, sentTo: email, sentBy: "byEmail" }));
      return;
    }

    let time = 0;

    try {
      const noUntil =
        (canSendSms &&
          !isRecovery &&
          (await authRepository.sendRegisterSmsCode({ userId }, await executeRecaptcha("SendRegisterSmsCodeWeb")))
            .NoUntil) ||
        (canSendSms &&
          isRecovery &&
          (
            await authRepository.sendSmsCode(
              { Phone: phoneNumber, Reason: "ResetPassword " },
              await executeRecaptcha("SendSmsCodeWeb")
            )
          ).NoUntil) ||
        (canSendEmail &&
          !isRecovery &&
          (await authRepository.sendRegisterEmailCode(userId, await executeRecaptcha("SendRegisterEmailCodeWeb")))
            .NoUntil) ||
        (canSendEmail &&
          isRecovery &&
          (
            await authRepository.sendEmailCode(
              { email, messageType: "ResetPassword " },
              await executeRecaptcha("SendEmailCodeWeb")
            )
          ).NoUntil) ||
        0;

      time = getUtcDateNow() + noUntil * 1000;
    } catch (e) {
      const error = e as { Message?: string; Data?: { NoUntil: number } };
      time = getUtcDateNow() + (error?.Data?.NoUntil || 0) * 1000;
    } finally {
      localStorage.setItem("sendAgain", JSON.stringify({ ...sendAgain, time }));
      setCanSendAgen(!time || time - getUtcDateNow() < 1000);
      setSendCount(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSendCode();
  }, [sentBy]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("sendAgain");
    };
  }, []);

  return (
    <Container>
      {loading && <LoadingScreen />}

      <Header>
        <div>
          <span>{lang[locale].auth.codeSent} </span>
          <span>{lang[locale].auth[sentBy || "byNumber"]}</span>
        </div>

        <div>{sentTo}</div>
      </Header>

      {sendCount > 4 && (
        <Alert>
          <WarningTriangle />
          <span>{lang[locale].auth.tryLater}</span>
        </Alert>
      )}

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
              lightStyle
              error={fieldState.error?.message}
            />
          ))}
        </FormContent>
      </form>

      <SendAgain active={canSendAgain} onClick={canSendAgain ? handleSendCode : undefined}>
        {lang[locale].auth[canSendAgain ? "sendAgain" : "resend"]}{" "}
        {!canSendAgain && sendAgain.time && (
          <Timer endTime={new Date(sendAgain.time).toString()} onEnd={() => setCanSendAgen(true)} />
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

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
  }
`;

const Header = styled.div`
  font-family: "FCSM Text", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1.25vw;
  margin: 0;
  margin-bottom: 1vw;
  text-align: center;
  align-self: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }

  & > div:last-child {
    color: ${theme.colors.red};
  }
`;

const FormContent = styled.div`
  position: relative;
  display: flex;
  margin: 2vw 0;
  padding: 0 0.625vw;
  height: 2.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 5.2vw 0 5.2vw;
    height: 7vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0;
    margin: 10vw 0;
    height: 12.8vw;
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

  & > label:not(:last-child) {
    margin-right: 1vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin-right: 2.6vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      margin-right: 5.3vw;
    }
  }
`;

const SendAgain = styled.div<{ active?: boolean }>`
  text-align: right;
  margin-bottom: 0.83vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  font-size: 0.625vw;
  color: ${({ active }) => theme.colors[active ? "black" : "grayDark"]};
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
    margin-bottom: 2vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    margin-bottom: 4.26vw;
  }
`;

const Alert = styled.div`
  background: rgba(240, 90, 79, 0.1);
  display: flex;
  gap: 0.41vw;
  padding: 0.41vw 0.83vw;
  font-size: 0.73vw;
  color: #272c32;

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
