import styled from "astroturf/react";
import { GetServerSideProps } from "next";
import { getArticlesCategories, getArticlesList, getAuthors } from "../../api/articlesApi";
import { ContainerArticle } from "../../common/components/Container";
import { getLayout } from "../../common/components/layout/Layout";
import { ListOfCategoryButtons } from "../../common/components/listOfCategoryButtons/ListOfCategoryButtons";
import { TitleH1 } from "../../common/components/TitleH1";
import { CategoryButtonT } from "../../common/interfaces/categoryButton";
import { Articles } from "../../modules/articles/components/Articles";
import { ArticleT } from "../../modules/articles/interfaces/article";
import { AuthorT } from "../../modules/articles/interfaces/author";
import { Filters } from "../../modules/filters/components/Filters";
import { getInitialData } from "../../common/hooks/useInitialData";

type Props = {
  categoriesList: CategoryButtonT[];
  articles: ArticleT[];
  popularArticles: ArticleT[];
  popularAuthors: AuthorT[];
};

export default function BlogsPage(props: Props) {
  return (
    <ContainerArticleCustom>
      <ContainerTitle>
        <TitleH1 title={"Полезные статьи"} />
        <Filters.Sorting noneTitleMobile positions={"right"} />
      </ContainerTitle>
      <ContainerCustom padding={"xsm"} paddingMb={"md"}>
        <ListOfCategoryButtons bg={"blue"} categoriesList={props.categoriesList} />
      </ContainerCustom>
      <ContainerCustom padding={"sm"}>
        <Articles.ArticlesGrid articles={props.articles} />
      </ContainerCustom>
      <ContainerPopularAside>
        <Articles.ArticlesPopular title={"Популярные статьи"} articles={props.popularArticles} />
        <Articles.PopularAuthors authors={props.popularAuthors} />
      </ContainerPopularAside>
    </ContainerArticleCustom>
  );
}

BlogsPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({
      pathname: "/blog",
    });
    const [categoriesList, articles, popularArticles, popularAuthors] = await Promise.allSettled([
      getArticlesCategories(),
      getArticlesList({}),
      getArticlesList({ isPopular: true }),
      getAuthors(),
      // TODO: добавить запрос на "Недавно смотрели"
    ]);

    return {
      props: {
        categoriesList: categoriesList.status === "fulfilled" ? categoriesList.value : [],
        articles: articles.status === "fulfilled" ? articles.value : [],
        popularArticles: popularArticles.status === "fulfilled" ? popularArticles.value : [],
        popularAuthors: popularAuthors.status == "fulfilled" ? popularAuthors.value : [],
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};

const ContainerArticleCustom = styled(ContainerArticle)`
  @import "variables";

  display: grid;
  grid-template-columns: minmax(300px, 1fr) 376px;
  grid-column-gap: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  align-items: start;

  & > section {
    grid-column: 1;
  }

  @include respond-to(large) {
    grid-template-columns: minmax(300px, 1fr);
  }

  @include respond-to(small) {
    margin-top: 16px;
  }
`;

const ContainerTitle = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContainerPopularAside = styled.aside`
  @import "variables";

  grid-column: 1;
  padding-top: 40px;

  & > div:first-child {
    margin-bottom: 40px;
  }

  @media (min-width: 1199px) {
    padding-top: 0;
    grid-column: 2 !important;
    grid-row-start: 1;
    grid-row-end: 4;
    position: sticky;
    top: 100px;
  }
`;

const ContainerCustom = styled.section<{
  padding?: "xsm" | "sm" | "md";
  paddingMb?: "sm" | "md" | "lg";
}>`
  @import "variables";

  &.padding-xsm {
    padding-top: 20px;
  }
  &.padding-sm {
    padding-top: 24px;
  }
  &.padding-md {
    padding-top: 40px;
  }

  @include respond-to(small) {
    &.paddingMb-sm {
      padding-top: 8px;
    }
    &.paddingMb-md {
      padding-top: 16px;
    }
    &.paddingMb-lg {
      padding-top: 36px;
    }
  }
`;
