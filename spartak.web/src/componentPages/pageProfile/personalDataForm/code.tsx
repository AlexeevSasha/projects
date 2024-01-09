import { useReCaptcha } from "next-recaptcha-v3";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { authRepository } from "../../../api/authRepository";
import { userRepository } from "../../../api/userRepository";
import { getUtcDateNow } from "../../../assets/constants/date";
import { WarningTriangle } from "../../../assets/icon/warningTriangle";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { Input } from "../../../components/input/input";
import { Timer } from "../../../components/timer";
import { LoadingScreen } from "../../../ui/LoadingScreen ";
import { ModalState } from "./changeModal";

type Props = ModalState & {
  onClose: (newValue?: string) => void;
};

type CodeFormValues = {
  code: string[];
};

export const Code = ({ onClose, sentBy, sentTo, phone, email }: Props) => {
  const { locale = "ru" } = useRouter();
  const [loading, setLoading] = useState(false);
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
      (formRef.current?.elements[i + 1] as HTMLElement)?.focus();
    }
  };

  const handleKeyDown = (i: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value) {
      (formRef.current?.elements[i - 1] as HTMLElement)?.focus();
    }
  };

  const onSubmit: SubmitHandler<CodeFormValues> = async () => {
    setLoading(true);
    try {
      sentBy === "byNumber" &&
        phone &&
        (await userRepository.phoneChange({ Phone: phone, Reason: "ChangePhone", Code: value.join("") }));

      sentBy === "byEmail" && email && (await userRepository.emailChange({ Email: email, Code: value.join("") }));
      onClose(phone || email);
    } catch (e) {
      const error = e as { Message?: string; Data?: { NoUntil: number } };

      if (error.Message === "code is invalid") {
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

    localStorage.setItem("sendAgain", JSON.stringify({ time: getUtcDateNow() + 60000, count: 0 }));
    setCanSendAgen(false);
    setSendCount(0);

    const canSendSms = sentBy === "byNumber" && phone;
    const canSendEmail = sentBy === "byEmail" && email;

    try {
      const time =
        getUtcDateNow() +
        ((canSendSms &&
          (
            await authRepository.sendSmsCode(
              { Phone: phone, Reason: "ChangePhone" },
              await executeRecaptcha("SendSmsCodeWeb")
            )
          ).NoUntil) ||
          (canSendEmail &&
            (
              await authRepository.sendEmailCode(
                { email, messageType: "ChangeEmail" },
                await executeRecaptcha("SendEmailCodeWeb")
              )
            ).NoUntil) ||
          0) *
          1000;
      localStorage.setItem("sendAgain", JSON.stringify({ ...sendAgain, time }));
      setCanSendAgen(!time || time - getUtcDateNow() < 1000);
    } catch (e) {
      const error = e as { Message?: string; Data?: { NoUntil: number } };
      const time = getUtcDateNow() + (error?.Data?.NoUntil || 0) * 1000;

      if (error?.Message === "try some later" && time) {
        localStorage.setItem("sendAgain", JSON.stringify({ ...sendAgain, time }));
        setCanSendAgen(!time || time - getUtcDateNow() < 1000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSendCode();
  }, [sentBy]);

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
        {!canSendAgain && <Timer endTime={new Date(sendAgain.time).toString()} onEnd={() => setCanSendAgen(true)} />}
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
  font-family: FCSM Text;
  font-weight: 500;
  font-size: 1.25vw;
  margin: 0;
  margin-bottom: 1vw;
  text-align: center;
  align-self: center;
  color: ${theme.colors.black};

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
  font-family: "Roboto";
  font-weight: 400;
  font-size: 0.625;
  color: ${({ active }) => theme.colors[active ? "black" : "grayDark"]};

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
  font-family: "Roboto";
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
