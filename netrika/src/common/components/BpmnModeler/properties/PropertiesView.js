import React, { Component } from "react";
import { is } from "bpmn-js/lib/util/ModelUtil";
import { useEffect, useState } from "react";
import "./PropertiesView.css";
import { Input } from "../../../ui/Input/Input";
import { CustomSelect } from "../../../ui/Select/CustomSelect";
import { SelectCustomAsync } from "../../../ui/Select/SelectCustomAsync";
import { DictionaryClinrecPompApiRequest } from "../../../../api/dictionaryClinrecPompApiRequest";
import { Provider } from "react-redux";
import { mainStore } from "../../../../App";
import { TextArea } from "../../../ui/Input/TextArea";

export default class PropertiesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedElements: [],
      element: null,
    };
  }

  componentDidMount() {
    const { modeler } = this.props;
    modeler.on("selection.changed", (e) => {
      const { element } = this.state;
      this.setState({
        selectedElements: e.newSelection,
        element: e.newSelection[0],
      });
    });

    modeler.on("element.changed", (e) => {
      const { element } = e;

      const { element: currentElement } = this.state;

      if (!currentElement) {
        return;
      }

      // update panel, if currently selected element changed
      if (element.id === currentElement.id) {
        this.setState({
          element,
        });
      }
    });

    modeler.on("element.click", (event) => {
      const element = event.element;
    });
  }

  render() {
    const { modeler, triggers, disabled } = this.props;
    const { selectedElements, element } = this.state;

    return (
      <div>
        <h5>Панель настроек</h5>
        {selectedElements.length === 1 && (
          <ElementProperties modeler={modeler} element={element} triggers={triggers} disabled={disabled} />
        )}

        {selectedElements.length === 0 && <p>Выберите элемент для редактирования</p>}

        {selectedElements.length > 1 && <p>Выберите элемент для редактирования</p>}
      </div>
    );
  }
}

