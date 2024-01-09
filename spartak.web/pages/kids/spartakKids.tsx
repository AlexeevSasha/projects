import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../public/seo/seoData.json";
import { getKidsLayout } from "../../src/componentPages/kids/kidsLayout";
import { SpartakKids } from "../../src/componentPages/kids/spartakKids";
import { cmsRepository } from "../../src/api/cmsRepository";
import { getLocalValue } from "../../src/assets/helpers/getLocalValue";
import { ISpartakKids } from "../../src/api/dto/ISpartakKids";

type Props = {
  spartakKids: ISpartakKids;
};

export default function SpartakKidsPage({ spartakKids }: Props) {
  return <SpartakKids {...spartakKids} />;
}

SpartakKidsPage.getLayout = getKidsLayout;

export const getStaticProps: GetStaticProps = async ({ locale = "ru" }) => {
  const res = (await cmsRepository.fetchCms({ Type: "spartakKids" })).value[0];
  const spartakKids = res?.JsonData ? JSON.parse(res.JsonData) : null;

  return {
    props: {
      title: spartakKids?.mainInfo?.title || (seodata as Record<string, any>)["/more/kids/spartakKids"].h1,
      metaTags: spartakKids?.metaTags || (seodata as Record<string, any>)["/more/kids/spartakKids"] || null,
      bannerSrc: getLocalValue(spartakKids?.mainInfo?.previewImg, locale) || "",
      spartakKids,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
