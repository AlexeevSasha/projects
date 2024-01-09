import { IOrderConfAttribute } from "./IOrderConfAttribute";

export interface IOrderConfSubGroup {
  id: number;
  idOrderConfGroup: number;
  nsiCode: string;
  description: string;
  sort: number;
  isDefault: boolean;
  allAttributes: boolean;
  orderConfAttributes: IOrderConfAttribute[];
}
