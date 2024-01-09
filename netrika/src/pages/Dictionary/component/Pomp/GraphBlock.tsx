import React, { useCallback, useEffect, useState } from "react";
import { ContainerShow } from "../../../Proposal/components/DiseaseInfo/styles";
import { IconGroupHide } from "../../../../common/components/Icon/IconGroupHide";
import { IconGroupShow } from "../../../../common/components/Icon/IconGroupShow";
import { useDispatch, useSelector } from "react-redux";
import { StageBlock } from "./StageBlock";
import { useDrag } from "../../../../common/hooks/useDrag";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { theme } from "../../../../common/styles/theme";
import {
  ICustomGraph,
  IDictionaryGraph,
  IDictionaryStage,
} from "../../../../common/interfaces/dictionary/IDictionaryPomp";
import { DictionaryClinrecPompThunk } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import { ModalDictionaryBPMNEditor } from "../../../Proposal/components/QualityRequirements/ModalDictionaryBPMNEditor";
import { FlexContainer } from "../../../../common/ui/FlexContainer";
import { IconContainer, IconContainerFloatingmes } from "../../../../common/components/Table/UIcomponent/UIcomponent";
import { ru } from "../../../../common/lang/ru";
import { IconEye } from "../../../../common/components/Icon/IconEye";
import { UserRolesEnum } from "../../../../common/interfaces/user/UserRolesEnum";
import { IconEdit } from "../../../../common/components/Icon/IconEdit";
import { authorizationSelector } from "../../../../module/authorization/authorizationSelector";
import { ModalDictionaryPompStage } from "./Modals/ModalDictionaryPompStage";
import { StatementData } from "../../../../common/components/Container/Container";
import { ButtonCreateElem } from "../../../../common/ui/Button/ButtonCreateElem";
import { ModalDeleteWIthIcon } from "../../../../common/components/Modal/ModalDeleteWIthIcon";
import { modal } from "../../../../common/helpers/event/modalEvent";
import { getTitleModal } from "../../../../common/helpers/getTitle";

interface IProps {
  access: boolean;
  id: string;
  graph: IDictionaryGraph;
  showIconOpenBlock?: boolean;
  pompId: number;
  index: number;
  openModal: (graph: ICustomGraph, type: "edit" | "view") => void;
}

