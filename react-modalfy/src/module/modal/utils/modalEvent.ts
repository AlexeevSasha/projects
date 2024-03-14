import { generateId } from "@/common/utils/generateId";
import { IModal, IModalOptions } from "@/module/modal/interfaces/modal";
import { ReactElement } from "react";
import { PopupEvent } from "@/common/utils/popuEvent";
import { PopupEventNames } from "@/common/interfaces/popupEventNames";

class ModalEvent extends PopupEvent<IModal> {
  constructor() {
    super();
  }

  open(element: ReactElement, options?: IModalOptions) {
    this.emit(PopupEventNames.OPEN_MODAL, { id: generateId(), ...options, children: element });
  }

  close(id: string) {
    this.emit<{ id: string }>(PopupEventNames.CLOSE_MODAL, { id });
  }
}

export const modalEvent = new ModalEvent();
