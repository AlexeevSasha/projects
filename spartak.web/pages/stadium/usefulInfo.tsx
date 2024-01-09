import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import seodata from "../../public/seo/seoData.json";
import { cmsRepository } from "../../src/api/cmsRepository";
import { IStadiumUsefulInfo } from "../../src/api/dto/IStadiumUsefulInfo";
import { getLocalValue } from "../../src/assets/helpers/getLocalValue";
import { StadiumBanner } from "../../src/componentPages/pageStadium/stadiumBanner/stadiumBanner";
import { UsefulInfoComponent } from "../../src/componentPages/pageStadium/usefulInfo/usefulInfo";
import { GetLayout } from "../../src/components/layout/getLayout";

interface IProps {
  usefulInfo?: IStadiumUsefulInfo;
}

export default function UsefulInfo(props: IProps) {
  const { locale = "ru" } = useRouter();
  return (
    <>
      <StadiumBanner
        title={getLocalValue(props.usefulInfo?.mainInfo?.title, locale)}
        banner={
          getLocalValue(props.usefulInfo?.mainInfo?.previewImg, locale) || "/images/stadium/about/banner_v1.0.0.png"
        }
      />
      <UsefulInfoComponent usefulInfo={props.usefulInfo} />
    </>
  );
}
UsefulInfo.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "stadiumUsefulInfo" })).value[0];
  const usefulInfo = res?.JsonData ? JSON.parse(res.JsonData) : null;

  return {
    props: {
      metaTags: usefulInfo?.metaTags || (seodata as Record<string, any>)["/stadium/usefulInfo"] || null,
      usefulInfo,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
