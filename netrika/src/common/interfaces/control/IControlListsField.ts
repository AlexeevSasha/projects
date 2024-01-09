export interface IControlListsFields {
  id: number;
  parentId: number;
  userId: number;
  fields: IControlListsFieldsItem[];
}
export interface IControlListsFieldsItem {
  id: number;
  name: string;
  isVisible: boolean;
}
