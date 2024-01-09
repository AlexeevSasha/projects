import { GetServerSideProps } from "next";
import seodata from "../../public/seo/seoData.json";
import { ISeasonNoLocate } from "../../src/api/dto/ITournamentAndSeasons";
import { profileMatchesRepository } from "../../src/api/profileMatchesRepository";
import { TableMatches } from "../../src/componentPages/pageProfile/pageMatches/tableMatches";
import { getProfileLayout } from "../../src/componentPages/pageProfile/profileLayout";
import { ContainerContent } from "../../src/components/containers/containerContent";
import { useEffect, useState } from "react";
import { LoadingScreen } from "../../src/ui/LoadingScreen ";

export default function Matches() {
  const [seasonList, setSeasonList] = useState<ISeasonNoLocate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    profileMatchesRepository.fetchSeasonsToFilter().then((res) => {
      setSeasonList(res.reverse());
      setLoading(false);
    });
  }, []);

  return <ContainerContent>{loading ? <LoadingScreen /> : <TableMatches seasonList={seasonList} />}</ContainerContent>;
}

Matches.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/profile/matches"] || null,
    },
  };
};
