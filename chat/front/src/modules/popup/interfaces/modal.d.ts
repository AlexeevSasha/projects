import { ReactElement } from "react";

export interface IModal {
  id: string;
  children: (id) => ReactElement;
}
