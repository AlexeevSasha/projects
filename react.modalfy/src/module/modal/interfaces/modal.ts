import { ReactNode } from "react";
import { IPopupOptions } from "@/common/interfaces/popup";

export type IModalOptions = IPopupOptions;

export interface IModal extends IModalOptions {
  id: string;
  children: ReactNode;
}
