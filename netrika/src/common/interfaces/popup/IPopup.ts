import { MutableRefObject, ReactElement } from "react";

export type PopupT = Map<string, ReactElement>;

export interface IRootPopup {
  drawer: PopupT;
  modal: PopupT;
}

export interface IPopupParam {
  previous: MutableRefObject<IRootPopup>;
  setPopupsCb: (name: keyof IRootPopup, popup: PopupT) => void;
}

export interface IPopupOptions {
  closeBackdropClick?: boolean;
  callbackAfterClose?: () => void;
  callbackBackdropClick?: () => void;
}

export interface IPopupClose {
  id?: string | "all";
  timeout?: boolean;
}
