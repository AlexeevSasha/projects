import { GetStaticProps } from "next";
import { lang } from "../../../public/locales/lang";
import seodata from "../../../public/seo/seoData.json";
import { LoyaltyFieldsCard } from "../../../src/componentPages/pagesMore/loyaltyFields/loyaltyFieldsCard/loyaltyFieldsCard";
import { LoyaltyLayout } from "../../../src/componentPages/pagesMore/loyaltyFields/loyaltyLayout";

export type LoyaltyCardDataType = {
  newConditions: {
    title: string;
    text1: string;
    buttonText: string;
    text2: string;
    list: { text: string; label?: string }[];
    buttonLink: string;
  };
};

type Props = {
  data: LoyaltyCardDataType;
};

export default function LoyaltyCard({ data }: Props) {
  return <LoyaltyFieldsCard {...data} />;
}

LoyaltyCard.getLayout = LoyaltyLayout;

export const getStaticProps: GetStaticProps = async ({ locale = "ru" }) => {
  const data = require(`../../../public/mockJSON/loyalty/${locale}/loyaltyCard.json`);

  return {
    props: {
      title: (seodata as Record<string, any>)["/more/loyalty/card"].h1 || lang[locale].header.navList["cardSpartak"],
      metaTags: (seodata as Record<string, any>)["/more/loyalty/card"] || data.metaTags || null,
      bannerSrc: "/images/loyalty/loyaltyBanner_v1.0.0.png",
      data,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
