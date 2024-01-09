import React from "react";
import MainBannerWithTitle from "../../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { GetStaticProps } from "next";
import seodata from "../../../public/seo/seoData.json";
import { GetLayout } from "../../../src/components/layout/getLayout";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { useRouter } from "next/router";
import { IFanCard } from "../../../src/api/dto/IFanCard";
import { FanCardDescription } from "../../../src/componentPages/pageTickets/info/fanCard/fanCardDescription";
import styled from "styled-components";
import { theme } from "../../../src/assets/theme/theme";

interface IProps {
  data: IFanCard;
}
export default function FanCard({ data }: IProps) {
  const { locale = "ru" } = useRouter();
  return (
    <>
      <BannerContainer>
        <MainBannerWithTitle
          banner={"/images/tickets/fanCard/fanCardBanner.png" ?? null}
          title={getLocalValue(data.title, locale)}
          className={"fanCardBanner"}
        />
      </BannerContainer>

      <FanCardDescription data={data} />
    </>
  );
}

FanCard.getLayout = GetLayout;
export const getStaticProps: GetStaticProps = async () => {
  const data = require("../../../public/mockJSON/ticketsInfo/fanCard.json");

  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/tickets/fanCard"] || null,
      data,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};

const BannerContainer = styled.article`
  h1 {
    padding-bottom: 4.17vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding-bottom: 5.22vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding-bottom: 0;
    }
  }

  article {
    height: 31.25vw;
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      height: 44.33vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      height: 42.66vw;
    }
  }
`;
