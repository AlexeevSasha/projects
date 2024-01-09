import { IOrderConfAttribute } from "common/interfaces/order/IOrderConfAttribute";
import { ProposalDiseaseCardThunk } from "module/proposalDiseaseCard/proposalDiseaseCardThunk";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { IconDelete } from "common/components/Icon/IconDelete";
import { IconEdit } from "common/components/Icon/IconEdit";
import { CheckBox } from "common/ui/Input/CheckBox";
import { Access } from "../../helpers/access";
import {
  AttributeControllerContainer,
  AttributeIconDeleteContainer,
  AttributeIconEditContainer,
  AttributesConnectingLine,
  AttributesContainer,
  AttributesText,
  ExternalAttributesConnectingLine,
  ExternalSubGroupConnectingLine,
} from "./styles";
import { MoveElement } from "./MoveElement";
import { scrollToElem } from "../../../../common/helpers/scrollToElem";
import { ProposalDiseaseCardAction } from "../../../../module/proposalDiseaseCard/proposalDiseaseCardAction";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { ModalDelete } from "../../../../common/components/Modal/ModalDelete";

interface IProps {
  attribute: IOrderConfAttribute;
  access: Access;
  openModal: (element: "group" | "subGroup" | "attribute", type: "edit" | "add", id: number, info?: any) => void;
  subGroupId: number;
  first?: boolean;
  last?: boolean;
  lastGroup?: boolean;
  lastSubGroup?: boolean;
  idNewAttribute?: number;
}

export const AttributeSettingDiseaseInfo = (props: IProps) => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const moveAttribute = (data: IOrderConfAttribute, param: "top" | "bottom") => {
    dispatch(ProposalDiseaseCardThunk.updateAttributeSort(data, param));
  };

  const openDeleteModal = useCallback(() => {
    modal.open(
      <ModalDelete
        onDelete={async () => {
          await dispatch(ProposalDiseaseCardThunk.delete(props.attribute.id, +id, "attribute"));
        }}
      />
    );
  }, [dispatch, props.attribute.id, id]);

  const attributeUseHistory = () => {
    if (props.access === Access.Edit) {
      dispatch(
        ProposalDiseaseCardThunk.updateAttribute({ ...props.attribute, useHistory: !props.attribute.useHistory })
      );
    }
  };
  useEffect(() => {
    if (props.idNewAttribute) {
      const elem = document.getElementById(`subGroup_${props.subGroupId}`);
      if (elem) {
        scrollToElem(`subGroup_${props.subGroupId}`);
        dispatch(ProposalDiseaseCardAction.setIdNewSubGroup(undefined));
      }
    }
  }, [props.idNewAttribute, props.subGroupId, dispatch]);
  return (
    <AttributesContainer key={"attribute" + props.attribute.id} id={`attribute_${props.attribute.id}`}>
      {/*Линия которая соединяет атрибуты*/}
      <AttributesConnectingLine showIconOpenBlock first={props.first} />
      {/*Линия которая соединяет группы при открытых атрибутах*/}
      <ExternalSubGroupConnectingLine last={props.lastGroup} />
      {/*Линия которая соединяет подгруппы при открытых атрибутах*/}
      <ExternalAttributesConnectingLine last={props.lastSubGroup} />
      <AttributesText>{props.attribute.description}</AttributesText>
      {props.access === Access.Edit && (
        <MoveElement
          disableBottom={props.last}
          disableTop={props.first}
          moveBottom={() => moveAttribute(props.attribute, "bottom")}
          moveTop={() => moveAttribute(props.attribute, "top")}
        />
      )}
      <CheckBox check={props.attribute.useHistory} onCheck={attributeUseHistory} checkId={props.attribute.id}>
        Исторические значения
      </CheckBox>
      {props.access === Access.Edit && (
        <AttributeControllerContainer>
          <AttributeIconEditContainer
            onClick={() => props.openModal("attribute", "edit", props.subGroupId, props.attribute)}
          >
            <IconEdit />
          </AttributeIconEditContainer>
          <AttributeIconDeleteContainer onClick={openDeleteModal}>
            <IconDelete />
          </AttributeIconDeleteContainer>
        </AttributeControllerContainer>
      )}
    </AttributesContainer>
  );
};
