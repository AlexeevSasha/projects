import { MutableRefObject, ReactElement } from "react";

export interface IRootPopup {
  drawer: Map<string, ReactElement>;
  modal: Map<string, ReactElement>;
}

export interface IPopupParam {
  previous: MutableRefObject<IRootPopup>;
  setPopupsCb: (name: keyof IRootPopup, map: Map<string, ReactElement>) => void;
}
