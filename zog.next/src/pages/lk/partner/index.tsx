import Head from "next/head";
import { Layout } from "../../../modules/layout/components/layout";
import { Partner } from "../../../modules/partner/components/partner";
import { TabSwitch } from "../../../common/components/tabSwitch/tabSwitch";
import { partnerTabs } from "../../../modules/partner/constants/partnerTabs";
import { GetServerSideProps } from "next";
import axios from "axios";
import { UserPartnerInfoT } from "../../../modules/user/interfaces/UserT";
import { PaysSubPartnerT } from "../../../modules/user/interfaces/PaysSubPartnerT";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  user: UserPartnerInfoT;
  paysSubPartner: PaysSubPartnerT[];
}

export default function LKPage({ user, paysSubPartner }: IProps) {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  return (
    <>
      <Head>
        <title>Клиенты - Амрита</title>
        <meta name="description" content="Клиенты - Амрита" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col justify-center gap-12 px-4 py-16 ">
          <Partner.PartnerLink user={user} />
          <div className={" mt-1 grid shadow-md"}>
            <div className={"overflow-auto"}>
              <div className="card lg:card-side card-compact">
                <div className="card-body">
                  <TabSwitch tabs={partnerTabs(lang, user, paysSubPartner)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

LKPage.getLayout = Layout.Auth;
LKPage.auth = {
  roles: ["Partner"],
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const options = { headers: { cookie: req.headers.cookie } };
  const user = await axios
    .get(`${process.env.NEXTAUTH_URL}/api/users/getFullPartner`, options)
    .then((response) => response.data)
    .catch((error) => error.response?.data);

  return {
    props: { user: user?.data.user || {}, paysSubPartner: user?.data.paysSubPartner || [] },
  };
};
