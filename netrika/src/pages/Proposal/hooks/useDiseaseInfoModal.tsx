import React, { useEffect } from "react";
import { Access } from "../helpers/access";
import { ModalAddDiseaseInfo } from "../components/DiseaseInfo/ModalAddDiseaseInfo";
import { ModalAddCustomBlock } from "../components/DiseaseInfo/ModalAddCustomBlock";
import { useOrderStatus } from "./useOrderStatus";
import { useParams } from "react-router";
import { modal } from "../../../common/helpers/event/modalEvent";

interface IProps {
  visibleModal: boolean;
  updateVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  customModal: { show: boolean; chapterId: number };
  updateCustomModal: React.Dispatch<React.SetStateAction<{ show: boolean; chapterId: number }>>;
  editElement: any;
  setEditElement: React.Dispatch<any>;
}

export const useDiseaseInfoModal = (props: IProps) => {
  const { id: proposalId } = useParams<{ id: string }>();
  const access = useOrderStatus();

  useEffect(() => {
    if (props.visibleModal && access === Access.Edit) {
      modal.open(
        <ModalAddDiseaseInfo
          callbackAfterClose={() => {
            props.setEditElement({});
            props.updateVisibleModal(false);
          }}
          id={props.editElement.id}
          type={props.editElement.type}
          element={props.editElement.element}
          info={props.editElement.info}
          orderId={+proposalId}
        />
      );
    }
    // eslint-disable-next-line
  }, [props.editElement, access, proposalId]);

  useEffect(() => {
    if (props.customModal.show && access === Access.Edit) {
      modal.open(
        <ModalAddCustomBlock
          callbackAfterClose={() => props.updateCustomModal({ show: false, chapterId: 0 })}
          orderId={+proposalId}
          chapterId={props.customModal.chapterId}
        />
      );
    }
    // eslint-disable-next-line
  }, [props.customModal, access, proposalId]);
};
