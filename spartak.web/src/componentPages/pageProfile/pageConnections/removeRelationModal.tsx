import { useRouter } from "next/router";
import React from "react";
import { lang } from "../../../../public/locales/lang";
import { CustomButton } from "../../../components/buttons/customButton";
import { Modal } from "../../../components/modal/modal";
import { ModalLayout } from "../../../components/modal/modalLayout";
import { BtnGroup, H1 } from "../../../components/modal/modalUi";

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

export const RemoveRelationModal = ({ onClose, onConfirm }: Props) => {
  const { locale = "ru" } = useRouter();

  return (
    <Modal clickClose={onClose}>
      <ModalLayout onClose={onClose} hideSocial={true}>
        <H1>{lang[locale].pageProfileConnections.contacts.removeRelation}</H1>

        <BtnGroup>
          <CustomButton type="opacity" onClick={onClose} className="submitBtn">
            {lang[locale].auth.cancelSignout}
          </CustomButton>

          <CustomButton type="red" onClick={onConfirm} className="submitBtn">
            {lang[locale].auth.confirmSignout}
          </CustomButton>
        </BtnGroup>
      </ModalLayout>
    </Modal>
  );
};
