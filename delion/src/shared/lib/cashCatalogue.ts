class CashCatalogue {
  private _map;
  public loaded = false;
  constructor() {
    this._map = new Map<string, Option[]>();
  }

  public get(id: string) {
    return this._map.get(id);
  }

  public set(id: string, option: Option[]) {
    this._map.set(id, option);
  }
}

export const cashCatalogue = new CashCatalogue();
