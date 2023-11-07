import { CartDeliveryMethod } from "./CartDeliveryMethod";
import { AvailabilityProducts } from "./AvailabilityProducts";
import { PromoCode } from "./PromoCode";
import { CartEmpty } from "./CartEmpty";
import { CartTotalPrice } from "./CartTotalPrice";
import { CartProductSceleton } from "./CartProductSceleton";

const Cart = () => <></>;

Cart.DeliveryMethod = CartDeliveryMethod;
Cart.AvailabilityProducts = AvailabilityProducts;
Cart.CartProductSceleton = CartProductSceleton;
Cart.PromoCode = PromoCode;
Cart.Empty = CartEmpty;
Cart.CartTotalPrice = CartTotalPrice;

export { Cart };
