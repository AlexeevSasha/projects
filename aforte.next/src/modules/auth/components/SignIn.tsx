import styled from "astroturf/react";
import { Input } from "../../../common/components/inputs/Input";
import { Button } from "../../../common/components/Button";
import Link from "next/link";
import { ContainerAuth } from "./ContainerAuth";
import { TitleAuth } from "./TitleAuth";
import { ParagraphAuth } from "./ParagraphAuth";
import { AgreementTextAuth } from "./AgreementTextAuth";
import { useState } from "react";
import { authLogin } from "api/authApi";

type Props = {
  getPhone: (v: { phone: string; fullName: string }) => void;
  setStep: (v: "SMSCode") => void;
  phoneNumber: string;
};

export const SignIn = ({ getPhone, setStep, phoneNumber }: Props) => {
  const [phone, setPhone] = useState(phoneNumber);
  const [error, setError] = useState(false);
  const reg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

  const onClick = async () => {
    if (reg.test(phone)) {
      try {
        await authLogin({ phone: phone, fullName: "asd" });
        setError(false);
        getPhone({ phone: phone, fullName: "asd" });
        setStep("SMSCode");
      } catch (error) {
        setError(true);
        console.log(error);
      }
    } else {
      setError(true);
    }
  };

  return (
    <ContainerAuth>
      <TitleAuth>Войти на сайт</TitleAuth>
      <ParagraphAuth>
        Войдите, чтобы использовать возможности личного кабинета. Отправим код для подтверждения
        номера телефона.
      </ParagraphAuth>
      <Input
        type={"tel"}
        placeholder={"Номер телефона"}
        error={error}
        errorText={"Некорректный номер телефона"}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <CustomButton typeBtn="blue" onClick={onClick}>
        Получить код
      </CustomButton>
      <AgreementTextAuth>
        Нажимая кнопку вы соглашаетесь с{" "}
        <Link target="_blank" href={"/include/user_agreement.php"}>
          правилами обработки персональных данных
        </Link>
      </AgreementTextAuth>
    </ContainerAuth>
  );
};

const CustomButton = styled(Button)`
  @import "variables";

  width: 100%;
  padding: 16px;
`;
