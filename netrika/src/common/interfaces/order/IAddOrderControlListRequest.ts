import { IFilter } from "../IFilter";

export interface IAddOrderControlListRequest {
  name: string;
  orderId: number;
  description: string;
  filters: IFilter[];
}
