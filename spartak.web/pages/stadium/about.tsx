import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { lang } from "../../public/locales/lang";
import seodata from "../../public/seo/seoData.json";
import { cmsRepository } from "../../src/api/cmsRepository";
import { IAboutStadium } from "../../src/api/dto/IAboutStadion";
import { getLocalValue } from "../../src/assets/helpers/getLocalValue";
import { Achievements } from "../../src/componentPages/pageStadium/achievements/achievements";
import { StadiumBanner } from "../../src/componentPages/pageStadium/stadiumBanner/stadiumBanner";
import { StadiumHistory } from "../../src/componentPages/pageStadium/stadiumHistory/stadiumHistory";
import { StadiumInfo } from "../../src/componentPages/pageStadium/stadiumInfo/stadiumInfo";
import { GetLayout } from "../../src/components/layout/getLayout";
import { NoData } from "../../src/components/noData/noData";

interface IProps {
  stadiumAbout?: IAboutStadium;
}

export default function MuseumAbout(props: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <StadiumBanner
        title={getLocalValue(props.stadiumAbout?.mainInfo?.title, locale) || lang[locale].pageAboutStadium.title}
        banner={
          getLocalValue(props.stadiumAbout?.mainInfo?.previewImg, locale) || "/images/stadium/about/Banner_v1.0.0.png"
        }
      />
      {props.stadiumAbout ? (
        <>
          <StadiumInfo stadiumInfoData={props.stadiumAbout?.characteristic} />
          <Achievements achievementsData={props.stadiumAbout?.achievements} />
          <StadiumHistory stadiumHistoryData={props.stadiumAbout?.stadiumHistory} />
        </>
      ) : (
        <NoData />
      )}
    </>
  );
}

MuseumAbout.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "stadiumAbout" })).value[0];
  const stadiumAbout = res?.JsonData ? JSON.parse(res.JsonData) : null;

  return {
    props: {
      metaTags: stadiumAbout?.metaTags || (seodata as Record<string, any>)["/stadium/about"] || null,
      stadiumAbout,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
