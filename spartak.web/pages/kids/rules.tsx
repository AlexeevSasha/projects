import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../public/seo/seoData.json";
import { getKidsLayout } from "../../src/componentPages/kids/kidsLayout";
import { Rules } from "../../src/componentPages/kids/rules";
import { cmsRepository } from "../../src/api/cmsRepository";
import { getLocalValue } from "../../src/assets/helpers/getLocalValue";
import { LocaleType } from "../../src/api/dto/LocaleType";

export interface IKidsRules {
  rules?: LocaleType;
}

export default function RulesPage({ rules }: IKidsRules) {
  return <Rules rules={rules} />;
}

RulesPage.getLayout = getKidsLayout;

export const getStaticProps: GetStaticProps = async ({ locale = "ru" }) => {
  const res = (await cmsRepository.fetchCms({ Type: "kidsRules" })).value[0];
  const kidsRules = res?.JsonData ? JSON.parse(res.JsonData) : null;
  return {
    props: {
      title: kidsRules?.mainInfo?.title || (seodata as Record<string, any>)["/more/kids/rules"].h1,
      metaTags: kidsRules?.metaTags || (seodata as Record<string, any>)["/more/kids/rules"] || null,
      bannerSrc: getLocalValue(kidsRules?.mainInfo?.previewImg, locale),
      rules: kidsRules?.rules || null,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
