import { OrderStatusEnum } from "./OrderStatusEnum";

export interface IBaseOrder {
  id: number;
  registerId?: number;
  name: string;
  description?: string;
  creationDate: Date | string;
  status: OrderStatusEnum;
  tableName: string;
  nsi127Column: string;
}
