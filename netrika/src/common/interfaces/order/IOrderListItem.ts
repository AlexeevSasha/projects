import { OrderTriggerEnum } from "./OrderTriggerEnum";
import { IOrder } from "./IOrder";

export interface IOrderListItem extends IOrder {
  actions: OrderTriggerEnum[];
}
