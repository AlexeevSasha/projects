import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { generateQuery } from "../../../common/constants/generateQuery";
import Stripe from "stripe";

interface IProps {
  send: boolean;
  email: string;
}

export default function StripeAfterPay({ send, email }: IProps) {
  const { push } = useRouter();
  return (
    <div className={"mt-10 flex flex-col items-center justify-center"}>
      <div className={"mb-4 inline-block  p-4 text-2xl font-bold"}>Оплата успешно проведена</div>
      {send ? (
        <div className={"inline-block bg-green-300 p-4 "}>
          На вашу почту <i className={"font-bold text-black"}>{email}</i> отправлено{" "}
          <strong>письмо c анектой</strong>
        </div>
      ) : (
        <div className={"inline-block bg-red-400 p-4 "}>
          <strong>Нам не удалось отправить вам письмо, обратитесь к администрации</strong>
        </div>
      )}

      <button onClick={() => push("/")} className={"fond-medium mt-5 bg-blue-400 p-4 text-white"}>
        На главную
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (params) => {
  if (!params?.query?.session_id) return { props: { send: false } };
  const stripe: { data: { data: Stripe.Response<Stripe.Checkout.Session> } } = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/payment/stripe/getById?session_id=${params?.query?.session_id}`
  );

  const details = stripe.data.data;

  const email = details?.customer_details?.email || "";

  const myQuery = generateQuery({ email, ...details?.metadata, id: details?.id });

  const { data } = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/payment/linkAfterPay${myQuery}`
  );

  return {
    props: { send: data.send, email },
  };
};
