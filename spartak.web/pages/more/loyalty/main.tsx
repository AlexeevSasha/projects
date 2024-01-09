import { GetStaticProps } from "next";
import React from "react";
import { lang } from "../../../public/locales/lang";
import seodata from "../../../public/seo/seoData.json";
import { LoyaltyFieldsMain } from "../../../src/componentPages/pagesMore/loyaltyFields/loyaltyFiledsMain/loyaltyFieldsMain";
import { LoyaltyLayout } from "../../../src/componentPages/pagesMore/loyaltyFields/loyaltyLayout";
import { cmsRepository } from "../../../src/api/cmsRepository";
import { LocaleType } from "../../../src/api/dto/LocaleType";

export type LoyaltyMainDataType = {
  whoMembersLoyalty: { title: string; text1: string; items: { title: string; linkText: string; text: string }[] };
  whatIsDenary: {
    title: string;
    text1: string;
    text2: string;
    items: { title: string; linkText1?: string; linkText2?: string; text1: string; text2?: string }[];
  };
  userLevels: {
    title: string;
    headerItems: { title: string }[];
    rows: { value: string[] }[];
    additionalText: string;
    bottomText: string;
    list: { title: string }[];
  };
  gettingDenary: {
    title: string;
    teams1: string[];
    teams2: string[];
    teams3: string[];
    text1: string;
    text2: string;
  };
  spendingDenary: {
    title: string;
    items: { title: string; linkText: string; text: string }[];
  };
};
export interface Offers {
  partnersOffers: {
    description: LocaleType;
    image: LocaleType;
  }[];
}
type Props = {
  data: LoyaltyMainDataType;
  offers: Offers;
};

export default function LoyaltyMain(props: Props) {
  return <LoyaltyFieldsMain {...props} />;
}

LoyaltyMain.getLayout = LoyaltyLayout;

export const getStaticProps: GetStaticProps = async ({ locale = "ru" }) => {
  const data = require(`../../../public/mockJSON/loyalty/${locale}/loyaltyMain.json`);
  const res = (await cmsRepository.fetchCms({ Type: "loyaltyPartnersOffers" })).value[0];
  const offers = res?.JsonData ? JSON.parse(res.JsonData) : null;
  return {
    props: {
      title:
        (seodata as Record<string, any>)["/more/loyalty/main"].h1 || lang[locale].header.navList["more/loyalty/main"],
      metaTags: (seodata as Record<string, any>)["/more/loyalty/main"] || data.metaTags || null,
      bannerSrc: "/images/loyalty/loyaltyBanner_v1.0.0.png",
      offers,
      data,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
