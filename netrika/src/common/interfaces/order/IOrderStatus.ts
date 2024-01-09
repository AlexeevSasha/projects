import { OrderStatusEnum } from "./OrderStatusEnum";

export interface IOrderStatus {
  orderStatus: OrderStatusEnum;
  orderName: string;
}
