export type UserOrderT = {
  id: string;
  status: string;
  createdOn: string;
  updatedOn: string;
  price: number;
  cancellable: boolean;
  items: OrdersItemsT[];
  deliveryDetails: {
    title: string;
    details: string;
    buyerName: string;
    buyerPhone: string;
    buyerEmail: string;
    deliveryDate: string;
    deliveryTime: string;
  };
  paymentDetails: {
    paid: boolean;
    paymentComment: string;
  };
};

export type OrdersItemsT = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  discount: number;
  subtotal: number;
};
