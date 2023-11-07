import { MonthTinkoff } from "./paymentTinkoff";

export const tinkoffConditionss = [
  {
    icon: "/tinkoff/1.png",
    title: "Вы заполняете анкету онлайн. Нужен действующий номер телефона и паспорт",
  },
  {
    icon: "/tinkoff/2.png",
    title: "Моментально получаете решение банка",
  },
  {
    icon: "/tinkoff/3.png",
    title: "Подтверждаете рассрочку через Face ID или в офисе",
  },
  {
    icon: "/tinkoff/4.png",
    title: "Первый платеж по рассрочке только через 1 месяц.",
  },
];

interface ITinkoffPayment {
  title: string;
  description: string;
  sum: string;
  month: MonthTinkoff;
}

export const tinkofPayment: ITinkoffPayment[] = [
  {
    title: "Рассрочка на 3 месяца",
    description: "Без переплаты и первого взноса",
    sum: "8 788р. в месяц",
    month: 3,
  },
  {
    title: "Рассрочка на 4 месяца",
    description: "Без переплаты и первого взноса",
    sum: "6 654р. в месяц",
    month: 4,
  },
  {
    title: "Рассрочка на 6 месяца",
    description: "Без переплаты и первого взноса",
    sum: "4 478р. в месяц",
    month: 6,
  },
  {
    title: "Рассрочка на 10 месяца",
    description: "Без переплаты и первого взноса",
    sum: "2 788р. в месяц",
    month: 10,
  },
];
