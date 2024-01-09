import { IOrderConfBlock } from "common/interfaces/order/IOrderConfBlock";
import { scrollToElem } from "common/helpers/scrollToElem";
import { ProposalDiseaseCardAction } from "module/proposalDiseaseCard/proposalDiseaseCardAction";
import { ProposalDiseaseCardThunk } from "module/proposalDiseaseCard/proposalDiseaseCardThunk";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IconGroupHide } from "common/components/Icon/IconGroupHide";
import { IconGroupShow } from "common/components/Icon/IconGroupShow";
import { CheckBox } from "common/ui/Input/CheckBox";
import { Access } from "../../helpers/access";
import { BlockContainer, ContainerShow, TextContainer, TitleContainer } from "./styles";
import { SortDiseaseInfo } from "./SortDiseaseInfo";
import { OrderConfiguratorCardApiRequest } from "../../../../api/orderConfiguratorCardApiRequest";
import { ISortElements } from "../../../../common/interfaces/ISortElements";
import { errorPopup } from "../../../../common/helpers/toast/error";
import { useParams } from "react-router";
import { IconContainer, IconContainerFloatingmes } from "../../../../common/components/Table/UIcomponent/UIcomponent";
import { ru } from "../../../../common/lang/ru";
import { IconEdit } from "../../../../common/components/Icon/IconEdit";
import { IconSave } from "../../../../common/components/Icon/IconSave";
import { IconCross } from "../../../../common/components/Icon/IconCross";
import styled from "styled-components";
import { Input } from "../../../../common/ui/Input/Input";
import { ModalDeleteWIthIcon } from "../../../../common/components/Modal/ModalDeleteWIthIcon";

interface IProps {
  block: IOrderConfBlock;
  access: Access;
  openModal: (element: "group" | "subGroup" | "attribute", type: "edit" | "add", id: number, info?: any) => void;
  children: any;
  openChild: () => void;
  closeChild: () => void;
  open: boolean;
  idNewBlock?: number;
  showIconOpenBlock?: boolean;
  adjacentTop?: IOrderConfBlock;
  adjacentBottom?: IOrderConfBlock;
}

export const BlockSettingDiseaseInfo = (props: IProps) => {
  const { id: proposalId } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState<boolean>();
  const [isError, setIsError] = useState<boolean>();
  const [inputValue, setInputValue] = useState<string>(props.block.description);
  const [showDescription, setShowDescription] = useState<string>(props.block.description);

  const clickCheckboxBlock = (type: "isChecked" | "isPreview") => {
    if (props.access === Access.Edit) {
      dispatch(ProposalDiseaseCardThunk.updateCheckboxBlock(props.block, type));
    }
  };

  useEffect(() => {
    if (props.idNewBlock) {
      const elem = document.getElementById(`block_${props.idNewBlock}`);
      if (elem) {
        scrollToElem(`block_${props.idNewBlock}`);
        dispatch(ProposalDiseaseCardAction.setIdNewBlock(undefined));
      }
    }
  }, [dispatch, props.idNewBlock]);

  const onChangeSort = useCallback(
    async (elem: ISortElements) => {
      try {
        await new OrderConfiguratorCardApiRequest().updateBlockSort(elem);
        dispatch(ProposalDiseaseCardThunk.getList(+proposalId));
      } catch (error) {
        errorPopup("Ошибка при изменении сортировки.");
      }
    },
    [dispatch, proposalId]
  );

  const inputHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsError(false);
      setInputValue(event.currentTarget.value);
    },
    [setInputValue]
  );

  const clickSave = () => {
    dispatch(
      ProposalDiseaseCardThunk.updateBlock(
        { ...props.block, description: inputValue },
        () => {
          setShowDescription(inputValue);
          setIsEdit(false);
        },
        () => setIsError(true)
      )
    );
  };

  const onDelete = useCallback(
    async (id: number) => {
      await dispatch(ProposalDiseaseCardThunk.deleteBlock(id));
      dispatch(ProposalDiseaseCardThunk.getList(+proposalId));
    },
    [dispatch, proposalId]
  );

  return (
    <>
      {props.block.description !== "Медицинские документы" && (
        <StyledBlockContainer key={"block" + props.block.id} id={`block_${props.block.id}`} isEdit={isEdit}>
          <LeftConteiner>
            {props.showIconOpenBlock ? (
              props.open ? (
                <ContainerShow id={`close_block_${props.block.id}`} onClick={props.closeChild}>
                  <IconGroupHide />
                </ContainerShow>
              ) : (
                <ContainerShow id={`open_block_${props.block.id}`} onClick={props.openChild}>
                  <IconGroupShow />
                </ContainerShow>
              )
            ) : (
              <ContainerShow />
            )}
            {isEdit ? (
              <Input value={inputValue} onChange={inputHandler} error={isError} maxLength={100} />
            ) : (
              <TitleContainer>{props.block.isCustom ? showDescription : props.block.description}</TitleContainer>
            )}

            {props.access === Access.Edit && (
              <SortDiseaseInfo
                adjacentTop={props.adjacentTop}
                adjacentBottom={props.adjacentBottom}
                id={props.block.id}
                currentSort={props.block.sort}
                apiSort={onChangeSort}
              />
            )}

            <CheckBox
              check={props.block.isChecked}
              onCheck={() => clickCheckboxBlock("isChecked")}
              id={`checkBox_${props.block.id}`}
              checkId={props.block.id}
            >
              Видимость
            </CheckBox>

            <CheckBox
              check={props.block.isPreview}
              onCheck={() => clickCheckboxBlock("isPreview")}
              id={`checkBox_predeclose_${props.block.id}`}
              checkId={props.block.id}
            >
              Предраскрыть
            </CheckBox>

            {props.block.isChecked && props.access === Access.Edit && props.block.showGroup && (
              <TextContainer onClick={() => props.openModal("group", "add", props.block.id)}>
                Добавить группу
              </TextContainer>
            )}
          </LeftConteiner>
          <IconContainer>
            {props.block.isCustom && props.access === Access.Edit ? (
              <>
                {isEdit ? (
                  <IconContainerFloatingmes title={ru.floatingmes.save} onClick={clickSave}>
                    <IconSave />
                  </IconContainerFloatingmes>
                ) : (
                  <IconContainerFloatingmes title={ru.floatingmes.edit} onClick={() => setIsEdit(true)}>
                    <IconEdit />
                  </IconContainerFloatingmes>
                )}
                {isEdit ? (
                  <IconContainerFloatingmes
                    title={ru.floatingmes.cancel}
                    id={"close_edit_vitrina"}
                    onClick={() => setIsEdit(false)}
                  >
                    <IconCross hideFloatingmes />
                  </IconContainerFloatingmes>
                ) : (
                  <ModalDeleteWIthIcon onDelete={() => onDelete(props.block.id)} />
                )}
              </>
            ) : (
              <></>
            )}
          </IconContainer>
        </StyledBlockContainer>
      )}

      {props.open ? <>{props.children}</> : null}
    </>
  );
};

const LeftConteiner = styled.div`
  display: flex;
`;
const StyledBlockContainer = styled(BlockContainer as any)`
  padding: ${(props: any) => (props.isEdit ? "15.5px 24px" : "10px 24px")};
`;
