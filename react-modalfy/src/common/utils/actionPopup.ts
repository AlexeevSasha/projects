import { IPopupParam, IRootPopup, PopupCloseT, PopupT } from "@/common/interfaces/popup";

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
  private readonly type: Params["type"];
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
    for (const [id] of this.popups) {
      this.remove(id);
    }
    this.popups.clear();
  }

  handlerRemove({ detail }: { detail: { id: PopupCloseT } }) {
    const id = detail.id || Array.from(this.popups.keys()).pop();
    if (id === "all") {
      this.removeAll();
    } else {
      this.remove(id);
      this.popups.delete(id);
    }
    const map = this.popups;
    setTimeout(() => this.setPopups(this.type, map), 240);
  }
}
