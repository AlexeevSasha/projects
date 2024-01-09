import { IOrderConfGroup } from "./IOrderConfGroup";

export interface IOrderConfBlock {
  id: number;
  description: string;
  isChecked: boolean;
  sort: number;
  orderConfGroups: IOrderConfGroup[];
  isCustom: boolean;
  showGroup: boolean;
  isPreview: boolean;
}
