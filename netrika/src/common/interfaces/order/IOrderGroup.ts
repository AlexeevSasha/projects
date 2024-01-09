import { IOrderListItem } from "./IOrderListItem";

export interface IOrderGroup {
  orders: IOrderListItem[];
  idRegisterGroup: number;
  nameRegisterGroup: string;
}
