import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../../public/seo/seoData.json";
import { ChairPlottingContent } from "../../../src/componentPages/pagesMore/loyaltyFields/chairPlottingContent";
import { LoyaltyLayout } from "../../../src/componentPages/pagesMore/loyaltyFields/loyaltyLayout";
import { cmsRepository } from "../../../src/api/cmsRepository";
import { LocaleType } from "../../../src/api/dto/LocaleType";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";

export interface IChairPlotting {
  info?: {
    img?: LocaleType;
    description?: LocaleType;
  };
}

export default function ChairPlotting({ info }: IChairPlotting) {
  return <ChairPlottingContent {...info} />;
}

ChairPlotting.getLayout = LoyaltyLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const res = (await cmsRepository.fetchCms({ Type: "chairPlotting" })).value[0];
  const chairPlotting = res?.JsonData ? JSON.parse(res.JsonData) : null;
  return {
    props: {
      title: chairPlotting?.mainInfo?.title || (seodata as Record<string, any>)["/more/loyalty/chairPlotting"].h1,
      bannerSrc:
        getLocalValue(chairPlotting?.mainInfo?.previewImg, locale) || "/images/more/chairPlotting/banner_v1.0.0.png",
      metaTags: chairPlotting?.metaTags || (seodata as Record<string, any>)["/more/loyalty/chairPlotting"] || null,
      info: chairPlotting?.info,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
