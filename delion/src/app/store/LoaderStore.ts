import { makeAutoObservable } from 'mobx';

export class LoaderStore {
  public constructor() {
    makeAutoObservable(this);
  }

  private _status: boolean = false;

  public get status(): boolean {
    return this._status;
  }

  public setStatus = (value: boolean) => {
    this._status = value;
  };
}
