import React, { useState } from "react";
import { ModalLayout } from "../../../components/modal/modalLayout";
import { Modal } from "../../../components/modal/modal";
import { ChangeEmail } from "./changeEmail";
import { ChangePhone } from "./changePhone";
import { Code } from "./code";

type Props = {
  onClose: (newValue?: string) => void;
  form: "phone" | "email";
};

export type ModalState = {
  form: "phone" | "email" | "code";
  sentBy?: "byNumber" | "byEmail";
  sentTo?: string;
  phone?: string;
  email?: string;
};

export const ChangeModal = ({ onClose, form }: Props) => {
  const [state, setState] = useState<ModalState>({ form });

  return (
    <Modal clickClose={() => onClose()}>
      <ModalLayout onClose={() => onClose()} hideSocial={true}>
        {state.form === "phone" && <ChangePhone setState={setState} {...state} />}
        {state.form === "email" && <ChangeEmail setState={setState} {...state} />}
        {state.form === "code" && <Code onClose={onClose} {...state} />}
      </ModalLayout>
    </Modal>
  );
};
