import { generateId } from "@/common/utils/generateId";
import { ReactElement } from "react";
import { IDrawer, IDrawerOptions } from "@/module/drawer/interfaces/drawer";
import { PopupEvent } from "@/common/utils/popuEvent";
import { PopupEventNames } from "@/common/interfaces/popupEventNames";
import { PopupCloseT } from "@/common/interfaces/popup";

class DrawerEvent extends PopupEvent<IDrawer> {
  constructor() {
    super();
  }

  open(element: ReactElement, options?: IDrawerOptions) {
    this.emit(PopupEventNames.OPEN_DRAWER, { id: generateId(), ...options, children: element });
  }

  close(id?: PopupCloseT) {
    this.emit<{ id: PopupCloseT }>(PopupEventNames.CLOSE_DRAWER, { id: id });
  }
}

export const drawerEvent = new DrawerEvent();
