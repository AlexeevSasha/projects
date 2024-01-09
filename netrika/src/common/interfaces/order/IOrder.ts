import { IValue } from "common/interfaces/ValueDto.g";
import { IBaseOrder } from "./IBaseOrder";
import { OrderTriggerEnum } from "./OrderTriggerEnum";

export interface IOrder extends IBaseOrder {
  idRegisterGroup: number;
  idUser: number;
  userName: string;
  userGroups: IValue[];
  vimisSystem: { id: number; name: string }[];
  userWorkPosition: IValue[];
  networkId: number | null;
  networkName: string | null;
  profiles: number[];
  actions?: OrderTriggerEnum[];
}
