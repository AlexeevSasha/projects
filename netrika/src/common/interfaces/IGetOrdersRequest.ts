import { ICustomSelect } from "./ISelect";

export interface IGetOrdersRequest
  extends Partial<{
    name: string;
    status: ICustomSelect[];
    userName: string;
    BDate: Date | null;
    EDate: Date | null;
    networkName: ICustomSelect[];
  }> {
  orderColumn: string;
  orderAsc: boolean;
}
