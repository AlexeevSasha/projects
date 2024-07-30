import type { FormInstance } from "antd/es";
import { IEvents, ILoyalty, ISectors } from "../../api/dto/loyalty/ILoyalty";
import type { IUploadImg } from "./IUploadImg";

export interface IFirstStep {
  edit: boolean;
  boughtTicket: boolean;
  form: FormInstance;
  imageUrl?: string;
}

export interface ISecondStep {
  data: ILoyalty;
  sectors: ISectors[];
  events: IEvents[];
  availability: string[];
  conditions: string[];
  setConditions: Function;
  edit: boolean;
  allUser: boolean;
  setAllUser: Function;
  allCondition: boolean;
  setAllCondition: Function;
  condition: string;
  setCondition: Function;
  fromFile: boolean;
  setFromFile: Function;
  file: string;
  setFile: Function;
  newUser: boolean;
  setNewUser: Function;
  fullProfile: boolean;
  setFullProfile: Function;
  boughtTicket: boolean;
  setBoughtTicket: Function;
  noCondition: boolean;
  setNoCondition: Function;
  hasConditions: boolean;
  setHasConditions: Function;
}

export interface IThirdStep {
  edit: boolean;
  form: FormInstance;
  freebet: boolean;
  setFreebet: Function;
  freebetFile: string;
  setFreebetFile: Function;
  voucher: boolean;
  setVoucher: Function;
  voucherValue: number;
  setVoucherValue: Function;
  link: boolean;
  setLink: Function;
  externalLink: string;
  setExternalLink: Function;
  buttonText: string;
  setButtonText: Function;
  coupon: boolean;
  setCoupon: Function;
  couponValue: number;
  setCouponValue: Function;
  typeAwardId: string;
  setTypeAwardId: Function;
  setStepCount: Function;
}
