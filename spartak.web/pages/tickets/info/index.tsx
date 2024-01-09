import React, { useEffect } from "react";
import { CardServices } from "../../../src/componentPages/pageServices/cardServices/cardServices";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getTicketsLayout } from "../../../src/componentPages/pageTickets/ticketsLayout";
import { getDataByTeamId, getInitialData } from "../../../src/core/getInitialData";
import seodata from "../../../public/seo/seoData.json";

interface IProps {
  dataJSON: any;
  teamId?: string;
}

export default function Info(props: IProps) {
  const { query, replace } = useRouter();
  const existQueryParams = query.team && query.tournamentId;

  useEffect(() => {
    if (!existQueryParams) {
      replace({ query: { team: props.teamId } }, undefined, { shallow: true });
    }
  }, [existQueryParams]);

  return (
    <>
      <CardServices servicesData={props.dataJSON?.servicesData} defaultUrl="/tickets/info/" />
    </>
  );
}

Info.getLayout = getTicketsLayout;

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${process.env.NEXT_PUBLIC_REVALIDATE_MAX}, stale-while-revalidate=59`
  );
  const { teams = [] } = await getInitialData({ pathname: "/tickets/matches" });

  const dataJSON = require("../../../public/mockJSON/ticketsInfo/ticketsInfo.json");

  // Если в query параметрах не указан id, то получает первую команду как активную
  const teamId = query.team?.toString() || teams[0]?.Id || null;

  if (!teamId) return { props: { dataJSON } };

  const { blockOfMatches = {} } = await getDataByTeamId({ teamId });
  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/tickets/info"] || null,
      blockOfMatches,
      teamId,
      dataJSON,
    },
  };
};
