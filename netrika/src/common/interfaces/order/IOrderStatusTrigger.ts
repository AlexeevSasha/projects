import { OrderStatusEnum } from "./OrderStatusEnum";
import { OrderTriggerEnum } from "./OrderTriggerEnum";

export interface IOrderStatusTrigger {
  status: OrderStatusEnum;
  trigger: OrderTriggerEnum;
}
