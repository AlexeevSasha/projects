import React, { ReactNode, useCallback, useState } from "react";
import styled from "styled-components";
import { modal } from "../../helpers/event/modalEvent";
import { Button } from "../../ui/Button/Button";
import { ModalContainer } from "../Popup/components/ModalContainer";

export interface ModalDeleteProps {
  onDelete: () => void | Promise<void>;
  title?: string;
  description?: ReactNode;
  popupid?: string;
}

export const ModalDelete = ({ onDelete, ...props }: ModalDeleteProps) => {
  const [loading, setLoading] = useState(false);
  const onClose = useCallback(() => modal.close(props.popupid), [props.popupid]);

  const onClick = useCallback(async () => {
    setLoading(true);
    await onDelete();
    onClose();
  }, [onDelete, onClose]);

  return (
    <ModalContainer title={props.title || "Подтвердите удаление"} width={400}>
      <Description> {props.description}</Description>
      <ButtonContainer>
        <Button disabled={loading} fullWith onClick={onClose} id={"button_close"}>
          Отмена
        </Button>
        <Button fullWith isLoading={loading} color={"primary"} onClick={onClick} id={"button_delete"}>
          Удалить
        </Button>
      </ButtonContainer>
    </ModalContainer>
  );
};

const Description = styled.div`
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
