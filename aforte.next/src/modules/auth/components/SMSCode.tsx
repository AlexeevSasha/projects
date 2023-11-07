import { Input } from "../../../common/components/inputs/Input";
import styled from "astroturf/react";
import { Button } from "../../../common/components/Button";
import { useCallback, useEffect, useState } from "react";
import { IconArraySmall } from "../../../common/components/icons/IconArraySmall";
import { ContainerAuth } from "./ContainerAuth";
import { TitleAuth } from "./TitleAuth";
import { ParagraphAuth } from "./ParagraphAuth";
import { AgreementTextAuth } from "./AgreementTextAuth";
import { phoneNumberFormatted } from "modules/profile/utils/phoneNumberFormatted";
import { authLogin, authSMSCode } from "api/authApi";

type Props = {
  phone: string;
  setStep: (v: "SignIn") => void;
};

export const SMSCode = ({ phone, setStep }: Props) => {
  const [timer, setTimer] = useState(60);
  const timeOutCallback = useCallback(() => setTimer((prev) => --prev), []);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer]);

  useEffect(() => {
    if (value.length === 6) {
      validateSmsCode();
    }
    setError(false);
  }, [value]);

  const validateSmsCode = async () => {
    try {
      await authSMSCode({ phone: phone, code: value });
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  const confirmSmsCode = async () => {
    try {
      await authLogin({ phone: phone, fullName: "asd" });
      setTimer(60);
      setValue("");
    } catch (error) {
      setTimer(60);
      setValue("");
    }
  };

  return (
    <ContainerAuth>
      <Back>
        <IconWrapper onClick={() => setStep("SignIn")}>
          <IconArraySmall size={"md"} rotate={"90deg"} />
        </IconWrapper>
        <TitleAuth>Код из СМС</TitleAuth>
      </Back>
      <ParagraphAuth>
        Мы отправили СМС с кодом <br /> на номер {phoneNumberFormatted(phone)}
      </ParagraphAuth>
      <Input
        type={"tel"}
        maxLength={6}
        placeholder={"Код из СМС"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={error}
        errorText={"Код из СМС введен неправильно"}
      />
      {timer ? (
        <AgreementTextAuth>
          Запросить код повторно можно через <br /> {timer} секунд
        </AgreementTextAuth>
      ) : (
        <CustomButton onClick={confirmSmsCode}>Выслать код повторно</CustomButton>
      )}
    </ContainerAuth>
  );
};

const Back = styled.div`
  @import "variables";

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 40px;
  margin: auto 0;
`;

const IconWrapper = styled.div`
  @import "variables";

  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f2f5fb;
  border-radius: 40px;
  width: 40px;
  height: 40px;
`;

const CustomButton = styled(Button)`
  @import "variables";

  background: transparent;
  color: $blue1;
`;
