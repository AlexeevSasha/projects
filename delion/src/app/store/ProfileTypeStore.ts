import { makeAutoObservable } from 'mobx';

export class ProfileTypeStore {
  isClient: boolean = typeof window !== 'undefined';

  public constructor() {
    makeAutoObservable(this);
    let profileOrganization = this.isClient ? localStorage.getItem('profileOrganization') : null;
    try {
      if (profileOrganization !== null) profileOrganization = JSON.parse(profileOrganization);
    } catch (e) {
      console.log('ProfileTypeStore, parse organization error: ', e);
    }
  }

  private _isOrg: boolean = false;

  public get isOrg(): boolean {
    return this._isOrg;
  }

  private _type = {};

  public get type(): {} {
    return this._type;
  }

  public setIsOrg = (value: boolean) => {
    this._isOrg = value;
  };
}
