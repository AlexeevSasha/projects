import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { lang } from "../public/locales/lang";
import { SearchResult } from "../src/api/dto/search";
import { searchRepository } from "../src/api/searchRepository";
import { shopRepository } from "../src/api/shopRepository";
import { theme } from "../src/assets/theme/theme";
import { SearchInputContainer } from "../src/componentPages/chapterShop/pageSearch/searchInputContainer";
import { EmptyScreenMatches } from "../src/componentPages/pageMatches/emptyScreenMatches/emptyScreenMatches";
import { Search } from "../src/componentPages/search/search";
import { ContainerContent } from "../src/components/containers/containerContent";
import { ContainerHorizontalScroll } from "../src/components/containers/containerHorizontalScroll";
import { INavMenuList } from "../src/components/header/component/getMenuItems";
import { GetLayout } from "../src/components/layout/getLayout";
import { NavMenu } from "../src/components/navMenu/navMenu";
import { ThemeContext } from "../src/core/themeProvider";
import { LoadingScreen } from "../src/ui/LoadingScreen ";

const menuItems: INavMenuList[] = [
  { label: "shop/all", link: "", query: { tab: "All" } },
  { label: "shop/media", link: "", query: { tab: "Media" } },
  { label: "shop/matches", link: "", query: { tab: "Matches" } },
  { label: "shop/club", link: "", query: { tab: "Club" } },
  { label: "shop/players", link: "", query: { tab: "Players" } },
  { label: "shop/teams", link: "", query: { tab: "Teams" } },
  { label: "shop/tickets", link: "", query: { tab: "Tickets" } },
  { label: "shop/shop", link: "", query: { tab: "Shop" } },
  { label: "shop/info", link: "", query: { tab: "Info" } },
];

export default function SearchPage() {
  const { locale = "ru", query, replace } = useRouter();
  const [loading, setLoading] = useState(true);
  const results = useRef<SearchResult | undefined>();
  const { isDarkTheme } = useContext(ThemeContext);

  const handleSearch = () => {
    if (!query.search) {
      loading && setLoading(false);
      return;
    }
    !loading && setLoading(true);

    // Для вкладки магазина отдельный метод для получения данных
    if (query.tab === "Shop") {
      shopRepository
        .fetchSearchFullProductsWihPagination(`${query.search}`, 1, 8)
        .then((result) => {
          results.current = { Products: result.list, Count: result?.count | 0 };
        })
        .finally(() => setLoading(false));
    } else {
      const CategoryTypes =
        query.tab === "All"
          ? undefined
          : query.tab === "Club"
          ? "Staff&CategoryTypes=Coaches&CategoryTypes=Bosses"
          : query.tab?.toString();

      searchRepository
        .fetchSearch({
          SearchPhrase: query.search ? `${query.search}` : query.search,
          Page: 1,
          Size: CategoryTypes ? 6 : 3,
          CategoryTypes,
        })
        .then((result) => {
          results.current = result;
          if (query.tab === "All") {
            shopRepository
              .fetchSearchFullProductsWihPagination(`${query.search}`, 1, 4)
              .then((shopResult) => {
                results.current = {
                  ...result,
                  Products: shopResult.list,
                  Count: ((shopResult?.count || 0) + result.Count) | 0,
                };
              })
              .finally(() => setLoading(false));
          } else {
            setLoading(false);
          }
        });
    }
  };

  useEffect(() => {
    if (!query.tab) replace({ query: { ...query, tab: "All" } }, undefined, { shallow: true });
    else handleSearch();
  }, [query]);

  return (
    <Container>
      <Title>{lang[locale].header.placeholder.searchinSite}</Title>

      <SearchInputContainer />

      <FoundResultsContainer>
        {lang[locale].shop.found} {lang[locale].shop.results}: {!loading && (results.current?.Count || 0)}
      </FoundResultsContainer>

      <ContainerHorizontalScroll>
        <Menu menuList={menuItems} usePrevQueryParam noTheme />
      </ContainerHorizontalScroll>

      {loading ? (
        <LoadingScreen />
      ) : results.current?.Count ? (
        <Search {...results.current} />
      ) : (
        <EmptyScreenMatches
          text={lang[locale].shop.searchEmpty}
          srcImg={`/images/icon/magnifyingGlass${isDarkTheme ? "Black" : "White"}.svg`}
        />
      )}
    </Container>
  );
}

SearchPage.getLayout = GetLayout;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
  return { props: { metaTags: { titleName: { Ru: "Поиск", En: "Search" } } } };
};

const Container = styled(ContainerContent)`
  flex-direction: column;
  align-items: initial;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 3.75vw;
  margin: 4.17vw 0;
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 9.39vw;
    margin: 5.22vw 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 9.67vw;
    margin: 6.4vw 0;
  }
`;

const FoundResultsContainer = styled.div`
  font-size: 0.94vw;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grayLight_grayDark1};
  margin-bottom: 2.56vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    margin-bottom: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    margin-bottom: 6.4vw;
  }
`;

const Menu = styled(NavMenu)`
  & a {
    color: ${({ theme }) => theme.colors.white_black};

    &:hover {
      border-bottom-color: ${theme.colors.red};
    }
  }
`;
