import { useState } from "react";
import { SignIn } from "./SignIn";
import { SMSCode } from "./SMSCode";

export const AuthForm = () => {
  const [authData, setAuthData] = useState<{ phone: string; fullName: string }>({
    phone: "",
    fullName: "",
  });
  const [step, setStep] = useState<"SignIn" | "SMSCode">("SignIn");

  return (
    <>
      {step === "SMSCode" ? (
        <SMSCode phone={authData.phone} setStep={setStep} />
      ) : (
        <SignIn getPhone={setAuthData} setStep={setStep} phoneNumber={authData.phone} />
      )}
    </>
  );
};