const ElementProperties = (props) => {
  // eslint-disable-next-line prefer-const
  let { element, modeler, triggers, disabled } = props;

  if (element.labelTarget) {
    element = element.labelTarget;
  }
  // State to handle enabling & disabling Destinaton field
  const [showExportDestination, setShowExportDestination] = useState();

  // Enable/Disable Destination field if there is a DicomExport Service task
  useEffect(() => {
    setShowExportDestination(
      !!(element.businessObject.get("implementation") && element.businessObject.get("implementation") === "Export")
    );
  }, [element]);

  /**
   * Update the name of the BPMN Element
   * @param {String} name Name of the element
   */
  const updateName = (name) => {
    const modeling = modeler.get("modeling");

    if (name !== "") {
      modeling.updateLabel(element, name);
    } else {
      modeling.updateLabel(element, null);
    }
  };

  const updateTextParameter = (value, paramName) => {
    const modeling = modeler.get("modeling");
    const { $type, ...rest } = element.businessObject;
    const cloneBusinessObject = rest;

    if (value !== "") {
      modeling.updateProperties(element, { ...cloneBusinessObject, [paramName]: value, isUpdatedAtr: "true" });
    } else {
      modeling.updateProperties(element, { ...cloneBusinessObject, [paramName]: null, isUpdatedAtr: "true" });
    }
  };
  const updateServiceCodes = (serviceCodes) => {
    const modeling = modeler.get("modeling");
    const { $type, ...rest } = element.businessObject;
    const cloneBusinessObject = rest;
    if (serviceCodes !== "") {
      modeling.updateProperties(element, {
        ...cloneBusinessObject,
        serviceCodes: JSON.stringify(serviceCodes.map((item) => item.value)),
        isUpdatedAtr: "true",
      });
    } else {
      modeling.updateProperties(element, { ...cloneBusinessObject, serviceCodes: "", isUpdatedAtr: "true" });
    }
  };
  const updateTriggerPoints = (triggerPoints) => {
    const modeling = modeler.get("modeling");
    const { $type, ...rest } = element.businessObject;
    const cloneBusinessObject = rest;
    if (triggerPoints !== "") {
      modeling.updateProperties(element, {
        ...cloneBusinessObject,
        triggerPoints: JSON.stringify(
          triggerPoints?.map((triggerPoint) => ({
            code: triggerPoint.value,
            description: triggerPoint.label,
          }))
        ),
        isUpdatedAtr: "true",
      });
    } else {
      modeling.updateProperties(element, { ...cloneBusinessObject, triggerPoints: "", isUpdatedAtr: "true" });
    }
  };
  const updateMkb10 = (mkb10) => {
    const modeling = modeler.get("modeling");
    const { $type, ...rest } = element.businessObject;
    const cloneBusinessObject = rest;
    if (mkb10 !== "") {
      modeling.updateProperties(element, {
        ...cloneBusinessObject,
        mkb10: JSON.stringify(
          mkb10?.map((item) => ({
            code: item.value,
            description: item.label,
          }))
        ),
        isUpdatedAtr: "true",
      });
    } else {
      modeling.updateProperties(element, { ...cloneBusinessObject, mkb10: "", isUpdatedAtr: "true" });
    }
  };
  const updateStage = (stage) => {
    const modeling = modeler.get("modeling");
    const { $type, ...rest } = element.businessObject;
    const cloneBusinessObject = rest;
    if (stage !== "") {
      modeling.updateProperties(element, {
        ...cloneBusinessObject,
        stageCode: stage?.value || "",
        name: stage?.label || "",
        isUpdatedAtr: "true",
      });
      modeling.updateLabel(element, stage?.label || "");
    } else {
      modeling.updateProperties(element, { ...cloneBusinessObject, stageCode: "", isUpdatedAtr: "true" });
    }
  };

  console.log(1);

  return (
    <>
      {element.type === "bpmn:Task" && (
        <>
          <h5>{element.definitionType}</h5>
          <div>имя</div>
          <Input
            name={"name"}
            disabled={disabled}
            type="text"
            value={element.businessObject.name || ""}
            onChange={(event) => updateName(event.target.value)}
          />
          <div>Комментарий</div>
          <Input
            name={"comment"}
            disabled={disabled}
            type="text"
            value={element.businessObject.comment || ""}
            onChange={(event) => updateTextParameter(event.target.value, "comment")}
          />

          <div>Медицинские услуги</div>
          <CustomSelect
            htmlID={"Creatable_select_medicationCodes"}
            placeholder={"Введите строку..."}
            isCreatable
            isMulti
            isDisabled={disabled}
            SelectValue={
              element?.businessObject?.serviceCodes
                ? JSON.parse(element?.businessObject?.serviceCodes)?.map((item) => ({
                    value: item,
                    label: item,
                  }))
                : ""
            }
            options={[]}
            onChange={updateServiceCodes}
          />
        </>
      )}

      {element.type === "bpmn:SubProcess" && (
        <>
          <h5>{element.definitionType}</h5>
          <div>имя</div>
          <Input
            name={"name"}
            disabled={disabled}
            type="text "
            value={element.businessObject.name || ""}
            onChange={(event) => updateName(event.target.value)}
          />
          <div>Описание</div>
          <TextArea
            disabled={disabled}
            type="text"
            value={element.businessObject?.description || ""}
            onChange={(event) => updateTextParameter(event.target.value, "description")}
          />
          <div>Условие применения</div>
          <TextArea
            disabled={disabled}
            type="text"
            value={element.businessObject.conditionParam || ""}
            onChange={(event) => updateTextParameter(event.target.value, "conditionParam")}
          />
          <div>Условие проверки</div>
          <TextArea
            disabled={disabled}
            type="text"
            value={element.businessObject?.businessRuleParam || ""}
            onChange={(event) => updateTextParameter(event.target.value, "businessRuleParam")}
          />
          <div>Тригерная точка</div>
          <Provider store={mainStore}>
            <SelectCustomAsync
              isMulti
              isDisabled={disabled}
              htmlID={"triggerPointCodes"}
              SelectValue={
                element?.businessObject?.triggerPoints
                  ? JSON.parse(element?.businessObject?.triggerPoints)?.map((triggerPoint) => ({
                      value: triggerPoint.code,
                      label: triggerPoint.description,
                    }))
                  : []
              }
              options={[]}
              closeMenuOnSelect={true}
              isSearchable={true}
              onChange={(value) => updateTriggerPoints(value)}
              isRelative={true}
              withPaginateApiCallback={async (params) => {
                return new DictionaryClinrecPompApiRequest().getClinrecTriggerPoint(params).then((r) => r.result.items);
              }}
            />
          </Provider>
        </>
      )}
      {element.type === "bpmn:Participant" && (
        <>
          <h5>{element.definitionType}</h5>
          <div>имя</div>
          <Input
            name={"name"}
            disabled={disabled}
            type="text "
            value={element.businessObject.name || ""}
            onChange={(event) => updateName(event.target.value)}
          />
          <div>Диагнозы</div>
          <Provider store={mainStore}>
            <SelectCustomAsync
              isMulti
              isDisabled={disabled}
              htmlID={"diagnoses"}
              SelectValue={
                element?.businessObject?.mkb10
                  ? JSON.parse(element?.businessObject?.mkb10)?.map((triggerPoint) => ({
                      value: triggerPoint.code,
                      label: triggerPoint.description,
                    }))
                  : []
              }
              options={[]}
              isSearchable={true}
              onChange={(value) => updateMkb10(value)}
              isRelative={true}
              withPaginateApiCallback={async (params) => {
                return new DictionaryClinrecPompApiRequest()
                  .getDictionaryClinrecPompDiagnosis(params)
                  .then((r) => r.result.items);
              }}
            />
          </Provider>
        </>
      )}

      {element.type === "bpmn:Lane" && element.id.includes("Lane_stage_") && (
        <>
          <div>Название</div>{" "}
          <Provider store={mainStore}>
            <SelectCustomAsync
              isDisabled={disabled}
              htmlID={"field-dictionary"}
              SelectValue={
                element?.businessObject?.stageCode && element?.businessObject.name
                  ? { value: element?.businessObject.stageCode, label: element?.businessObject.name }
                  : ""
              }
              options={[]}
              closeMenuOnSelect={true}
              isSearchable={true}
              onChange={(value) => updateStage(value)}
              isRelative={true}
              withPaginateApiCallback={async (params) => {
                return new DictionaryClinrecPompApiRequest().getClinrecStsgeList(params).then((r) => r.result.items);
              }}
            />
          </Provider>
        </>
      )}
    </>
  );
};

// helpers ///////////////////

const hasDefinition = (event, definitionType) => {
  const definitions = event.businessObject.eventDefinitions || [];

  return definitions.some((d) => is(d, definitionType));
};
