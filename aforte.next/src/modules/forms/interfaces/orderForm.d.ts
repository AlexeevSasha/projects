import { UserAddressT } from "../../profile/interfaces/userAddress";
import { TypeOfDeliveryT, TypeOfPayment } from "../../orders/interfaces/order";
import { ProductT } from "../../products/interfaces/product";
import { CartT } from "../../cart/interfaces/cart";
import { PharmaciesT } from "../../profile/interfaces/pharmacies";

export type OrderFormT = {
  user: {
    phone: string;
    name: string;
  };
  typeOfDelivery: TypeOfDeliveryT;
  typeOfPayment: TypeOfPayment;
  pharmacyAddress: PharmaciesT;
  userAddress: UserAddressT;
  deliveryTime: string;
  productOrder: ProductT[];
  cart: CartT;
};
