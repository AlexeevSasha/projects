import { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";
import { ISignInSmsForm } from "../interfaces/ISignInSmsForm";
import { FormForCode } from "./formForCode";
import { FormForPhone } from "./formForPhone";

// Экспортировать вне модуля только через конструкцию SignIn.[Component]
export const SignInPhoneForm = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");

  const submitPhone = (data: ISignInSmsForm) => {
    setPhone(data.phone);
    setStep(2);
  };

  const renderForm = () => {
    switch (step) {
      case 1: {
        return <FormForPhone onSubmit={submitPhone} />;
      }
      case 2: {
        return (
          <>
            <FormForCode phone={phone} />
            <Spacer />
          </>
        );
      }
    }
  };

  return (
    <>
      <Content>{renderForm()}</Content>
    </>
  );
};

const Content = styled.div`
  width: 19.7vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
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
