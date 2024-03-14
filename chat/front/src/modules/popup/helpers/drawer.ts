import { IDrawer } from "@/modules/popup/interfaces/drawer";
import { EventBusNamesEnum } from "@/modules/popup/interfaces/eventBusNames";
import { generateId } from "@/common/helpers/generateId";
import { EventBus } from "@/modules/popup/helpers/eventBus";

class Drawer extends EventBus<IDrawer> {
  constructor() {
    super();
  }

  open(details: Omit<IDrawer, "id">) {
    this.emit(EventBusNamesEnum.OPEN_DRAWER, { id: generateId(), ...details });
  }

  close(details: IDrawer) {
    this.emit(EventBusNamesEnum.CLOSE_DRAWER, details);
  }
}

export const drawer = new Drawer();
