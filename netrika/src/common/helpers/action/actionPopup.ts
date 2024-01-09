import { IPopupClose, IPopupParam, IRootPopup, PopupT } from "../../interfaces/popup/IPopup";

export interface IActionPopupParams {
  type: keyof IRootPopup;
  popups: PopupT;
  setPopups: IPopupParam["setPopupsCb"];
}

interface Params extends IActionPopupParams {
  remove: (id: string) => void;
}

export class ActionPopup {
  private readonly _popups: Params["popups"];
  protected readonly setPopups: Params["setPopups"];
  protected readonly type: Params["type"];
  private readonly remove: Params["remove"];

  constructor({ setPopups, popups, type, remove }: Params) {
    this._popups = popups;
    this.setPopups = setPopups;
    this.remove = remove;
    this.type = type;
  }

  protected get popups() {
    return this._popups;
  }

  protected removeAll() {
    for (const [id] of Array.from(this.popups)) {
      this.remove(id);
    }
    this.popups.clear();
  }

  handlerRemove({ detail }: { detail: IPopupClose }) {
    const id = detail.id || Array.from(this.popups.keys()).pop();
    if (!id) return;

    if (id === "all") {
      this.removeAll();
    } else {
      detail?.timeout && this.remove(id);
      this.popups.delete(id);
    }

    const map = this.popups;
    if (detail?.timeout) {
      setTimeout(() => this.setPopups(this.type, map), 240);
    } else {
      this.setPopups(this.type, map);
    }
  }
}
