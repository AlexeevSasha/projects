import { UserAddressT } from "../../profile/interfaces/userAddress";
import { PharmaciesT } from "../../profile/interfaces/pharmacies";

export type OrderT = {
  typeOfDelivery: TypeOfDeliveryT;
  selfAddress: PharmaciesT;
  userAddress: UserAddressT;
};

export type TypeOfDeliveryT = "courier" | "self";
export type TypeOfPayment = "card-online" | "self";

export type DeliveryTimeT = {
  label: string;
  value: string;
  timeline: {
    label: string;
    value: string;
  }[];
};
