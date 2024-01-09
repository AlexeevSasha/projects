import { PopupEvent } from "./popupEvent";
import { ReactElement } from "react";
import { PopupEventEnum } from "../../interfaces/popup/PopupEventEnum";
import { generateId } from "../generateId";
import { IBaseModal } from "../../interfaces/popup/IModal";
import { IPopupClose } from "../../interfaces/popup/IPopup";

class ModalEvent extends PopupEvent<IBaseModal> {
  openModal(element: ReactElement, options?: Pick<IBaseModal, "closePrevious">) {
    this.emit(PopupEventEnum.OPEN_MODAL, { id: generateId(), ...options, children: element });
  }

  closeModal(id?: IPopupClose["id"], timeout: IPopupClose["timeout"] = true) {
    this.emit<IPopupClose>(PopupEventEnum.CLOSE_MODAL, { id, timeout });
  }

  openDrawer(element: ReactElement, options?: Pick<IBaseModal, "closePrevious">) {
    this.emit(PopupEventEnum.OPEN_DRAWER, { id: generateId(), ...options, children: element });
  }

  closDrawer(id?: IPopupClose["id"], timeout: IPopupClose["timeout"] = true) {
    this.emit<IPopupClose>(PopupEventEnum.CLOSE_DRAWER, { id, timeout });
  }
}

export const modalEvent = new ModalEvent();

export const modal = {
  open: modalEvent.openModal.bind(modalEvent),
  close: modalEvent.closeModal.bind(modalEvent),
};

export const drawer = {
  open: modalEvent.openDrawer.bind(modalEvent),
  close: modalEvent.closDrawer.bind(modalEvent),
};
