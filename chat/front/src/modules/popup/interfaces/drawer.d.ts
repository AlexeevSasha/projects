import { ReactElement } from "react";

export interface IDrawer {
  id: string;
  position: "left" | "right";
  children: ReactElement;
}
