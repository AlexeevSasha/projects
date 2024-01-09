import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { lang } from "../../../public/locales/lang";
import seodata from "../../../public/seo/seoData.json";
import { abonementRepository } from "../../../src/api/abonementRepository";
import { ISubscription } from "../../../src/api/dto/ISubscription";
import { LocaleType } from "../../../src/api/dto/LocaleType";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { CardServices } from "../../../src/componentPages/pageServices/cardServices/cardServices";
import { GetLayout } from "../../../src/components/layout/getLayout";
import MainBannerWithTitle from "../../../src/components/mainBannerWithTitle/MainBannerWithTitle";

interface IProps {
  subscriptions?: ISubscription[];
  title: string | LocaleType;
}

export default function AbonementsFiestPage(props: IProps) {
  const { locale = "ru" } = useRouter();

  const columnsData = props.subscriptions?.map((subscription: ISubscription) => {
    return {
      cardName: subscription.ShortName,
      path: subscription.Id,
      cardDescription: subscription.FullName,
      photo: subscription.PreviousImageUrl,
    };
  });

  return (
    <>
      <MainBannerWithTitle
        title={typeof props.title === "object" ? getLocalValue(props.title, locale) : props.title}
        banner={"/images/services/ServicesBanner_v1.0.0.png"}
      />
      <CardServices servicesData={columnsData} defaultUrl={"/more/subscriptions/"} />
    </>
  );
}

AbonementsFiestPage.getLayout = GetLayout;

export const getServerSideProps: GetServerSideProps = async ({ locale = "ru", res }) => {
  res.setHeader("Cache-Control", `public, s-maxage=${process.env.NEXT_PUBLIC_REVALIDATE}, stale-while-revalidate=59`);
  const subscriptions = await abonementRepository.fetchSaleEnabledAbonements();

  return {
    props: {
      title: (seodata as Record<string, any>)["/more/subscriptions"].h1 || lang[locale].more.subscriptions.title,
      metaTags: (seodata as Record<string, any>)["/more/subscriptions"] || null,

      subscriptions: subscriptions.value || [],
    },
  };
};
