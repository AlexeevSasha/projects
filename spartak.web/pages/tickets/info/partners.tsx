import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import seodata from "../../../public/seo/seoData.json";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { theme } from "../../../src/assets/theme/theme";
import { PartnersDropdown } from "../../../src/componentPages/pageTickets/info/partners/partnersDropdown";
import { GetLayout } from "../../../src/components/layout/getLayout";
import MainBannerWithTitle from "../../../src/components/mainBannerWithTitle/MainBannerWithTitle";

export interface ITicketsPartners {
  image: string;
  info: string;
  partnerUrl: string;
  partnerName: string;
}

interface IProps {
  title: string;
  partnersData?: ITicketsPartners[];
}

export default function Partners(props: IProps) {
  const { locale = "ru" } = useRouter();
  return (
    <>
      <StyledBanner
        banner={"/images/tickets/partners/banner_v1.0.0.png" ?? null}
        title={getLocalValue(props.title, locale) || ""}
      />

      <PartnersDropdown partnersData={props.partnersData} />
    </>
  );
}

Partners.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async ({ locale = "ru" }) => {
  const partnersData = require(`../../../public/mockJSON/ticketsInfo/partners/${locale}.json`);

  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/tickets/partners"] || null,
      title: (seodata as Record<string, any>)["/tickets/partners"].h1 || null,
      partnersData,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};

const StyledBanner = styled(MainBannerWithTitle)`
  h1 {
    padding: 13.54vw 12.5vw 4.17vw 8.75vw;
    width: 100%;
    line-height: 6.77vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding: 16.95vw 3.13vw 0 3.13vw;
      line-height: 11.73vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding: 40vw 4.27vw 0;
      line-height: 13.33vw;
    }
  }
`;
