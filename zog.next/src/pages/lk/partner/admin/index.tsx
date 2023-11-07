import axios from "axios";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import { Layout } from "../../../../modules/layout/components/layout";
import { PaymentOrderT } from "../../../../modules/partner/interfaces/PaymentOrderT";
import { TabSwitch } from "../../../../common/components/tabSwitch/tabSwitch";
import { adminPartnerTabs } from "../../../../modules/partner/constants/adminPartnerTabs";
import { InvoiceInfoT } from "../../../../modules/partner/interfaces/InvoiceInfoT";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

interface IProps {
  partnerOrderList: PaymentOrderT[];
  partnerList: InvoiceInfoT[];
}

export default function PageClients({ partnerOrderList, partnerList }: IProps) {
  const { locale } = useRouter();
  return (
    <>
      <Head>
        <title>Партнёры - Амрита</title>
        <meta name="description" content="Партнёры - Амрита" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={" mt-1 grid shadow-md"}>
        <div className={"overflow-auto"}>
          <div className="card lg:card-side card-compact">
            <div className="card-body">
              <TabSwitch
                tabs={adminPartnerTabs(getLanguage(locale), partnerList, partnerOrderList)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

PageClients.getLayout = Layout.Auth;
PageClients.auth = {
  roles: ["Admin"],
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const options = { headers: { cookie: req.headers.cookie } };

  const [partnerOrderList, partnerList] = await Promise.allSettled([
    axios.get(`${process.env.NEXTAUTH_URL}/api/payment/getList`, options),
    axios.get(`${process.env.NEXTAUTH_URL}/api/payment/getInfoAllPartners`, options),
  ]);

  return {
    props: {
      partnerOrderList:
        partnerOrderList.status === "fulfilled" ? partnerOrderList.value.data.data : [],
      partnerList: partnerList.status === "fulfilled" ? partnerList.value.data.data : [],
    },
  };
};
