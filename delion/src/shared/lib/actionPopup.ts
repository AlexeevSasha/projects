import type { ReactNode } from 'react';

export interface IActionPopup {
  type: string;
  popups: Map<string, ReactNode>;
  setPopups: (name: string, popups: Map<string, ReactNode>) => void;
}

export class ActionPopup {
  private readonly _popups: IActionPopup['popups'];
  protected readonly setPopups: IActionPopup['setPopups'];
  protected readonly type: IActionPopup['type'];

  constructor({ setPopups, popups, type }: IActionPopup) {
    this._popups = popups;
    this.setPopups = setPopups;
    this.type = type;
  }

  protected get popups() {
    return this._popups;
  }

  handlerRemove({ detail }: { detail: { id?: string } }) {
    const id = detail.id || Array.from(this.popups.keys()).pop();
    id && this.popups.delete(id);
    this.setPopups(this.type, this.popups);
  }
}
