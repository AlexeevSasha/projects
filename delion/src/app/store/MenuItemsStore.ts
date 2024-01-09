import { makeAutoObservable } from 'mobx';
import type { MenuItem } from '@shared/lib';

export class MenuItemsStore {
  public constructor() {
    makeAutoObservable(this);
  }

  private _headerMenuItemsList: MenuItem[] = [];

  public get headerMenuItemsList(): MenuItem[] {
    return this._headerMenuItemsList;
  }

  private _sidebarItemsList: MenuItem[] = [];

  public get sidebarItemsList(): MenuItem[] {
    return this._sidebarItemsList;
  }

  private _sidebarBottomItemsList: MenuItem[] = [];

  public get sidebarBottomItemsList(): MenuItem[] {
    return this._sidebarBottomItemsList;
  }

  public setSidebarBottomItemsList = (value: MenuItem[]) => {
    this._sidebarBottomItemsList = value;
  };

  public setSidebarItemsList = (value: MenuItem[]) => {
    this._sidebarItemsList = value;
  };

  public setHeaderMenuItemsList = (value: MenuItem[]) => {
    this._headerMenuItemsList = value;
  };
}
