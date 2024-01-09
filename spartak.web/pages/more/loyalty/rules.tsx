import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../../public/seo/seoData.json";
import { LoyaltyFieldsdRules } from "../../../src/componentPages/pagesMore/loyaltyFields/loyaltyFiledRules/loyaltyFiledRules";
import { LoyaltyLayout } from "../../../src/componentPages/pagesMore/loyaltyFields/loyaltyLayout";
import { cmsRepository } from "../../../src/api/cmsRepository";
import { getLocalValue } from "../../../src/assets/helpers/getLocalValue";
import { lang } from "../../../public/locales/lang";
import { LocaleType } from "../../../src/api/dto/LocaleType";

export interface ILoyaltyRules {
  info?: {
    description?: LocaleType;
  };
}

export default function LoyaltyCard(props: ILoyaltyRules) {
  return <LoyaltyFieldsdRules info={props?.info} />;
}

LoyaltyCard.getLayout = LoyaltyLayout;

export const getStaticProps: GetStaticProps = async ({ locale = "ru" }) => {
  const res = (await cmsRepository.fetchCms({ Type: "loyaltyRules" })).value[0];
  const loyaltyRules = res?.JsonData ? JSON.parse(res.JsonData) : null;
  return {
    props: {
      title:
        loyaltyRules?.mainInfo?.title ||
        (seodata as Record<string, any>)["/more/loyalty/rules"].h1 ||
        lang[locale].header.navList["more/loyalty/rules"],
      metaTags: loyaltyRules?.metaTags || (seodata as Record<string, any>)["/more/loyalty/rules"] || null,
      bannerSrc:
        getLocalValue(loyaltyRules?.mainInfo?.previewImg, locale) || "/images/loyalty/loyaltyBanner_v1.0.0.png",
      info: loyaltyRules?.info || {},
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
