import { IControlEvent } from "../control/IControlEvent";

export interface IOrderControlEvent extends IControlEvent {
  orderId: number;
}
