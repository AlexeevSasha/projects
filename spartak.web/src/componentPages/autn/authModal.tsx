import React, { useMemo } from "react";
import { Modal } from "../../components/modal/modal";
import { ModalLayout } from "../../components/modal/modalLayout";
import { Code } from "./code";
import { InfoAgree } from "./infoAgree";
import { NewPass } from "./newPass";
import { PassRecovery } from "./passRecovery";
import { RuleAgree } from "./ruleAgree";
import { SignUpFormValues } from "./signup";

export type ModalContent = "code" | "passrecovery" | "newpass" | "ruleAgree" | "infoAgree";

export type AuthState = {
  userData?: SignUpFormValues;
  form?: ModalContent;
  sentBy?: "byNumber" | "byEmail";
  sentTo?: string;
  isRecovery?: boolean;
};

type Props = {
  onClose?: () => void;
  state: AuthState;
  setState: React.Dispatch<React.SetStateAction<AuthState>>;
};

export const AuthModal = ({ onClose, state, setState }: Props) => {
  const renderModal = useMemo(() => {
    switch (state.form) {
      case "code": {
        return <Code setState={setState} {...state} />;
      }
      case "newpass": {
        return <NewPass setState={setState} {...state} />;
      }
      case "ruleAgree": {
        return <RuleAgree onClose={() => setState({})} />;
      }
      case "infoAgree": {
        return <InfoAgree onClose={() => setState({})} />;
      }
      case "passrecovery": {
        return <PassRecovery setState={setState} {...state} />;
      }
      default:
        break;
    }
  }, [state, setState]);

  return (
    <Modal clickClose={onClose}>
      <ModalLayout onClose={onClose} hideSocial overflow={state.form === "passrecovery" ? "unset" : undefined}>
        {renderModal}
      </ModalLayout>
    </Modal>
  );
};
