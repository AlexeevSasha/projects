import { IOrderConfGroup } from "common/interfaces/order/IOrderConfGroup";
import { ProposalDiseaseCardThunk } from "module/proposalDiseaseCard/proposalDiseaseCardThunk";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { IconEdit } from "common/components/Icon/IconEdit";
import { IconGroupHide } from "common/components/Icon/IconGroupHide";
import { IconGroupShow } from "common/components/Icon/IconGroupShow";
import { ru } from "common/lang/ru";
import { InputWithActions } from "common/ui/Input/InputWithActions";
import { IconContainerFloatingmes } from "common/components/Table/UIcomponent/UIcomponent";
import { Access } from "../../helpers/access";
import { ContainerControlsGeneralInfo } from "../GeneralInfo/FormInfoProposal/styledInputs";
import {
  AttributeIconDeleteContainer,
  ContainerShow,
  GroupConnectingLine,
  GroupContainer,
  TextContainer,
  TitleContainer,
} from "./styles";
import { scrollToElem } from "../../../../common/helpers/scrollToElem";
import { ProposalDiseaseCardAction } from "../../../../module/proposalDiseaseCard/proposalDiseaseCardAction";
import { MoveElement } from "./MoveElement";
import { IconDelete } from "../../../../common/components/Icon/IconDelete";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { ModalDelete } from "../../../../common/components/Modal/ModalDelete";

interface IProps {
  group: IOrderConfGroup;
  access: Access;
  openModal: (element: "group" | "subGroup" | "attribute", type: "edit" | "add", id: number, info?: any) => void;
  children: any;
  openChild: () => void;
  closeChild: () => void;
  open: boolean;
  first?: boolean;
  last?: boolean;
  idNewGroup?: number;
  blockID?: number;
  showAddDefaultSubGroup?: boolean;
  showIconOpenBlock?: boolean;
  adjacentTop?: IOrderConfGroup;
  adjacentBottom?: IOrderConfGroup;
}

export const GroupSettingDiseaseInfo = (props: IProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const [editElem, setEditElem] = useState("");

  const createDefaultSubGroup = async (groupId: number) => {
    await dispatch(ProposalDiseaseCardThunk.createDefaultSubGroup(groupId));
    dispatch(ProposalDiseaseCardThunk.getList(+id));
  };

  const openDeleteModal = useCallback(() => {
    modal.open(
      <ModalDelete
        onDelete={async () => {
          await dispatch(ProposalDiseaseCardThunk.delete(props.group.id, +id, "group"));
        }}
      />
    );
  }, [dispatch, props.group.id, id]);

  const clickSaveNewDescription = async (value: string) => {
    await dispatch(ProposalDiseaseCardThunk.updateGroupDescription(props.group.id, value));
    dispatch(ProposalDiseaseCardThunk.getList(+id));
  };
  useEffect(() => {
    if (props.idNewGroup) {
      const elem = document.getElementById(`group_${props.idNewGroup}`);
      if (elem) {
        scrollToElem(`group_${props.idNewGroup}`);
        dispatch(ProposalDiseaseCardAction.setIdNewGroup(undefined));
      }
    }
  }, [props.idNewGroup, dispatch]);

  const moveSubGroup = (data: IOrderConfGroup, param: "top" | "bottom") => {
    dispatch(ProposalDiseaseCardThunk.updateGroupSort(data, param));
  };

  return (
    <>
      <GroupContainer key={"group" + props.group.id} id={`group_${props.group.id}`}>
        <GroupConnectingLine height="70%" first={props.first} showIconOpenBlock={props.showIconOpenBlock} />
        {props.showIconOpenBlock ? (
          props.open ? (
            <ContainerShow id={"close_group"} onClick={props.closeChild} style={editElem ? { marginTop: "18px" } : {}}>
              <IconGroupHide />
            </ContainerShow>
          ) : (
            <ContainerShow id={"open_group"} onClick={props.openChild} style={editElem ? { marginTop: "18px" } : {}}>
              <IconGroupShow />
            </ContainerShow>
          )
        ) : (
          <ContainerShow />
        )}
        {props.access === Access.Edit ? (
          editElem ? (
            <TitleContainer>
              <InputWithActions
                access={props.access}
                name={props.group.description}
                clickEdit={setEditElem}
                clickSave={clickSaveNewDescription}
                defaultValue={props.group.description}
                disabled={!editElem}
                maxLength={300}
              />
            </TitleContainer>
          ) : (
            <TitleContainer>
              {props.group.description}{" "}
              <ContainerControlsGeneralInfo>
                <IconContainerFloatingmes
                  title={ru.floatingmes.edit}
                  id={`edit_${props.group.id}`}
                  onClick={() => setEditElem(props.group.description)}
                >
                  <IconEdit />
                </IconContainerFloatingmes>
              </ContainerControlsGeneralInfo>
            </TitleContainer>
          )
        ) : (
          <TitleContainer>{props.group.description}</TitleContainer>
        )}
        {props.access === Access.Edit && (
          <MoveElement
            disableBottom={props.last}
            disableTop={props.first}
            moveBottom={() => moveSubGroup(props.group, "bottom")}
            moveTop={() => moveSubGroup(props.group, "top")}
          />
        )}

        {props.access === Access.Edit && (
          <>
            {props.group.isDefault ? (
              props.showAddDefaultSubGroup ? (
                <TextContainer onClick={() => createDefaultSubGroup(props.group.id)}>
                  Добавить дефолтную подгруппу
                </TextContainer>
              ) : null
            ) : props.group.showSubGroup ? (
              <TextContainer
                onClick={() =>
                  props.openModal("subGroup", "add", props.group.id, {
                    idConfGroup: props.group.idConfGroup,
                  })
                }
              >
                Добавить подгруппу
              </TextContainer>
            ) : null}
            <AttributeIconDeleteContainer onClick={openDeleteModal}>
              <IconDelete />
            </AttributeIconDeleteContainer>
          </>
        )}
      </GroupContainer>
      {props.open ? props.children : null}
    </>
  );
};
