import { tinkofPayment } from "../constants/tinkoffDetails";
import React from "react";
import { MonthTinkoff, paymentTinkoff } from "../constants/paymentTinkoff";
import { toast } from "react-toastify";

const PaymentTinkoff = () => {
  const onClick = (month: MonthTinkoff) => {
    paymentTinkoff(month);
    toast.info("Пожалуйста введите Email !!!", {
      position: "top-left",
      theme: "colored",
      autoClose: 10000,
    });
  };

  return (
    <div className={"mt-10 flex flex-col gap-10"}>
      {tinkofPayment.map((el, i) => {
        return (
          <div className={"flex w-full flex-col items-center justify-between md:flex-row"} key={i}>
            <div>
              <h3 className={"text-2xl font-bold"}>{el.title}</h3>
              <span className={"text-sm text-gray-500"}>{el.description}</span>
            </div>
            <div className={"flex items-center gap-6"}>
              <h4 className={"text-lg font-bold"}>{el.sum}</h4>
              <button
                className={
                  "rounded-full bg-green-500 py-3 px-8 font-bold text-white hover:bg-green-700"
                }
                onClick={() => onClick(el.month)}
              >
                Оплатить
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentTinkoff;
