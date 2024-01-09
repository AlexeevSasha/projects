import { ru } from "../../lang/ru";
import { IconDelete } from "../Icon/IconDelete";
import { IconContainerFloatingmes } from "../Table/UIcomponent/UIcomponent";
import React, { useCallback } from "react";
import { modal } from "../../helpers/event/modalEvent";
import { ModalDelete, ModalDeleteProps } from "./ModalDelete";

interface IProps extends ModalDeleteProps {
  id?: string;
  position?: "left" | "right";
  modalTitle?: string;
}

export const ModalDeleteWIthIcon = ({ onDelete, id, position, modalTitle, ...props }: IProps) => {
  const openModal = useCallback(() => {
    modal.open(<ModalDelete title={modalTitle} onDelete={onDelete} {...props} />);

    // eslint-disable-next-line
  }, []);

  return (
    <IconContainerFloatingmes position={position} id={id} title={ru.floatingmes.delete} onClick={openModal}>
      <IconDelete />
    </IconContainerFloatingmes>
  );
};
