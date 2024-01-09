import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { CardServices } from "../../../src/componentPages/pageServices/cardServices/cardServices";
import { StadiumBanner } from "../../../src/componentPages/pageStadium/stadiumBanner/stadiumBanner";
import { GetLayout } from "../../../src/components/layout/getLayout";

interface IProps {
  dataJSON: any;
}

export default function Services(props: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <StadiumBanner
        title={getLocalValue(props.dataJSON?.mainInfo?.title, locale)}
        banner={getLocalValue(props.dataJSON?.mainInfo?.img, locale)}
      />
      <CardServices servicesData={props.dataJSON?.servicesData} />
    </>
  );
}

Services.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const dataJSON = require("../../../public/mockJSON/services.json");

  return {
    props: {
      metaTags: dataJSON?.metaTags || null,
      dataJSON,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
