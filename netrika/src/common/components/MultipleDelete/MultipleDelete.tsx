import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import React, { useCallback } from "react";
import { IconDelete } from "common/components/Icon/IconDelete";
import { modal } from "../../helpers/event/modalEvent";
import { ModalDelete } from "../Modal/ModalDelete";
import { ModalText } from "../Popup/ui/ModalText";

interface IProps {
  archive: number[];
  deleteArchive: () => void;
  clearArchive: () => void;
}

export const MultipleDelete = (props: IProps) => {
  const openDeleteModal = useCallback(() => {
    modal.open(
      <ModalDelete
        description={<ModalText>Выбрано элементов: {" " + props.archive.length}</ModalText>}
        onDelete={props.deleteArchive}
      />
    );
  }, [props.deleteArchive, props.archive]);

  return (
    <Container>
      <span>
        Выбрано элементов: <span id={"count_active_element"}>{props.archive.length}</span>
      </span>
      {props.archive.length && (
        <ButtonBlock>
          <SendToArchive onClick={openDeleteModal} id={"delete_active_element"}>
            <IconDelete color={theme.colors.blue} notHover />
            Удалить
          </SendToArchive>
          <Cancel onClick={props.clearArchive} id={"clear_active_element"}>
            Отмена
          </Cancel>
        </ButtonBlock>
      )}
    </Container>
  );
};

const Container = styled.div`
  font-weight: 600;
  line-height: 101%;
  padding: 20px;
  border-radius: 8px;
  background: ${theme.colors.white};
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
`;

const SendToArchive = styled.div`
  background: ${theme.colors.white};
  border: 1.5px solid ${theme.colors.blue};
  border-radius: 6px;
  line-height: 19px;
  color: ${theme.colors.blue};
  padding: 1px 9px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 20px;
  }
`;

const Cancel = styled.div`
  background: ${theme.colors.lightBlue};
  border: 1.5px solid ${theme.colors.blue};
  border-radius: 6px;
  line-height: 19px;
  color: ${theme.colors.blue};
  margin-left: 30px;
  padding: 9px 14px;
  cursor: pointer;
`;

const ButtonBlock = styled.div`
  display: flex;
`;
