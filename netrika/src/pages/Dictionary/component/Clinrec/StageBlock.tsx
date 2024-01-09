import React, { useCallback, useState } from "react";
import { ContainerShow } from "../../../Proposal/components/DiseaseInfo/styles";
import { styled } from "../../../../common/styles/styled";
import { theme } from "../../../../common/styles/theme";
import { IconGroupHide } from "../../../../common/components/Icon/IconGroupHide";
import { IconGroupShow } from "../../../../common/components/Icon/IconGroupShow";
import { ThesisBlock } from "./ThesisBlock";
import { DraggableProvided } from "react-beautiful-dnd";
import { IconDrag } from "../../../../common/components/Icon/IconDrag";
import { FlexContainer } from "../../../../common/ui/FlexContainer";
import { DictionaryClinrecPompThunk } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import {
  IDictionaryClinrecStage,
  IDictionaryClinrecThesis,
} from "../../../../common/interfaces/dictionary/IDictionaryClinrec";
import { IconContainer, IconContainerFloatingmes } from "../../../../common/components/Table/UIcomponent/UIcomponent";
import { UserRolesEnum } from "../../../../common/interfaces/user/UserRolesEnum";
import { ru } from "../../../../common/lang/ru";
import { IconEdit } from "../../../../common/components/Icon/IconEdit";
import { IconEye } from "../../../../common/components/Icon/IconEye";
import { authorizationSelector } from "../../../../module/authorization/authorizationSelector";
import { StatementData } from "../../../../common/components/Container/Container";
import { ButtonCreateElem } from "../../../../common/ui/Button/ButtonCreateElem";
import { ModalDictionaryClinrecThesis } from "../Modal/ModalDictionaryClinrecPomp/ModalDictionaryClinrecThesis/ModalDictionaryClinrecThesis";
import { DictionaryClinrecPompAction } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompAction";
import { ModalDeleteWIthIcon } from "../../../../common/components/Modal/ModalDeleteWIthIcon";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { getTitleModal } from "../../../../common/helpers/getTitle";

interface IProps {
  access: boolean;
  id: string;
  clinrecId: number;
  stage: IDictionaryClinrecStage;
  showIconOpenBlock?: boolean;
  provided: DraggableProvided;
  openModal: (stage: IDictionaryClinrecStage, type: "edit" | "view") => void;
}

export const StageBlock = (props: IProps) => {
  const dispatch = useDispatch();
  const { login } = useSelector(authorizationSelector);

  const [open, setOpen] = useState<boolean>(false);

  const onDelete = useCallback(async () => {
    await dispatch(DictionaryClinrecPompThunk.deleteClinrecStage(props.clinrecId, props.stage.stageCode));
  }, [dispatch, props.clinrecId, props.stage.stageCode]);

  const openModalClinrecThesis = (type: "add" | "edit" | "view", thesis?: IDictionaryClinrecThesis) => {
    modal.open(
      <ModalDictionaryClinrecThesis
        stageCode={props.stage.stageCode}
        idClinrec={props.clinrecId}
        disabled={type === "view"}
        currentThesis={thesis}
        callbackAfterClose={() => {
          dispatch(DictionaryClinrecPompAction.activityForModal(null));
        }}
        title={getTitleModal(type, "clinrecThesis")}
      />
    );
  };

  return (
    <FlexContainer key={props.id} alignItems={"flex-start"} style={{ width: "100%", background: "white" }}>
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
                if (!Array.isArray(props.stage.theses)) {
                  dispatch(
                    DictionaryClinrecPompThunk.getDictionaryClinrecsThesis(props.clinrecId, props.stage.stageCode)
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
              <ModalDeleteWIthIcon onDelete={onDelete} />
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
      {open ? (
        <>
          {props.access && (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) && open && (
            <StatementData style={{ marginLeft: "55px", marginBottom: "10px" }}>
              <ButtonCreateElem onClick={() => openModalClinrecThesis("add")} text={"Добавить тезис"} />
            </StatementData>
          )}
          {Array.isArray(props.stage.theses) ? (
            <StageContent>
              {props.stage.theses?.map((item, index) => (
                <ThesisBlock
                  access={props.access}
                  key={props.id + "_thesisBlock_" + index}
                  clinrecId={props.clinrecId}
                  stageCode={props.stage.stageCode}
                  id={props.id + "_thesisBlock_" + index}
                  thesis={item}
                  openModal={(thesis: IDictionaryClinrecThesis, type: "edit" | "view") => {
                    openModalClinrecThesis(type, thesis);
                  }}
                />
              ))}
            </StageContent>
          ) : (
            <IconLoading />
          )}
        </>
      ) : null}
    </FlexContainer>
  );
};

const StageBlockContainer = styled.div`
  background: ${theme.colors.white};
  padding: 12px 12px 0 12px;
  display: flex;
  transition: height 1s ease-in-out;
`;
const StageContent = styled(StageBlockContainer)`
  flex-direction: column;
  padding: 0;
  width: 100%;
  margin-bottom: 10px;
`;

const StageName = styled.div`
  margin-left: 20px;
`;
const DragIconContainer = styled.div<{ visibility: boolean }>`
  align-items: center;
  visibility: ${({ visibility }) => (visibility ? "visible" : "hidden")};
`;
