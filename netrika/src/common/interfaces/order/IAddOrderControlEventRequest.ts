import { IAddControlEventRequest } from "./IAddControlEventRequest";

export interface IAddOrderControlEventRequest extends IAddControlEventRequest {
  orderId: number;
}
