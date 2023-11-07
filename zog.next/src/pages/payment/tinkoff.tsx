import Head from "next/head";
import React from "react";
import { tinkoffConditionss } from "../../modules/payment/constants/tinkoffDetails";
import cls from "../../styles/tinkoff.module.css";
import dynamic from "next/dynamic";

const PaymentTinkoffWithNoSSR = dynamic(
  () => import("../../modules/payment/component/paymentTinkoff"),
  {
    ssr: false,
  }
);

export default function TinkoffPage() {
  return (
    <>
      <Head>
        <title>Страница оплаты для Личной диагностики</title>
        <meta name="description" content="Страница оплаты для Личной диагностики" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"mt-10 flex flex-wrap justify-center gap-10 p-5"}>
        <div>
          <h1 className={" text-center text-2xl font-bold"}>
            Как работает беспроцентная рассрочка без первого взноса?
          </h1>
          <div className={cls.grid}>
            {tinkoffConditionss.map((el, i) => {
              const arrowCls = i == 1 ? cls.secondArrow : i == 2 ? cls.thirdArrow : "";
              return (
                <div className={`${cls.container} ${i == 2 ? cls.third : ""}`} key={i}>
                  <img className={cls.icon} src={el.icon} alt="tinkoff" />
                  <div className={cls.title}>{el.title}</div>
                  {tinkoffConditionss.length - 1 !== i && (
                    <img
                      className={`${cls.arrow} ${arrowCls}`}
                      src={"/tinkoff/arrow.png"}
                      alt={"arrow"}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <PaymentTinkoffWithNoSSR />
        </div>
      </main>
    </>
  );
}
