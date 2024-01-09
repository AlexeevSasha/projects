import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { ITicketsPremium } from "../../../src/api/dto/ITicketsPremium";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { GetLayout } from "../../../src/components/layout/getLayout";
import { cmsRepository } from "../../../src/api/cmsRepository";
import MainBannerWithTitle from "../../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { CMS } from "../../../src/modules/cms/components/cms";
import { NextImage } from "../../../src/ui/nextImage/nextImage";
import { ContainerContent } from "../../../src/components/containers/containerContent";
import styled from "styled-components";
import { theme } from "../../../src/assets/theme/theme";

interface IProps {
  ticketsPremium: ITicketsPremium;
}

export default function Premium({ ticketsPremium }: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <MainBannerWithTitle
        banner={getLocalValue(ticketsPremium?.mainInfo?.previewImg, locale)}
        title={getLocalValue(ticketsPremium?.mainInfo?.title, locale) || ""}
      />
      <CMS.TextOnRedBackground info={ticketsPremium?.redBanner} />
      <CMS.ImgWithWysiwygInline info={ticketsPremium?.imgWithWysiwygInline || []} />
      <CMS.FoodCourtDescription info={ticketsPremium?.premiumLevel || []} />
      <ContainerContent>
        <StyledPlan>
          <NextImage src={getLocalValue(ticketsPremium?.lodgePlan, locale)} />
        </StyledPlan>
      </ContainerContent>
    </>
  );
}

Premium.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "ticketsPremium" })).value[0];
  let ticketsPremium;
  try {
    ticketsPremium = res?.JsonData ? JSON.parse(res.JsonData) : null;
  } catch (e) {
    console.log("Error on parsing JSON: ", e);
  }

  return {
    props: {
      metaTags: ticketsPremium?.metaTags || null,
      ticketsPremium,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};

const StyledPlan = styled.section`
  height: 26.3vw;
  width: 100%;
  margin-bottom: 5.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;
