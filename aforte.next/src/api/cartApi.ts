import { cartMock } from "./mockData/cartMock";
import { CartT } from "../modules/cart/interfaces/cart";

export const getCart = async (id: string): Promise<CartT> => {
  return cartMock;
};