export const GraphBlock = (props: IProps) => {
  const dispatch = useDispatch();
  const { login } = useSelector(authorizationSelector);

  const [open, setOpen] = useState<boolean>(false);
  const [xml, setXML] = useState<string>("");

  const handleGenerateDiagram = () => {
    dispatch(
      DictionaryClinrecPompThunk.generatePompDiagram({
        pompGraphIndex: props.index,
        graph: props.graph,
        pompId: props.pompId,
      })
    );
  };

  useEffect(() => {
    setXML(props.graph.xmlDiagramContent);
  }, [props.graph.xmlDiagramContent]);

  const onSortingStages = useCallback(
    (sortArr: IDictionaryStage[]) => {
      dispatch(
        DictionaryClinrecPompThunk.sortingPompStage(props.pompId, props.graph.idGraph, props.graph.idGraph, sortArr)
      );
    },
    [dispatch, props.pompId, props.graph.idGraph]
  );

  const { sortedItems, onDragEnd } = useDrag({
    fields: props.graph.pompStages,
    sortingTable: onSortingStages,
    withoutFixedItem: true,
  });

  const onDelete = useCallback(async () => {
    await dispatch(DictionaryClinrecPompThunk.deleteGraph(props.pompId, props.graph.idGraph));
  }, [dispatch, props.pompId, props.graph.idGraph]);

  const openModalStage = (type: "add" | "edit" | "view", stage?: IDictionaryStage) => {
    modal.open(
      <ModalDictionaryPompStage
        idPomp={props.pompId}
        stagesLength={props?.graph?.pompStages?.length || 0}
        idGraph={props.graph.idGraph}
        title={getTitleModal(type, "stage")}
        disabled={type === "view"}
        currentStage={stage}
      />
    );
  };

  const openModalBPMNEditor = () => {
    modal.open(
      <ModalDictionaryBPMNEditor
        disabledSave={!props.access}
        xmlDiagramContent={xml}
        valueForDiagram={{
          pompGraphIndex: props.index,
          pompGraphId: props.graph.idGraph,
          pompId: props.pompId,
        }}
      />
    );
  };

  return (
    <>
      <StageBlockContainer key={props.id} id={props.id}>
        {props.showIconOpenBlock ? (
          open ? (
            <ContainerShow id={`close_stage_${props.graph.idGraph}`} onClick={() => setOpen(false)}>
              <IconGroupHide />
            </ContainerShow>
          ) : (
            <ContainerShow
              id={`open_stage_${props.graph.idGraph}`}
              onClick={() => {
                if (!Array.isArray(props.graph.pompStages)) {
                  dispatch(DictionaryClinrecPompThunk.getDictionaryPompsStage(props.pompId, props.graph.idGraph));
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
        <FlexContainer direction={"row"} justify={"space-between"} fullWidth>
          <StageName>
            {props.graph.graphName}{" "}
            <ButtonDiagram id={"openEditDiagram"} onClick={openModalBPMNEditor}>
              Диаграмма маршрута
            </ButtonDiagram>
            <ButtonDiagram id={"generateDiagram"} onClick={handleGenerateDiagram}>
              Перегенерировать диаграмму маршрута
            </ButtonDiagram>
          </StageName>
          <IconContainer>
            {props.access && (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) ? (
              <>
                <IconContainerFloatingmes
                  title={ru.floatingmes.edit}
                  onClick={() =>
                    props.openModal(
                      {
                        ...props.graph,
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
              <IconContainerFloatingmes
                title={ru.floatingmes.view}
                onClick={() => props.openModal(props.graph, "view")}
              >
                <IconEye />
              </IconContainerFloatingmes>
            ) : (
              <IconContainerFloatingmes
                title={ru.floatingmes.view}
                onClick={() => props.openModal(props.graph, "view")}
              >
                <IconEye />
              </IconContainerFloatingmes>
            )}
          </IconContainer>
        </FlexContainer>
      </StageBlockContainer>
      {props.access && (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) && open && (
        <StatementData style={{ background: theme.colors.white, paddingLeft: "36px", margin: 0 }}>
          <ButtonCreateElem
            onClick={() => {
              openModalStage("add");
            }}
            text={"Добавить этап"}
          />
        </StatementData>
      )}

      {open ? (
        Array.isArray(props.graph.pompStages) ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <StageContent {...provided.droppableProps} ref={provided.innerRef}>
                  {sortedItems?.map((item, index) => (
                    <Draggable
                      key={item.stageCode}
                      draggableId={item.stageCode}
                      index={index}
                      isDragDisabled={!props.access}
                    >
                      {(provided, snapshot) => (
                        <DragItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          // @ts-ignore
                          snapshot={snapshot}
                        >
                          <StageBlock
                            access={props.access}
                            graphId={props.graph.idGraph}
                            pompId={props.pompId}
                            provided={provided}
                            key={props.id + "_stageBlock_" + item.stageCode}
                            id={props.id + "_stageBlock_" + item.stageCode}
                            stage={item}
                            openModal={(stage: IDictionaryStage, type: "edit" | "view") => {
                              openModalStage(type, stage);
                            }}
                            showIconOpenBlock
                          />
                        </DragItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </StageContent>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <IconLoading />
        )
      ) : null}
    </>
  );
};

const StageBlockContainer = styled.div`
  background: ${theme.colors.white};
  padding: 12px 12px 12px 24px;
  display: flex;
  transition: height 1s ease-in-out;
`;
const StageContent = styled(StageBlockContainer)`
  flex-direction: column;
`;
const ButtonDiagram = styled.div`
  cursor: pointer;
  color: ${theme.colors.green};

  :hover {
    color: ${theme.colors.grayBlue};
  }
`;

const StageName = styled.div`
  margin-left: 20px;
  display: flex;

  div {
    margin-left: 20px;
  }
`;

const DragItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
