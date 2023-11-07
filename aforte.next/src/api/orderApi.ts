import { OrderMock } from "./mockData/orderMock";
import { DeliveryTimeT, TypeOfDeliveryT } from "../modules/orders/interfaces/order";
import { PharmaciesT } from "../modules/profile/interfaces/pharmacies";

export const getTypeOfDelivery = async (): Promise<TypeOfDeliveryT> => {
  return OrderMock.typeOfDelivery;
};

export const getSelfAddress = async (): Promise<PharmaciesT> => {
  return OrderMock.selfAddress;
};

export const getDeliveryTime = async (): Promise<DeliveryTimeT[]> => {
  return OrderMock.deliveryTime;
};
