import React, { useContext, useState } from "react";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { IPompGraph } from "../../../../../common/interfaces/IPompGraph";
import { IconContainer } from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { IsOpenCardContext } from "common/components/Container/DiseaseCardLayout";
import { IconArrow } from "../../../../../common/components/Icon/IconArrow";
import { StageBlock } from "./StageBlock";
import BpmnModeler from "../../../../../common/components/BpmnModeler/BpmnModeler";

interface IProps {
  id: string;
  graph: IPompGraph;
  first: boolean;
  setOpenedGraphsIds?: React.Dispatch<React.SetStateAction<string[]>>;
}
export const GraphBlock = (props: IProps) => {
  const { trigger } = useContext(IsOpenCardContext);

  const [openDescription, setOpenDescription] = useState(true);
  const [openDiagram, setOpenDiagram] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <StageBlockContainer key={props.id} id={props.id} style={{ marginBottom: "10px" }}>
      <StageName
        onClick={() => {
          setOpen(!open);
          trigger(`card_pompGraph_${props.graph.idGraph}`);
          props.setOpenedGraphsIds?.((prevState) => {
            prevState.push(`card_pompGraph_${props.graph.idGraph}`);
            return prevState;
          });
        }}
        style={{ marginBottom: open ? "10px" : 0 }}
      >
        <div>
          {props.graph.graphName}
          <RowTitle>МКБ-10:</RowTitle>
          {props.graph.mkb10?.map((mkb10) => mkb10).join(", ") ?? " - "}
        </div>
        <IconContainer id={`graph_${props.id}_control`}>
          <IconArrow rotate={open ? "" : "270deg"} />
        </IconContainer>
      </StageName>
      {open ? (
        <StageContent>
          <StageBlockContainer style={{ marginBottom: "10px" }}>
            <StageName onClick={() => setOpenDiagram(!openDiagram)} style={{ marginBottom: openDiagram ? "10px" : 0 }}>
              <>Диаграмма</>
              <IconContainer id={`graph_${props.id}_control`}>
                <IconArrow rotate={openDiagram ? "" : "270deg"} />
              </IconContainer>
            </StageName>
            {openDiagram && (
              <StageContent>
                <BpmnModeler diagramXML={props.graph.xmlDiagramContent} />
              </StageContent>
            )}
          </StageBlockContainer>
          <StageBlockContainer>
            <StageName
              onClick={() => setOpenDescription(!openDescription)}
              style={{ marginBottom: openDescription ? "10px" : 0 }}
            >
              <>Описание маршрута</>
              <IconContainer id={`graph_${props.id}_control`}>
                <IconArrow rotate={openDescription ? "" : "270deg"} />
              </IconContainer>
            </StageName>
            {openDescription && (
              <StageContent>
                {props.graph.pompStages?.map((stage, index) => (
                  <StageBlock
                    key={stage + "_stageBlock_" + stage.stageCode}
                    id={stage + "_stageBlock_" + stage.stageCode}
                    stage={stage}
                    first={index === 0}
                    showIconOpenBlock
                  />
                ))}
              </StageContent>
            )}
          </StageBlockContainer>
        </StageContent>
      ) : null}
    </StageBlockContainer>
  );
};

const StageBlockContainer = styled.div`
  background: ${theme.colors.white};
  padding: 8px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.colors.gray};
  border-radius: 10px;
`;
const StageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StageName = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;
const RowTitle = styled.span`
  font-weight: bold;
  align-items: baseline;
  margin-right: 5px;
  margin-left: 10px;
`;
