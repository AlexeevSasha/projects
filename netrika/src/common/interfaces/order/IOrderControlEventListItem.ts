import { IControlEventListItem } from "../control/IControlEventListItem";

export interface IOrderControlEventListItem extends IControlEventListItem {
  orderId: number;
}
