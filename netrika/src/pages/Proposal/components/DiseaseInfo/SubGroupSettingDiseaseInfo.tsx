import { IOrderConfSubGroup } from "common/interfaces/order/IOrderConfSubGroup";
import { ProposalDiseaseCardThunk } from "module/proposalDiseaseCard/proposalDiseaseCardThunk";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { IconGroupHide } from "common/components/Icon/IconGroupHide";
import { IconGroupShow } from "common/components/Icon/IconGroupShow";
import { Access } from "../../helpers/access";
import {
  AttributeIconDeleteContainer,
  ContainerShow,
  ExternalSubGroupConnectingLine,
  SubGroupConnectingLine,
  SubGroupContainer,
  TextContainer,
  TitleContainer,
} from "./styles";
import { MoveElement } from "./MoveElement";
import { scrollToElem } from "../../../../common/helpers/scrollToElem";
import { ProposalDiseaseCardAction } from "../../../../module/proposalDiseaseCard/proposalDiseaseCardAction";
import { IconDelete } from "../../../../common/components/Icon/IconDelete";
import { CheckBox } from "../../../../common/ui/Input/CheckBox";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { ModalDelete } from "../../../../common/components/Modal/ModalDelete";

interface IProps {
  subGroup: IOrderConfSubGroup;
  access: Access;
  openModal: (element: "group" | "subGroup" | "attribute", type: "edit" | "add", id: number, info?: any) => void;
  children: any;
  openChild: () => void;
  closeChild: () => void;
  open: boolean;
  first?: boolean;
  last?: boolean;
  lastGroup?: boolean;
  idNewSubGroup?: number;
  groupID?: number;
  showIconOpenBlock?: boolean;
}

export const SubGroupSettingDiseaseInfo = (props: IProps) => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const moveSubGroup = (data: IOrderConfSubGroup, param: "top" | "bottom") => {
    dispatch(ProposalDiseaseCardThunk.updateSubGroupSort(data, param));
  };

  const openDeleteModal = useCallback(() => {
    modal.open(
      <ModalDelete
        onDelete={async () => {
          await dispatch(ProposalDiseaseCardThunk.delete(props.subGroup.id, +id, "subGroup"));
        }}
      />
    );
  }, [dispatch, props.subGroup.id, id]);

  useEffect(() => {
    if (props.idNewSubGroup) {
      const elem = document.getElementById(`subGroup_${props.idNewSubGroup}`);
      if (elem) {
        scrollToElem(`subGroup_${props.idNewSubGroup}`);
        dispatch(ProposalDiseaseCardAction.setIdNewSubGroup(undefined));
      }
    }
  }, [props.idNewSubGroup, dispatch]);

  const clickShowAll = () => {
    if (props.access === Access.Edit) {
      dispatch(
        ProposalDiseaseCardThunk.updateSubGroup(props.subGroup.id, {
          ...props.subGroup,
          allAttributes: !props.subGroup.allAttributes,
        })
      );
    }
  };

  return (
    <>
      <SubGroupContainer key={"subGroup" + props.subGroup.id} id={`subGroup_${props.subGroup.id}`}>
        {/*Линия которая соединяет подгруппы*/}
        <SubGroupConnectingLine first={props.first} showIconOpenBlock={props.showIconOpenBlock} />
        {/*Линия которая соединяет группы при открытых подгруппах*/}
        <ExternalSubGroupConnectingLine last={props.lastGroup} />
        {props.showIconOpenBlock ? (
          props.open ? (
            <ContainerShow id={"close_group"} onClick={props.closeChild}>
              <IconGroupHide />
            </ContainerShow>
          ) : (
            <ContainerShow id={"open_group"} onClick={props.openChild}>
              <IconGroupShow />
            </ContainerShow>
          )
        ) : (
          <ContainerShow />
        )}
        <TitleContainer>{props.subGroup.description}</TitleContainer>
        {props.access === Access.Edit && (
          <>
            <MoveElement
              disableBottom={props.last}
              disableTop={props.first}
              moveBottom={() => moveSubGroup(props.subGroup, "bottom")}
              moveTop={() => moveSubGroup(props.subGroup, "top")}
            />
            <TextContainer onClick={() => props.openModal("attribute", "add", props.subGroup.id)}>
              Добавить элемент
            </TextContainer>
            <AttributeIconDeleteContainer onClick={openDeleteModal}>
              <IconDelete />
            </AttributeIconDeleteContainer>
            <CheckBox
              disabled={props.access !== Access.Edit}
              check={props.subGroup.allAttributes}
              onCheck={clickShowAll}
              id={`checkBox_${props.subGroup.id}`}
              checkId={props.subGroup.id}
            >
              Вывести все
            </CheckBox>
          </>
        )}
      </SubGroupContainer>

      {props.open ? props.children : null}
    </>
  );
};
