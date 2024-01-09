import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { lang } from "../../../../public/locales/lang";
import { cmsRepository } from "../../../../src/api/cmsRepository";
import { IServicesAdjacentTerritory } from "../../../../src/api/dto/IServicesAdjacentTerritory";
import { getLocalValue } from "../../../../src/assets/helpers/getLocalValue";
import { AdjacentTerritoryInfoBlocks } from "../../../../src/componentPages/pageServices/adjacentTerritory/adjacentTerritoryInfoBlocks";
import { AdjacentTerritoryRedBanner } from "../../../../src/componentPages/pageServices/adjacentTerritory/adjacentTerritoryRedBanner";
import { GetWebViewLayout } from "../../../../src/components/layout/getWebViewLayout";
import MainBannerWithTitle from "../../../../src/components/mainBannerWithTitle/MainBannerWithTitle";
import { SendFormProposal } from "../../../../src/components/sendFormProposal/sendFormPropposal";

interface IProps {
  adjacentTerritoryData?: IServicesAdjacentTerritory;
}

export default function AdjacentTerritory(props: IProps) {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <MainBannerWithTitle
        withButton
        banner={getLocalValue(props.adjacentTerritoryData?.mainInfo?.previewImg, locale) ?? null}
        title={getLocalValue(props.adjacentTerritoryData?.mainInfo?.title, locale) || ""}
      />
      <AdjacentTerritoryRedBanner info={props.adjacentTerritoryData?.redBanner} />
      <AdjacentTerritoryInfoBlocks listSectorInfo={props.adjacentTerritoryData?.blockInfo} />
      {props.adjacentTerritoryData && (
        <SendFormProposal
          feedbackType={"AdjacentTerritories"}
          title={lang[locale].form.contactTheManager}
          image={"/images/services/RedChairs_v1.0.0.png"}
        />
      )}
    </>
  );
}

AdjacentTerritory.getLayout = GetWebViewLayout;

export const getStaticProps: GetStaticProps = async () => {
  const res = (await cmsRepository.fetchCms({ Type: "servicesAdjacentTerritory" })).value[0];
  const adjacentTerritoryData = res?.JsonData ? JSON.parse(res.JsonData) : null;

  return {
    props: {
      adjacentTerritoryData,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
  };
};
