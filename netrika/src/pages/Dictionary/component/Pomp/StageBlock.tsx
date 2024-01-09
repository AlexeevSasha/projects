import React, { useCallback, useState } from "react";
import { ContainerShow } from "../../../Proposal/components/DiseaseInfo/styles";
import { styled } from "../../../../common/styles/styled";
import { theme } from "../../../../common/styles/theme";
import { IconGroupHide } from "../../../../common/components/Icon/IconGroupHide";
import { IconGroupShow } from "../../../../common/components/Icon/IconGroupShow";
import { StateBlock } from "./StateBlock";
import { FlexContainer } from "../../../../common/ui/FlexContainer";
import { IconDrag } from "../../../../common/components/Icon/IconDrag";
import { DraggableProvided } from "react-beautiful-dnd";
import { IDictionaryStage, IDictionaryState } from "../../../../common/interfaces/dictionary/IDictionaryPomp";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import { DictionaryClinrecPompThunk } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { useDispatch, useSelector } from "react-redux";
import { IconContainer, IconContainerFloatingmes } from "../../../../common/components/Table/UIcomponent/UIcomponent";
import { ru } from "../../../../common/lang/ru";
import { IconEdit } from "../../../../common/components/Icon/IconEdit";
import { UserRolesEnum } from "../../../../common/interfaces/user/UserRolesEnum";
import { authorizationSelector } from "../../../../module/authorization/authorizationSelector";
import { IconEye } from "../../../../common/components/Icon/IconEye";
import { StatementData } from "../../../../common/components/Container/Container";
import { ButtonCreateElem } from "../../../../common/ui/Button/ButtonCreateElem";
import { ModalDictionaryPompState } from "./Modals/ModalDictionaryPompState/ModalDictionaryPompState";
import { ModalDeleteWIthIcon } from "../../../../common/components/Modal/ModalDeleteWIthIcon";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { getTitleModal } from "../../../../common/helpers/getTitle";

interface IProps {
  access: boolean;
  id: string;
  pompId: number;
  graphId: number;
  stage: IDictionaryStage;
  showIconOpenBlock?: boolean;
  provided: DraggableProvided;
  openModal: (stage: IDictionaryStage, type: "edit" | "view") => void;
}

export const StageBlock = (props: IProps) => {
  const dispatch = useDispatch();
  const { login } = useSelector(authorizationSelector);

  const [open, setOpen] = useState<boolean>(false);

  const onDelete = useCallback(async () => {
    await dispatch(DictionaryClinrecPompThunk.deletePompStage(props.pompId, props.graphId, props.stage.stageCode));
  }, [dispatch, props.pompId, props.graphId, props.stage.stageCode]);

  const openModalPomp = (type: "add" | "edit" | "view", pomp?: IDictionaryState) => {
    modal.open(
      <ModalDictionaryPompState
        stageCode={props.stage.stageCode}
        idPomp={props.pompId}
        idGraph={props.graphId}
        disabled={type === "view"}
        currentState={pomp}
        title={getTitleModal(type, "pompState")}
      />
    );
  };

  return (
    <FlexContainer key={props.id} alignItems={"flex-start"} style={{ width: "99%" }}>
      <StageBlockContainer key={props.stage.stageCode} id={props.id}>
        <DragIconContainer
          id={`drag_${props.stage.stageCode}`}
          {...props.provided.dragHandleProps}
          style={{ marginRight: "20px" }}
          visibility={props.access}
        >
          <IconDrag />
        </DragIconContainer>
        {props.showIconOpenBlock ? (
          open ? (
            <ContainerShow id={`close_stage_${props.stage.stageCode}`} onClick={() => setOpen(false)}>
              <IconGroupHide />
            </ContainerShow>
          ) : (
            <ContainerShow
              id={`open_stage_${props.stage.stageCode}`}
              onClick={() => {
                if (!Array.isArray(props.stage.pompStates)) {
                  dispatch(
                    DictionaryClinrecPompThunk.getDictionaryPompsState(
                      props.pompId,
                      props.graphId,
                      props.stage.stageCode
                    )
                  );
                }
                setOpen(true);
              }}
            >
              <IconGroupShow />
            </ContainerShow>
          )
        ) : (
          <ContainerShow />
        )}
        <StageName>{props.stage.stageName}</StageName>
        <IconContainer>
          {props.access && (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) ? (
            <>
              <IconContainerFloatingmes
                title={ru.floatingmes.edit}
                onClick={() =>
                  props.openModal(
                    {
                      ...props.stage,
                    },
                    "edit"
                  )
                }
              >
                <IconEdit />
              </IconContainerFloatingmes>
              <ModalDeleteWIthIcon id={"delete-stage-block"} onDelete={onDelete} />
            </>
          ) : !(login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) ? (
            <IconContainerFloatingmes title={ru.floatingmes.view} onClick={() => props.openModal(props.stage, "view")}>
              <IconEye />
            </IconContainerFloatingmes>
          ) : (
            <IconContainerFloatingmes title={ru.floatingmes.view} onClick={() => props.openModal(props.stage, "view")}>
              <IconEye />
            </IconContainerFloatingmes>
          )}
        </IconContainer>
      </StageBlockContainer>
      {props.access && (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) && open && (
        <StatementData style={{ background: theme.colors.white, paddingLeft: "38px", margin: 0 }}>
          <ButtonCreateElem
            onClick={() => {
              openModalPomp("add");
            }}
            text={"Добавить подэтап"}
          />
        </StatementData>
      )}
      {open ? (
        Array.isArray(props.stage.pompStates) ? (
          <StageContent>
            {props.stage?.pompStates?.map((item) => (
              <StateBlock
                access={props.access}
                pompId={props.pompId}
                graphId={props.graphId}
                stageCode={props.stage.stageCode}
                key={props.id + "_stateBlock_" + item.idState}
                id={props.id + "_stateBlock_" + item.idState}
                state={item}
                openModal={(state: IDictionaryState, type: "edit" | "view") => {
                  openModalPomp(type, state);
                }}
              />
            ))}
          </StageContent>
        ) : (
          <IconLoading />
        )
      ) : null}
    </FlexContainer>
  );
};

const StageBlockContainer = styled.div`
  background: ${theme.colors.white};
  padding: 12px 12px 12px 12px;
  display: flex;
  transition: height 1s ease-in-out;
`;
const StageContent = styled(StageBlockContainer)`
  flex-direction: column;
  width: 100%;
`;

const StageName = styled.div`
  margin-left: 20px;
`;

const DragIconContainer = styled.div<{ visibility: boolean }>`
  align-items: center;
  visibility: ${({ visibility }) => (visibility ? "visible" : "hidden")};
`;
