import { UserAddressT } from "modules/profile/interfaces/userAddress";
import { userAddressMock } from "./mockData/userAddressMock";

export const getUserAddress = async (): Promise<UserAddressT[]> => {
  return userAddressMock;
};
