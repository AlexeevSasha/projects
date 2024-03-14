import { ActionPopup, IActionPopupParams } from "@/common/utils/actionPopup";
import cls from "@/module/drawer/components/drawer.module.scss";
import clsPopup from "@/styles/popup.module.scss";
import { IDrawer } from "@/module/drawer/interfaces/drawer";
import { Drawer } from "@/module/drawer/components/Drawer";

export class ActionDrawer extends ActionPopup {
  constructor(params: IActionPopupParams) {
    super({ ...params, remove: (id) => this.removeById(id) });
    this.handlerAdd = this.handlerAdd.bind(this);
    this.handlerRemove = this.handlerRemove.bind(this);
  }

  protected removeById(id: string) {
    const modals = document.querySelector(`[data-id="modalfy-drawer-${id}"]`);
    [...modals.children].forEach((el) => {
      const position = el.getAttribute("data-position");
      el.classList.add(position ? cls[position + "Close"] : clsPopup.backdropClose);
    });
  }

  private add(details: IDrawer) {
    const map = this.popups;
    const { children, position, ...attr } = details;
    map.set(
      details.id,
      <Drawer key={details.id} {...attr} position={position || "left"}>
        {children}
      </Drawer>,
    );
    this.setPopups("drawer", map);
  }

  handlerAdd({ detail }: { detail: IDrawer }) {
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
