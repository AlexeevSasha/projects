import { EventBus } from "@/modules/popup/utils/eventBus";
import { IDrawer } from "@/modules/popup/interfaces/drawer";
import { EventBusNamesEnum } from "@/modules/popup/interfaces/eventBusNames";
import { generateId } from "@/common/utils/generateId";

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

const drawer = new Drawer();

export { drawer };
