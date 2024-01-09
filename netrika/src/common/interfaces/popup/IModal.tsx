import { ReactNode } from "react";
import { IPopupOptions } from "./IPopup";

export interface IModalOptions extends IPopupOptions {
  title?: ReactNode;
  width?: number;
}

export interface IBaseModal {
  id: string;
  children: ReactNode;
  closePrevious?: boolean;
}

export interface IModal extends IModalOptions {
  children: ReactNode;
  popupid?: string;
}

export interface IDrawer extends IModal {
  position?: "left" | "right" | "bottom" | "top";
}
