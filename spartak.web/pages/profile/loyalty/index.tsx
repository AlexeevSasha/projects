import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import seodata from "../../../public/seo/seoData.json";
import { advertisementRepository } from "../../../src/api/advertisementRepository";
import { PromoDtoShort } from "../../../src/api/dto/loyalty";
import { ActiveEmpty } from "../../../src/componentPages/pageProfile/pageLoyalty/activeEmpty";
import { HistoryEmpty } from "../../../src/componentPages/pageProfile/pageLoyalty/historyEmpty";
import { LoyaltyFilter } from "../../../src/componentPages/pageProfile/pageLoyalty/loyaltyFilter";
import { LoyaltyLayout } from "../../../src/componentPages/pageProfile/pageLoyalty/loyaltyLayout";
import { PromoList } from "../../../src/componentPages/pageProfile/pageLoyalty/promoList";
import { getProfileLayout } from "../../../src/componentPages/pageProfile/profileLayout";
import { LoadingScreen } from "../../../src/ui/LoadingScreen ";

export default function LoyaltyPage() {
  const { query, replace, pathname, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const loyaltyList = useRef<PromoDtoShort[]>([]);
  const [count, setCount] = useState(0);

  const tab = query.tab ? String(query.tab) : "active";
  const setTab = (tab: string) => push({ pathname, query: { ...query, page: 1, tab } }, undefined, { scroll: false });

  const fetchAdvertisement = () => {
    setLoading(true);
    const Page = Number(query.page);

    if (tab === "active") {
      advertisementRepository
        .getLoyaltiesForAccept({ Page, Size: 6 })
        .then((res) => {
          loyaltyList.current = res.Loyalty || [];
          setCount(res.Count);
        })
        .finally(() => setLoading(false));
    }

    if (tab === "history") {
      advertisementRepository
        .getLoyaltiesHistory({
          Page,
          Size: 6,
          yearFilter: `${query.Year?.toString() || new Date().getFullYear()}-01-01T00:00:00`,
        })
        .then((res) => {
          loyaltyList.current = res.LoyaltyConditionInfos || [];
          setCount(res.Count);
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (query.page && query.tab) {
      fetchAdvertisement();
    } else {
      replace({ query: { page: 1, tab } }, undefined, { shallow: true });
    }
  }, [tab, query]);

  return (
    <LoyaltyLayout
      tab={tab}
      setTab={setTab}
      filter={<LoyaltyFilter />}
      itemsCount={count}
      confirmModal={fetchAdvertisement}
    >
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {tab === "active" &&
            (loyaltyList.current?.length ? <PromoList promo={loyaltyList.current} /> : <ActiveEmpty />)}
          {tab === "history" &&
            (loyaltyList.current?.length ? <PromoList promo={loyaltyList.current} /> : <HistoryEmpty />)}
        </>
      )}
    </LoyaltyLayout>
  );
}

LoyaltyPage.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/profile/loyalty"] || null,
    },
  };
};
