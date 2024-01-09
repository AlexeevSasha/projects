export interface IOrders {
  page: number;
  maxPage: number;
  list: IOrder[];
}

export interface IOrder {
  create_at: string;
  id: string;
  num: string;
  price: string;
  status: string;
  statusId: string;
}

export interface IOrderDetails {
  order: {
    basket: IOrderBasket[];
    can_canceled: boolean;
    canceled: boolean;
    create_at: string;
    delivery: IOrderDelivery;
    id: string;
    num: string;
    pay: IOrderPay;
    payed: boolean;
    personal: IOrderPersonal[];
    price: string;
    shipped: boolean;
    status: string;
    statusId: string;
  };
}

export interface IOrderBasket {
  code: string;
  files: IBasketFile[];
  offerId: string;
  price: string;
  priceSum: string;
  props: IBasketProps[] | boolean;
  quantity: string;
  title: string;
}

interface IBasketFile {
  src: string;
  type: string;
}

interface IBasketProps {
  label: string;
  value: string;
  code: string;
}

interface IOrderDelivery {
  summ: string;
  title: string;
}

interface IOrderPay {
  link: string;
  summ: string;
  title: string;
}

export interface IOrderPersonal {
  label: string;
  value: string;
}
