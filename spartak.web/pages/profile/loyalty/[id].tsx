import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { advertisementRepository } from "../../../src/api/advertisementRepository";
import { LoyaltyConditionCheck, PromoDtoShort } from "../../../src/api/dto/loyalty";
import { getYearsOld, toISOString } from "../../../src/assets/constants/date";
import { UseWinlineModal } from "../../../src/componentPages/voting/useWinlineModal";
import { GetLayout } from "../../../src/components/layout/getLayout";
import { DataContext } from "../../../src/core/dataProvider";
import { LoadingScreen } from "../../../src/ui/LoadingScreen ";
import { LoyaltyInfo } from "../../../src/componentPages/pageProfile/pageLoyalty/loyaltyInfo";
import seodata from "../../../public/seo/seoData.json";

export default function LoyaltyInfoPage() {
  const { query, push } = useRouter();
  const [loading, setLoading] = useState(true);
  const [loyaltyInfo, setLoyaltyInfo] = useState<PromoDtoShort>();
  const [accepted, setAccepted] = useState<LoyaltyConditionCheck>();
  const [useWinlineModalIsOpen, setUseWinlineModalIsOpen] = useState(false);
  const { auth: { user = undefined } = {} } = useContext(DataContext);
  const birthDate = user?.personalData.BirthDate || toISOString(new Date());

  // Если пользователю меньше 18 или он не дал согласия на получение акций, то открывается попап
  useEffect(() => {
    // Добавлена проверка на пользователя, так как в первый рендер попадает Undefined
    if (user && (getYearsOld(birthDate) < 18 || !user?.AllowToUseWinline)) {
      setUseWinlineModalIsOpen(true);
    }
  }, [user]);

  const confirm = () => {
    setLoading(true);
    if (query.id?.toString())
      advertisementRepository
        .addLoyaltyUserAccept(query.id?.toString())
        .then((res) => {
          setAccepted(res.LoyaltyConditionCheck);
        })
        .finally(() => setLoading(false));
  };

  const getInfo = () => {
    if (query.id?.toString())
      advertisementRepository
        .getLoyaltyById(query.id?.toString())
        .then((res) => {
          if (res.Condition) {
            setLoyaltyInfo(res.Condition);
          } else {
            push("/404");
          }
        })
        .finally(() => setLoading(false));
  };

  useEffect(() => {
    getInfo();
  }, [query]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <LoyaltyInfo promo={loyaltyInfo} accepted={accepted} confirm={confirm} />

      {useWinlineModalIsOpen && (
        <UseWinlineModal
          birthDate={birthDate}
          onClose={() => {
            setUseWinlineModalIsOpen(false);
            push("/profile/personalData");
          }}
          onConfirm={() => {
            setUseWinlineModalIsOpen(false);
            getInfo();
          }}
        />
      )}
    </>
  );
}

LoyaltyInfoPage.getLayout = GetLayout;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/profile/loyalty"] || null,
    }
  };
};
