import { GetStaticProps } from "next";
import seodata from "../../public/seo/seoData.json";
import { cmsRepository } from "../../src/api/cmsRepository";
import { ICLubResults } from "../../src/api/dto/IClubResults";
import { BannerInfo } from "../../src/componentPages/pageAcademy/about/informationMessage/informationMessage";
import { BannerHistory } from "../../src/componentPages/pageClub/pageResults/bannerHistory";
import { HistoryEvents } from "../../src/componentPages/pageClub/pageResults/historyEvents";
import { ResultsHistory } from "../../src/componentPages/pageClub/pageResults/resultsHistory";
import { GetLayout } from "../../src/components/layout/getLayout";

interface IProps {
  results?: ICLubResults;
}

export default function Results({ results }: IProps) {
  return (
    <>
      <BannerHistory mainInfo={results?.mainInfo} />
      <HistoryEvents timelineData={results?.historyResults?.timeline} />
      <BannerInfo titleText={"museumTitle"} commonText={"museumCommontext"} />
      <ResultsHistory results={results?.historyResults?.seasonsResults} />
    </>
  );
}

Results.getLayout = GetLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "clubResults" })).value[0];
  const results = res?.JsonData ? JSON.parse(res.JsonData) : null;
  const metaTags = results?.metaTags || (seodata as Record<string, any>)["/club/results"] || null;

  return { props: { metaTags, results }, revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_MAX) };
};
