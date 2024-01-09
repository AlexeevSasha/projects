import { OrderStatusEnum } from "../order/OrderStatusEnum";

export interface IRegister {
  id: number;
  groupId: number;
  orderId: number;
  name: string;
  groupName: string;
  userName: string;
  description: string;
  orderStatus: OrderStatusEnum;
  tableName: string;
  createdAt: Date | string;
  lastUpdate: Date | string;
  isArchive: boolean;
  registerStatusName: string;
  registerStatusDescription: string;
}
