import React, { useCallback, useEffect, useRef } from "react";

import BpmnModeler from "bpmn-js/lib/Modeler";

import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js/dist/assets/diagram-js.css";

import "bpmn-js-properties-panel/dist/assets/properties-panel.css";
import { styled } from "../../../styles/styled";
import resizeAllModule from "bpmn-js-nyan/lib/resize-all-rules";
import BpmnColorPickerModule from "bpmn-js-color-picker";
import minimapModule from "diagram-js-minimap";

import qaExtension from "./qa.json";
import { ButtonsModalForm } from "../../../ui/Button/ButtonsModalForm";

export const DesignWorkflow = ({ diagram, closeModal, onSave, disabled }) => {
  const isMounted = useRef(false);

  // BPMN Modeler
  const bpmnModeler = useRef(null);

  // BPMN Design Container
  const mainContainer = useRef(null);

  /**
   * Open BPMN Diagram in the canvas
   * @param {string} xml XML to be parsed.
   */
  const openBpmnDiagram = async (xml) => {
    try {
      await bpmnModeler.current.importXML(xml);
      const canvas = bpmnModeler.current.get("canvas");
      canvas.zoom("fit-viewport");
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Fill the BPMN canvas with initial empty BPMN
   */
  const newBpmnDiagram = useCallback(() => {
    openBpmnDiagram(diagram);
  }, [diagram]);

  // check api availability
  if (!window.FileList || !window.FileReader) {
    // eslint-disable-next-line no-alert
    window.alert(
      "Looks like you use an older browser that does not support drag and drop. Try using Chrome, Firefox or the Internet Explorer > 10."
    );
  }

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    bpmnModeler.current = new BpmnModeler({
      container: document.querySelector("#bpmnview"),
      keyboard: {
        bindTo: window,
      },
      additionalModules: [resizeAllModule, BpmnColorPickerModule, minimapModule],
      moddleExtensions: {
        qa: qaExtension,
      },
    });

    // const propertiesPanel = new PropertiesPanel({
    //   container: document.querySelector("#propview"),
    //   modeler: bpmnModeler.current,
    //   triggers: ["Test1", "Test2"],
    //   disabled: disabled,
    //   additionalModules: [resizeAllModule, BpmnColorPickerModule, minimapModule],
    // });
    newBpmnDiagram();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newBpmnDiagram]);

  const onClickSave = async () => {
    const r = await bpmnModeler.current.saveXML();
    await onSave(r.xml);
  };

  return (
    <>
      <Container fluid className="workflow-design-container">
        <ModelerContainer ref={mainContainer} className="bpmn-design-container">
          <div className="workflow-bpmn-canvas" id="bpmnview" />
        </ModelerContainer>
        <div className="properties-panel-parent" id="propview" />
      </Container>
      <ButtonsModalForm onSubmit={onClickSave} onClose={closeModal} disabledSubmit={disabled} />
    </>
  );
};

// export default DesignWorkflow;
const ModelerContainer = styled.div`
  border: 1px solid #000000;
  height: 700px;
  width: 85%;
  margin: auto auto 20px;
  padding-bottom: 20px;
  .workflow-bpmn-canvas {
    height: 700px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  .properties-panel-parent {
    margin-left: 10px;
    width: 15%;
  }
`;
