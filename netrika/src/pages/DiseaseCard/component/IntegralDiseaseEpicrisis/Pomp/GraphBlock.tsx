import React, { useEffect, useState } from "react";
import { ContainerShow } from "../../../../Proposal/components/DiseaseInfo/styles";
import { IconGroupHide } from "../../../../../common/components/Icon/IconGroupHide";
import { IconGroupShow } from "../../../../../common/components/Icon/IconGroupShow";
import { IPompGraph } from "../../../../../common/interfaces/IPompGraph";
import { StageBlock } from "./StageBlock";
import { ModalBPMNEditor } from "../../../../Proposal/components/QualityRequirements/ModalBPMNEditor";
import styled from "styled-components";
import { theme } from "../../../../../common/styles/theme";
import { modal } from "../../../../../common/helpers/event/modalEvent";

interface IProps {
  id: string;
  graph: IPompGraph;
  showIconOpenBlock?: boolean;
  pompId: number;
  index: number;
}

export const GraphBlock = (props: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [xml, setXML] = useState<string>("");

  useEffect(() => {
    setXML(props?.graph?.xmlDiagramContent || "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.graph?.xmlDiagramContent]);

  const openXML = () => {
    modal.open(<ModalBPMNEditor xmlDiagramContent={xml} />);
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
            <ContainerShow id={`open_stage_${props.graph.idGraph}`} onClick={() => setOpen(true)}>
              <IconGroupShow />
            </ContainerShow>
          )
        ) : (
          <ContainerShow />
        )}
        <StageName>{props.graph.graphName} </StageName>

        <RowTitle>МКБ-10:</RowTitle>
        {Array.isArray(props.graph?.mkb10) && !!props.graph?.mkb10.length
          ? props.graph?.mkb10.map((mkb10) => mkb10).join(", ")
          : " - "}
        <ButtonDiagram id={"openEditDiagram"} onClick={openXML}>
          Открыть диаграмму маршрута
        </ButtonDiagram>
      </StageBlockContainer>
      {open && (
        <StageContent>
          {props?.graph?.pompStages?.map((item) => (
            <StageBlock
              key={props.id + "_stageBlock_" + item.stageCode}
              id={props.id + "_stageBlock_" + item.stageCode}
              stage={item}
              showIconOpenBlock
            />
          ))}
        </StageContent>
      )}
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

const StageName = styled.div`
  margin-left: 20px;
  display: flex;

  div {
    margin-left: 20px;
  }
`;
const ButtonDiagram = styled.div`
  margin-left: 10px;
  cursor: pointer;
  color: ${theme.colors.green};

  :hover {
    color: ${theme.colors.grayBlue};
  }
`;

const RowTitle = styled.span`
  font-weight: bold;
  align-items: baseline;
  margin-right: 5px;
  margin-left: 10px;
`;
