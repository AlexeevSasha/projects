import Head from "next/head";
import React from "react";
import { Payment } from "../../modules/payment/component/payment";
import { GetServerSideProps } from "next";
import { IPaymentBanner } from "../../modules/payment/interfaces/Payment";
import axios from "axios";

interface IProps {
  utm: string;
  form: string;
  paymentList: IPaymentBanner[];
}

export default function PaymentForeignPage({ utm, form, paymentList }: IProps) {
  return (
    <>
      <Head>
        <title>Страница оплаты для Личной диагностики</title>
        <meta name="description" content="Страница оплаты для Личной диагностики" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"mt-10 flex flex-wrap justify-center gap-10 p-5"}>
        {paymentList.map((el) => (
          <Payment.PaymentBannerCard key={el.id} paymentBanner={el} utm={utm} form={form} />
        ))}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const paymentList = await axios
    .get(`${process.env.NEXTAUTH_URL}/api/upload/payment/get?system=stripe`)
    .then((res) => res.data.data.paymentBanners);

  return { props: { utm: query.utm || "", form: query.form || "", paymentList } };
};
