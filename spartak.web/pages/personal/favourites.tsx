import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { lang } from "../../public/locales/lang";
import type { IProduct } from "../../src/api/dto/IProduct";
import { shopRepository } from "../../src/api/shopRepository";
import { getCookie } from "../../src/assets/constants/getCookie";
import { theme } from "../../src/assets/theme/theme";
import { BreadCrumbs } from "../../src/componentPages/chapterShop/BreadCrumbs";
import { LogInCabinet } from "../../src/componentPages/pageFavourites/logInCabinet/logInCabinet";
import { EmptyScreenMatches } from "../../src/componentPages/pageMatches/emptyScreenMatches/emptyScreenMatches";
import { CardShop } from "../../src/components/cardShop/cardShop";
import { ContainerWithBackgroundImg } from "../../src/components/containers/containerWithBackgroundImg";
import { GetLayout } from "../../src/components/layout/getLayout";
import { Pagination } from "../../src/components/pagination/pagination";
import { ThemeContext } from "../../src/core/themeProvider";
import { LoadingScreen } from "../../src/ui/LoadingScreen ";

export default function Favourite() {
  const { locale = "ru", query } = useRouter();
  const isUnlogged = typeof window !== "undefined" && !!getCookie("access_token");
  const [loading, setLoading] = useState(false);
  const [productShort, setProductShort] = useState<IProduct[]>();
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    setLoading(true);
    if (isUnlogged) {
      shopRepository
        .fetchFavourites()
        .then((res) => {
          if (res.length)
            return shopRepository
              .fetchShopProductShortList(res.map((elem) => elem.id))
              .then((res) => setProductShort(res));
        })
        .finally(() => setLoading(false));
    } else {
      if (JSON.parse(getCookie("favourites") || "[]").length)
        shopRepository
          .fetchShopProductShortList(JSON.parse(getCookie("favourites") || "[]"))
          .then((res) => setProductShort(res))
          .finally(() => setLoading(false));
      else setLoading(false);
    }
  }, [query.page, isUnlogged]);

  const currentPage = +(query.page || 1);
  const pageSize = 12;

  const paginateArr = productShort?.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const memoizedCards = useMemo(() => {
    return paginateArr?.map((item, index) => (
      <CardShop key={"item" + index} productInfo={item} setLoading={setLoading} />
    ));
  }, [currentPage, productShort]);

  return (
    <>
      {loading && <LoadingScreen />}

      <ContainerWithBackgroundImg
        gradient={theme.gradients.first}
        src={"/images/shop/favourite_v1.0.0.png"}
        position={"center"}
      >
        <Title>{lang[locale].matches.breadCrumbs.favourite}</Title>
      </ContainerWithBackgroundImg>

      <Content>
        <FormsContainer>
          <BreadCrumbs items={[{ label: "general", link: "/" }, { label: "favourite" }]} />
        </FormsContainer>

        {!isUnlogged && <LogInCabinet />}

        {productShort?.length ? (
          <>
            <ListItems>{memoizedCards}</ListItems>
            <Pagination itemsCount={productShort?.length} currentPage={currentPage} pageSize={pageSize} />
          </>
        ) : loading ? null : (
          <EmptyScreenMatches
            text={lang[locale].favourites.emptyDescription}
            title={lang[locale].favourites.emptyTitle}
            srcImg={`/images/icon/TShirt${isDarkTheme ? "Black" : "White"}.svg`}
          />
        )}
      </Content>
    </>
  );
}
Favourite.getLayout = GetLayout;

const ListItems = styled.div`
  margin-top: 2.08vw;
  width: 100%;
  column-gap: 1vw;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    column-gap: 3.12vw;
    margin: 10.43vw 3.13vw 0 3.13vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin: 0;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    column-gap: 3.2vw;
  }
`;

const FormsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 2.61vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 5.33vw;
  }

  div {
    font-family: Roboto, sans-serif;
    font-weight: 500;
  }
`;

const Content = styled.div`
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  padding: 2.08vw 8.76vw;
  color: ${theme.colors.white};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 2vw 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw 2vw 0;
  }
`;
const Title = styled.h1`
  display: flex;
  align-items: end;
  z-index: 10;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 800;
  margin: 0;
  font-size: 6.25vw;
  padding: 4.69vw 8.75vw 4.17vw;
  line-height: 6.77vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 9.39vw;
    line-height: 11.73vw;
    padding: 11.73vw 2.61vw 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 10.67vw;
    line-height: 13.33vw;
    padding: 11.47vw 3.2vw 11.47vw;
  }
`;
