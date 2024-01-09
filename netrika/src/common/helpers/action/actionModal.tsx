import React from "react";
import { ActionPopup, IActionPopupParams } from "./actionPopup";
import { IBaseModal } from "../../interfaces/popup/IModal";
import { ModalBase } from "../../components/Popup/components/ModalBase";

export class ActionModal extends ActionPopup {
  constructor(params: IActionPopupParams) {
    super({ ...params, remove: (id) => this.removeById(id) });
    this.handlerAdd = this.handlerAdd.bind(this);
    this.handlerRemove = this.handlerRemove.bind(this);
  }

  private removeById(id: string) {
    const modals = document.querySelector(`[data-id="modalfy-modal-${id}"]`);
    if (!modals?.children) return;

    Array.from(modals.children).forEach((el, i) => {
      if (!(el instanceof HTMLElement)) return;
      if (this.type === "modal") {
        el.style.animation = !i
          ? "closePopupModal 0.3s ease-out forwards"
          : "closePopupBackdrop 0.3s ease-in-out forwards";
      }
      if (this.type === "drawer") {
        const position = el.getAttribute("data-position") || "right";
        const name = position[0].toUpperCase() + position.slice(1);
        el.style.animation = !i
          ? `close${name}Drawer 0.3s ease-in-out forwards`
          : "closePopupBackdrop 0.3s ease-in-out forwards";
      }
    });
  }

  private add(details: IBaseModal) {
    const map = this.popups;
    const { children, ...attr } = details;
    map.set(
      details.id,
      <ModalBase key={details.id} {...attr}>
        {children}
      </ModalBase>
    );
    this.setPopups(this.type, map);
  }

  handlerAdd({ detail }: { detail: IBaseModal }) {
    if (detail.closePrevious) {
      this.removeAll();
      setTimeout(() => {
        this.add(detail);
      }, 240);
    } else {
      this.add(detail);
    }
  }
}
