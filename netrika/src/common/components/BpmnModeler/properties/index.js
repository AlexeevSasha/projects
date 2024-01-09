import React from "react";
import ReactDOM from "react-dom";
import PropertiesView from "./PropertiesView";

export default class PropertiesPanel {
  constructor(options) {
    const { modeler, triggers, disabled } = options;

    ReactDOM.render(
      <PropertiesView disabled={disabled} modeler={modeler} triggers={triggers} />,
      document.getElementById("propview")
    );
  }
}
