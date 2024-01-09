import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { getLocalValue } from "../../../../src/assets/helpers/getLocalValue";
import { CardServices } from "../../../../src/componentPages/pageServices/cardServices/cardServices";
import { StadiumBanner } from "../../../../src/componentPages/pageStadium/stadiumBanner/stadiumBanner";
import { GetWebViewLayout } from "../../../../src/components/layout/getWebViewLayout";

interface IProps {
  dataJSON: any;
}

export default function Services({ dataJSON }: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <StadiumBanner
        title={getLocalValue(dataJSON?.mainInfo?.title, locale)}
        banner={getLocalValue(dataJSON?.mainInfo?.img, locale)}
        isWebView
      />
      <CardServices servicesData={dataJSON?.servicesData} webViewPrefix="/webView" />
    </>
  );
}

Services.getLayout = GetWebViewLayout;

export const getStaticProps: GetStaticProps = async () => {
  const dataJSON = require("../../../../public/mockJSON/services.json");

  return {
    props: {
      dataJSON,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
  };
};
