import { UserOrderT } from "modules/profile/interfaces/userOrders";
import { userOrdersMock } from "./mockData/userOrdersMock";

export const getUserOrders = async (): Promise<UserOrderT[]> => {
  return userOrdersMock;
};

export const getUserOrdersById = async (id: string): Promise<UserOrderT | undefined> => {
  return userOrdersMock.find(item => item.id === id);
};
