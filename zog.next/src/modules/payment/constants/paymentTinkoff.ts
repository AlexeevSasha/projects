import tinkoff from "@tcb-web/create-credit";

export type MonthTinkoff = 3 | 4 | 6 | 10;

const getPercent = (months: MonthTinkoff) => {
  let promo = "default";
  let percent = 0;
  switch (months) {
    case 3:
      promo = "installment_0_0_3_4";
      percent = 1014;
      break;
    case 4:
      promo = "installment_0_0_4_4,5";
      percent = 1268;
      break;
    case 6:
      promo = "installment_0_0_6_6,5";
      percent = 1521;
      break;
    case 10:
      promo = "installment_0_0_10_10";
      percent = 2535;
      break;
  }

  return { promo, percent };
};

export const paymentTinkoff = (months: MonthTinkoff) => {
  const { promo, percent } = getPercent(months);
  // webhookURL: `${process.env.NEXT_PUBLIC_DEFAULT_URL}api/payment/tinkoff`,
  // successURL: `${process.env.NEXT_PUBLIC_DEFAULT_URL}redirect/tinkoff`,

  tinkoff.create({
    shopId: "7f885d25-38a1-43f4-9af1-3dae0dd16c1e",
    showcaseId: "37add0a2-621a-4cdc-a583-120ef7f3ef0d",
    orderNumber: Math.random().toString(36),
    promoCode: promo,
    items: [{ name: "Личная диагностика", price: 25350 + percent, quantity: 1 }],
    sum: 25350 + percent,
  });
};
