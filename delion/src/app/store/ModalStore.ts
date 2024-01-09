import { makeAutoObservable, toJS } from 'mobx';

export class ModalStore {
  private _isFeedbackModalOpened: boolean;

  public constructor() {
    this._isFeedbackModalOpened = false;

    makeAutoObservable(this);
  }

  public _status: boolean = false;

  public get status(): boolean {
    return this._status;
  }

  public _type: string = '';

  public get type(): string {
    return this._type;
  }

  public _data: unknown = undefined;

  public get data(): unknown {
    return toJS(this._data);
  }

  public get isFeedbackModalOpened() {
    return this._isFeedbackModalOpened;
  }

  public close = (): void => {
    this._status = false;
    this._type = '';
    this._data = undefined;
  };

  public open = (value: string, data: unknown = undefined): void => {
    this._status = true;
    this._type = value;
    this._data = data;
  };

  public openFeedbackModal() {
    this._isFeedbackModalOpened = true;
  }

  public closeFeedbackModal() {
    this._isFeedbackModalOpened = false;
  }
}
