export interface IRegisterListItem {
  id: number;
  name: string;
  idGroup: number;
  groupName: string;
  idOrder: number;
  createdAt: Date | string;
  tableName: string;
  lastUpdate: Date | string;
}
