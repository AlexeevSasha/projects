import { generateId } from "../../../common/constants/generateId";

export const paymentUrl = {
  stripe: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/redirect/stripe`,
  robokassa: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/redirect/robokassa`,
};

export const paymentSystems = [
  {
    id: generateId(),
    urlImg: "stripe.svg",
    price: "60",
    currency: "€",
    link: "https://buy.stripe.com/14kdT97QV4cF8s828c",
    classNameImg: "bg-indigo-500",
    description: "Консультация",
  },
  {
    id: generateId(),
    urlImg: "stripe.svg",
    price: "315",
    currency: "€",
    link: "https://buy.stripe.com/3cs2arefj24xfUAcMR",
    classNameImg: "bg-indigo-500",
    description: "Диагностика и консультация специалиста",
  },
  {
    id: generateId(),
    urlImg: "stripe.svg",
    price: "1400",
    currency: "€",
    link: "https://buy.stripe.com/28o3ev0ot38B37O5kl",
    classNameImg: "bg-indigo-500",
    description: "Личная диагностика и консультация с Олегом Торсуновым",
  },
];
