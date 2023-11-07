import { Layout } from "../../../modules/layout/components/layout";
import { GetServerSideProps } from "next";
import axios from "axios";
import Head from "next/head";
import { PrimaryOrder } from "../../../modules/primary-order/components/PrimaryOrder";
import { IPrimaryOrder } from "../../../modules/primary-order/interfaces/PrimaryOrder";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  primaryOrder: IPrimaryOrder;
}

export default function PrimaryOrderDetailsPage({ primaryOrder }: IProps) {
  const { locale } = useRouter();
  return (
    <>
      <Head>
        <title>Детальная страница первичной заявки - Амрита</title>
        <meta name="description" content="Детальная страница первичной заявки - Амрита" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className={"mt-4 mb-8 text-2xl"}>
          {getLanguage(locale).primaryOrder.detailed_initial_applications}
        </h1>
        <PrimaryOrder.PrimaryOrderDetails primaryOrder={primaryOrder} />
      </main>
    </>
  );
}

PrimaryOrderDetailsPage.getLayout = Layout.Auth;
PrimaryOrderDetailsPage.auth = true;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const primaryOrder = await axios
    .get(`${process.env.NEXTAUTH_URL}/api/primary-order/getById?id=${params?.id || ""}`)
    .then((response) => response.data.data);

  return {
    props: { primaryOrder },
  };
};
