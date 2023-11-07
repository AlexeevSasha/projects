import { Layout } from "../../modules/layout/components/layout";
import Head from "next/head";
import { GetServerSideProps } from "next";
import axios from "axios";
import { IBanner } from "../../modules/banner/interfaces/banner";
import { Banner } from "../../modules/banner/components/banner";
import Link from "next/link";
import { useRouter } from "next/router";
import { getLanguage } from "../../../public/locales/lang";
import { useSession } from "next-auth/react";
import { linkForeignSite } from "../../common/constants/link";

interface IProps {
  banners: IBanner[];
}

export default function LKPage({ banners }: IProps) {
  const { data } = useSession();
  const { locale } = useRouter();
  const lang = getLanguage(locale);

  return (
    <>
      <Head>
        <title>Главная - Амрита</title>
        <meta name="description" content="Главная - Амрита" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {data?.user?.userRole === "Admin" || data?.user?.userRole === "Consultant" ? (
          <Link className={"mt-2 font-bold text-blue-600"} href={linkForeignSite}>
            {lang.common.link_foreign_site}
          </Link>
        ) : null}
        <div>
          <div className={"mt-5 "}>
            <h1 className="text-4xl">{lang.home.welcome}</h1>
          </div>
          <div className={"mt-5 flex items-center justify-between gap-5"}>
            <Link
              className={
                "whitespace-nowrap  rounded-lg bg-blue-500 p-2 text-white duration-200 hover:bg-blue-700"
              }
              href={"/review"}
            >
              {lang.home.feedback}
            </Link>
          </div>

          <h3 className="mt-5">{lang.home.information_about_consultations}:</h3>
          <a
            href="https://consultation.torsunov.ru/zozh"
            target="_blank"
            rel="noreferrer"
            className="mt-1 block pb-2 text-orange-500"
          >
            &quot;{lang.home.consultation}&quot;
          </a>
          <hr />
          <h3 className="mt-2">{lang.home.questions}:</h3>

          <a
            href="http://t.me/torsunovogbot"
            target="_blank"
            rel="noreferrer"
            className="mt-1 block pb-2 text-orange-500"
          >
            &quot;{lang.home.support_chat}&quot;
          </a>
        </div>
        <hr />
        <div className={"mb-5 mt-5 flex flex-wrap  gap-5"}>
          {banners.map((el) => {
            if (el.access.includes("All") || el.access.includes(data?.user?.userRole || "")) {
              return <Banner.BannerCardLink key={el.id} {...el} />;
            }
            return null;
          })}
        </div>
      </main>
    </>
  );
}

LKPage.getLayout = Layout.Auth;
LKPage.auth = true;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await axios
    .get(`${process.env.NEXTAUTH_URL}/api/upload/banner/getBanner`)
    .then((response) => response.data.data);

  return {
    props: { banners: data?.banners || [] },
  };
};
