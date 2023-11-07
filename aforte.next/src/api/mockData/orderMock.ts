import { DeliveryTimeT, OrderT } from "../../modules/orders/interfaces/order";

type OrderMockT = OrderT & {
  deliveryTime: DeliveryTimeT[];
};

export const OrderMock: OrderMockT = {
  typeOfDelivery: "self",
  selfAddress: {
    id: "7dde2ee4-76eb-11e4-af02-00505692789a",
    title: "Димфарм",
    address: "г. Москва, ул. 9-я Парковая, д. 61",
    city: "Москва",
    subway: "",
    mall: "",
    lat: 55.8090617,
    lon: 37.7980787,
    price: 0,
    timeLabel: "доставка до 23.01.2023",
    workingHours: ["Пн-Пт: 09:00-22:00", "Сб-Вс: 09:00-21:00"],
  },
  userAddress: {
    id: "13qwdqwd2",
    street: "115531, г Москва, пр. Просвещения, д. 11, литера А, корпус 2",
    apartment: "кв. 123",
    entrance: "6 подъезд",
    floor: "4 этаж",
    intercom: "",
    description: "",
    isSaveAddress: false,
  },
  deliveryTime: [
    {
      label: "Сб, 14 июня",
      value: "Сб, 14 июня",
      timeline: [
        { value: "09:00 - 12:00", label: "09:00 - 12:00" },
        { value: "12:00 - 16:00", label: "12:00 - 16:00" },
        { value: "16:00 - 20:00", label: "16:00 - 20:00" },
      ],
    },
    {
      label: "ПН, 16 июня",
      value: "ПН, 16 июня",
      timeline: [
        { value: "08:00 - 11:00", label: "08:00 - 11:00" },
        { value: "11:00 - 15:00", label: "11:00 - 15:00" },
        { value: "15:00 - 18:00", label: "15:00 - 18:00" },
        { value: "18:00 - 20:00", label: "18:00 - 20:00" },
      ],
    },
    {
      label: "ВТ, 17 июня",
      value: "ВТ, 17 июня",
      timeline: [
        { value: "08:00 - 11:00", label: "08:00 - 11:00" },
        { value: "11:00 - 15:00", label: "11:00 - 15:00" },
        { value: "15:00 - 18:00", label: "15:00 - 18:00" },
        { value: "18:00 - 20:00", label: "18:00 - 20:00" },
      ],
    },
  ],
};
