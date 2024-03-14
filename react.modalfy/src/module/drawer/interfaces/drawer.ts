import { ReactNode } from "react";
import { IPopupOptions } from "@/common/interfaces/popup";

export interface IDrawerOptions extends IPopupOptions {
  position?: "left" | "right" | "bottom" | "top";
}

export interface IDrawer extends IDrawerOptions {
  id: string;
  children: ReactNode;
}
