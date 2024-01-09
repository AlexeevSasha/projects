import { IFilter } from "../IFilter";

export interface IOrderControlList {
  id: number;
  orderId: number;
  name: string;
  description: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  filters: IFilter[];
}
