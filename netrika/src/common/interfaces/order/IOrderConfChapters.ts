import { IOrderConfBlock } from "./IOrderConfBlock";

export interface IOrderConfChapters {
  description: string;
  id: number;
  orderConfBlocks: IOrderConfBlock[];
}
