import Head from "next/head";
import { Layout } from "../../../modules/layout/components/layout";
import { GetServerSideProps } from "next";
import { TabSwitch } from "../../../common/components/tabSwitch/tabSwitch";
import { settingsTabs } from "../../../modules/user/constants/settingsTabs";
import axios from "axios";
import { IBanner } from "../../../modules/banner/interfaces/banner";
import { resetServerContext } from "react-beautiful-dnd";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";
import { IPaymentBanner } from "../../../modules/payment/interfaces/Payment";

interface IProps {
  banners: IBanner[];
  paymentBanners: IPaymentBanner[];
}

export default function SettingsPage({ banners, paymentBanners }: IProps) {
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>Настройки - Амрита</title>
        <meta name="description" content="Настройки - Амрита" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={" mt-1 grid shadow-md"}>
          <div className={"overflow-auto"}>
            <div className="card lg:card-side card-compact">
              <div className="card-body">
                <TabSwitch
                  tabs={settingsTabs(getLanguage(locale), banners, paymentBanners || [])}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

SettingsPage.getLayout = Layout.Auth;
SettingsPage.auth = {
  roles: ["Admin"],
};

export const getServerSideProps: GetServerSideProps = async () => {
  const [banners, paymentBanners] = await Promise.allSettled([
    axios
      .get(`${process.env.NEXTAUTH_URL}/api/upload/banner/getBanner`)
      .then((response) => response.data.data.banners),
    axios
      .get(`${process.env.NEXTAUTH_URL}/api/upload/payment/get`)
      .then((response) => response.data.data.paymentBanners),
  ]);

  resetServerContext();

  return {
    props: {
      banners: banners.status === "fulfilled" ? banners.value : [],
      paymentBanners: paymentBanners.status === "fulfilled" ? paymentBanners.value : [],
    },
  };
};
