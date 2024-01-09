import React from "react";
import BpmnModeler from "../../../../common/components/BpmnModeler/BpmnModeler";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";

interface IProps {
  xmlDiagramContent: string;
}

export const ModalBPMNEditor: React.FC<IProps> = (props) => {
  return (
    <ModalContainer closeBackdropClick fullScreen>
      <BpmnModeler diagramXML={props.xmlDiagramContent} />
    </ModalContainer>
  );
};
