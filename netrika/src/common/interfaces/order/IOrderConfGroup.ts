import { IOrderConfSubGroup } from "./IOrderConfSubGroup";

export interface IOrderConfGroup {
  id: number;
  idOrderConfBlock: number;
  idConfGroup: number;
  description: string;
  sort: number;
  orderConfSubGroups: IOrderConfSubGroup[];
  isDefault: boolean;
  showSubGroup: boolean;
}
