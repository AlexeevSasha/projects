export interface IPaginateItems<T> {
  items: T;
  totalCount: number;
}

export interface IDisplayFieldItem {
  id: number;
  bizObjName: string;
  registerFieldDescription: string;
  tableName: string;
}

export interface ICreateDisplayField {
  dictionaryName?: string;
  registerFieldId: number;
  dictionaryDisplayFields?: IDictionaryDisplayFieldDrag[];
}

export interface IDictionaryDisplayFieldDrag {
  tableField: string;
  isList: boolean;
  isKey: boolean;
  orderNumber: number;
}

export interface IDictionaryDisplayFieldForEdit {
  bizObjId: number;
  bizObjName: string;
  description: string;
  id: number;
  name: string;
  tableName: string;
}
