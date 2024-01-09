import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { lang } from "../../public/locales/lang";
import seodata from "../../public/seo/seoData.json";
import type { IProduct } from "../../src/api/dto/IProduct";
import {
  profileDenariiRepository,
  ToActivateDenarii,
  ToBurnDenarii,
  UserPurchaseDto,
  UserTransactionDto,
} from "../../src/api/profileDenariiRepository";
import { shopRepository } from "../../src/api/shopRepository";
import { userRepository } from "../../src/api/userRepository";
import { getYearsOld } from "../../src/assets/constants/date";
import { CartInfo } from "../../src/componentPages/pageProfile/pageDenarii/cartInfo";
import { DenariiListSection } from "../../src/componentPages/pageProfile/pageDenarii/denariiListSection";
import { Tele2banner } from "../../src/componentPages/pageProfile/pageDenarii/tele2banner";
import { getProfileLayout } from "../../src/componentPages/pageProfile/profileLayout";
import { ShopSwiper } from "../../src/components/reactSwiper/shopSwiper";
import { SelectOption } from "../../src/components/select/select";
import { DataContext } from "../../src/core/dataProvider";
import { LoadingScreen } from "../../src/ui/LoadingScreen ";

interface IProps {
  shopProductList: IProduct[];
}

export default function Denarii({ shopProductList }: IProps) {
  const { query, replace, locale = "ru" } = useRouter();
  const [loading, setLoading] = useState(true);
  const purchasesRef = useRef<{ value: UserPurchaseDto[]; count: number }>({ value: [], count: 0 });
  const transactionRef = useRef<{ value: UserTransactionDto[]; count: number }>({ value: [], count: 0 });
  const burnDenariiRef = useRef<ToBurnDenarii>({});
  const activateDenariiRef = useRef<ToActivateDenarii>({});
  const userCardOptionsRef = useRef<SelectOption[]>([]);
  const isFirstEffectRef = useRef<boolean>(true);
  const { auth } = useContext(DataContext);

  const [filter, setFilter] = useState<SelectOption["value"]>();

  const getPurchases = async () =>
    query.tab === "purchases" &&
    (await profileDenariiRepository
      .fetchUserPurchases({ pagination: +(query?.page || 1), UserCard: filter })
      .then(({ value, "@odata.count": count }) => (purchasesRef.current = { value, count })));

  const getTransactions = async () =>
    query.tab === "transactions" &&
    (await profileDenariiRepository
      .fetchUserTransactions({ pagination: +(query?.page || 1), UserCard: filter })
      .then(({ value, "@odata.count": count }) => (transactionRef.current = { value, count })));

  const getBurnDenarii = async () =>
    burnDenariiRef.current.Sum === undefined &&
    (await profileDenariiRepository.fetchBurnDenarii().then((value) => (burnDenariiRef.current = value)));

  const getActivateDenarii = async () =>
    activateDenariiRef.current.Sum === undefined &&
    (await profileDenariiRepository.fetchActivateDenarii().then((value) => (activateDenariiRef.current = value)));

  const getUserCards = async () =>
    await userRepository.fetchUserCards().then((res) => {
      userCardOptionsRef.current = res.map(({ CardNumber, CardId }) => ({ value: CardId, label: CardNumber }));
    });

  useEffect(() => {
    if (isFirstEffectRef.current) {
      isFirstEffectRef.current = false;
      return;
    }
    setLoading(true);
    (query.tab === "purchases" ? getPurchases : getTransactions)().finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => {
    if (!query.page) {
      replace({ query: { tab: "purchases", page: 1 } }, undefined, { shallow: true });
      return;
    }

    !loading && setLoading(true);
    Promise.allSettled([
      getPurchases(),
      getTransactions(),
      getBurnDenarii(),
      getActivateDenarii(),
      getUserCards(),
    ]).finally(() => setLoading(false));
  }, [query]);

  return (
    <>
      {(loading || !query.page) && <LoadingScreen />}

      {!loading && <DenariiListSection activate={activateDenariiRef.current} burn={burnDenariiRef.current} />}

      {/* {getYearsOld(auth?.user?.personalData.BirthDate || "0001-01-01") > 13 && <Tele2banner />} */}

      {shopProductList?.length > 0 && (
        <ShopSwiper itemsList={shopProductList} title={lang[locale].profile.denariiPage.buyForDenarii} />
      )}

      <CartInfo
        buyList={purchasesRef.current}
        transactionsList={transactionRef.current}
        cardOptions={userCardOptionsRef.current}
        filterValue={filter || "all"}
        onFilterChange={setFilter}
      />
    </>
  );
}

Denarii.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async ({ locale, res }) => {
  res.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
  return {
    props: {
      shopProductList: await shopRepository.fetchDenariiProductList({ locale }),
      metaTags: (seodata as Record<string, any>)["/profile/denarii"] || null,
    },
  };
};
