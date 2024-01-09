import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { abonementRepository } from "../../../src/api/abonementRepository";
import { ISubscription } from "../../../src/api/dto/ISubscription";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { Subscriptions } from "../../../src/componentPages/subscriptions/components/subscriptions";
import { GetLayout } from "../../../src/components/layout/getLayout";
import MainBannerWithTitle from "../../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { Spacer } from "../../../src/components/spacer";
import { CMS } from "../../../src/modules/cms/components/cms";
import { cmsParser } from "../../../src/modules/cms/helpers/cmsParser";

interface IProps {
  subscription?: ISubscription;
}

export default function AbonementsSecondPage(props: IProps) {
  const { locale = "ru" } = useRouter();
  const jsonData = useMemo(() => {
    if (props.subscription) return cmsParser<any>(props.subscription?.JsonData);
  }, [props.subscription]);

  return (
    <>
      {/* Скрипт для метрик конкретного абонемента */}
      <Head>
        {props.subscription?.Id === "be510280-409f-447d-a7e8-a1dfe78193c8" ? (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
    (function (d, w) {
        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://qoopler.ru/index.php?ref="+d.referrer+"&page=" + encodeURIComponent(w.location.href);
        n.parentNode.insertBefore(s, n);
    })(document, window);`,
            }}
          ></script>
        ) : null}
      </Head>
      {/*  */}
      <MainBannerWithTitle
        title={getLocalValue(props.subscription?.FullName, locale)}
        banner={jsonData?.ImageUrl || ""}
      />

      <Spacer height={["2.08vw", "7.82vw", "5.33vw"]} />

      {jsonData?.redBanner ? <CMS.TextOnRedBackground info={jsonData?.redBanner} /> : null}
      {jsonData?.homeMatchList ? (
        <Subscriptions.ListOfHomeMatch
          homeMatchList={jsonData?.homeMatchList}
          isShowButtonBuy={props.subscription?.SaleEnabled}
        />
      ) : null}
      {jsonData?.twoColumnList ? <Subscriptions.TwoColumnList twoColumnList={jsonData?.twoColumnList} /> : null}
      {jsonData?.specialOffers ? <Subscriptions.SpecialOffers specialOffers={jsonData?.specialOffers} /> : null}
      {jsonData?.blockInfo ? <Subscriptions.BlockInfo blockInfo={jsonData?.blockInfo} /> : null}
      {jsonData?.banner ? <Subscriptions.Banner banner={jsonData?.banner} /> : null}
      {jsonData?.table ? <Subscriptions.BlockOfTable blockOfTable={jsonData?.table} /> : null}
      {jsonData?.descriptionBlock ? (
        <Subscriptions.BlockDescription descriptionBlock={jsonData?.descriptionBlock} />
      ) : null}
    </>
  );
}

AbonementsSecondPage.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async (context) => {
  const subscriptionById = await abonementRepository.fetchAbonementsById({ Id: `${context.params?.id}` });

  return {
    props: {
      subscription: subscriptionById.value?.[0] || null,
      metaTags: cmsParser<any>(subscriptionById.value?.[0].JsonData)?.metaTags || null,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: true });
