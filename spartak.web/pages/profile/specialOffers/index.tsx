import React, { useEffect, useState } from "react";
import { getProfileLayout } from "../../../src/componentPages/pageProfile/profileLayout";
import { GetServerSideProps } from "next";
import seodata from "../../../public/seo/seoData.json";
import { SpecialOffersComponent } from "../../../src/componentPages/pageProfile/pageSpecialOffers/specialOffersComponent";
import { useRouter } from "next/router";
import { specialOffersRepository } from "../../../src/api/specialOffers";
import { ISpecialOffer } from "../../../src/api/dto/ISpecialOffer";

export default function Index() {
  const { query, replace, push, pathname } = useRouter();
  const [loading, setLoading] = useState(false);
  const tab = query.tab ? String(query.tab) : "FromClub";
  const setTab = (tab: string) => push({ pathname, query: { tab } });

  const [specialOffers, setSpecialOffers] = useState<ISpecialOffer[]>([]);

  const fetchSpecialOffers = async () => {
    setLoading(true);
    await specialOffersRepository.fetchSpecialOffers(tab).then((res) => (setSpecialOffers(res), setLoading(false)));
  };

  useEffect(() => {
    !query.tab ? replace({ query: { tab } }, undefined, { shallow: true }) : fetchSpecialOffers();
  }, [query.tab]);

  return <SpecialOffersComponent tab={tab} setTab={setTab} specialOffers={specialOffers} loading={loading} />;
}

Index.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");

  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/profile/specialOffers"] || null,
    },
  };
};
