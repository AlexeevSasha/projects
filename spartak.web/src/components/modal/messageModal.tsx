import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { lang } from "../../../public/locales/lang";
import { CustomButton } from "../buttons/customButton";
import { Modal } from "./modal";
import { ModalLayout } from "./modalLayout";
import { BtnGroup, H1 } from "./modalUi";

type Props = {
  onClose?: () => void;
  onConfirm?: () => void;
  message?: string;
  type?: "alert" | "confirm" | "approve";
  withoutTimeout?: boolean;
  children?: ReactNode;
  isFlex?: boolean;
};

export const MessageModal = ({
  onClose,
  onConfirm,
  message,
  type,
  withoutTimeout,
  isFlex = false,
  children,
}: Props) => {
  const { locale = "ru" } = useRouter();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    type === "alert" && !withoutTimeout && setTimeout(() => setVisible(false), 5000);
  }, []);

  useEffect(() => {
    !visible && setVisible(true);
  }, [message]);

  return visible ? (
    <Modal clickClose={onClose}>
      <ModalLayout onClose={onClose} hideSocial={true} isFlex={isFlex}>
        <H1 dangerouslySetInnerHTML={{ __html: message || lang[locale].common.confirmMessage }} />
        {children}

        {type === "confirm" && (
          <BtnGroup>
            <CustomButton type="opacity" onClick={onClose} className="submitBtn">
              {lang[locale].auth.cancelSignout}
            </CustomButton>

            <CustomButton
              type="red"
              onClick={() => {
                onConfirm?.();
                onClose?.();
              }}
              className="submitBtn"
            >
              {lang[locale].auth.confirmSignout}
            </CustomButton>
          </BtnGroup>
        )}

        {type === "approve" && (
          <BtnGroup>
            <CustomButton type="opacity" onClick={onClose} className="submitBtn">
              {lang[locale].auth.cancelSignout}
            </CustomButton>

            <CustomButton
              type="red"
              onClick={() => {
                onConfirm?.();
              }}
              className="submitBtn"
            >
              {lang[locale].auth.confirmSignout}
            </CustomButton>
          </BtnGroup>
        )}
      </ModalLayout>
    </Modal>
  ) : null;
};
