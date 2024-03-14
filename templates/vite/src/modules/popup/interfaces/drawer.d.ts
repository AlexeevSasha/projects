import { IRootPopup } from "@/modules/popup/interfaces/popup";
import { MutableRefObject } from "react";

export interface IDrawer {
  id: string;
  position: "left" | "right";
  children: JSX.Element;
}

export interface IPopupParam {
  previous: MutableRefObject<IRootPopup>;
  setPopupsCb: (name: keyof IRootPopup, map: Map<number, JSX.Element>) => void;
}
