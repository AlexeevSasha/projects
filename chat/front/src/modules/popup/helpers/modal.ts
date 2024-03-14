import { EventBusNamesEnum } from "@/modules/popup/interfaces/eventBusNames";
import { generateId } from "@/common/helpers/generateId";
import { EventBus } from "@/modules/popup/helpers/eventBus";
import { IModal } from "@/modules/popup/interfaces/modal";

class Modal extends EventBus<IModal> {
  constructor() {
    super();
  }

  open(details: Omit<IModal, "id">) {
    this.emit(EventBusNamesEnum.OPEN_MODAL, { id: generateId(), ...details });
  }

  close(id: string) {
    this.emit<{ id: string }>(EventBusNamesEnum.CLOSE_MODAL, { id });
  }
}

export const modal = new Modal();
