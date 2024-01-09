import { GetStaticProps } from "next";
import React from "react";
import seodata from "../../public/seo/seoData.json";
import { cmsRepository } from "../../src/api/cmsRepository";
import { IClubHistory } from "../../src/api/dto/IClubHistory";
import { HistoryEmblem } from "../../src/componentPages/pageClub/pageHistory/historyEmblem";
import { BannerHistory } from "../../src/componentPages/pageClub/pageResults/bannerHistory";
import { GetLayout } from "../../src/components/layout/getLayout";
import { NoData } from "../../src/components/noData/noData";

interface IProps {
  history?: IClubHistory;
}

export default function History(props: IProps) {
  return (
    <>
      <BannerHistory mainInfo={props.history?.mainInfo} />
      {props.history ? <HistoryEmblem historyData={props.history} /> : <NoData />}
    </>
  );
}

History.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "clubHistory" })).value[0];
  const history = res?.JsonData ? JSON.parse(res.JsonData) : null;

  return {
    props: {
      metaTags: history?.metaTags || (seodata as Record<string, any>)["/club/history"] || null,
      history,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX),
  };
};
