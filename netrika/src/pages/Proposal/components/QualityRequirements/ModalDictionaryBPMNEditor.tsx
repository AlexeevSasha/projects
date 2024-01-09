import React, { useCallback, useState } from "react";
import { DesignWorkflow } from "../../../../common/components/BpmnModeler/properties/DesignWorkflow";
import { useDispatch } from "react-redux";
import { DictionaryClinrecPompThunk } from "../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";
import { modal } from "../../../../common/helpers/event/modalEvent";

interface IProps {
  xmlDiagramContent: string;
  valueForDiagram: { pompGraphIndex: number; pompGraphId: number; pompId: number };
  disabledSave?: boolean;
}

export const ModalDictionaryBPMNEditor: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();

  const [diagram] = useState(
    props.xmlDiagramContent ||
      '"<?xml version="1.0" encoding="utf-16"?><definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:qa="http://some-company/schema/bpmn/qa" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="10.2.1" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"><process id="Process_1wq5l9j" /><bpmndi:BPMNDiagram id="BpmnDiagram_1"><bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1wq5l9j" /></bpmndi:BPMNDiagram></definitions>"'
  );

  const onClose = useCallback(() => {
    modal.close();
  }, []);

  const onClickSave = async (xml: string) => {
    await dispatch(
      DictionaryClinrecPompThunk.updatePompDiagram({
        pompGraphIndex: props.valueForDiagram.pompGraphIndex,
        pompGraphId: props.valueForDiagram.pompGraphId,
        xml: xml,
        pompId: props.valueForDiagram.pompId,
      })
    );
    onClose();
  };

  return (
    <ModalContainer closeBackdropClick fullScreen>
      <DesignWorkflow disabled={props.disabledSave} diagram={diagram} closeModal={onClose} onSave={onClickSave} />
    </ModalContainer>
  );
};
