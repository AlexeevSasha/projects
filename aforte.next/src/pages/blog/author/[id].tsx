import styled from "astroturf/react";
import { ArticleT } from "modules/articles/interfaces/article";
import { GetServerSideProps } from "next";
import { getArticlesList, getAuthorById } from "../../../api/articlesApi";
import { ContainerArticle } from "../../../common/components/Container";
import { getLayout } from "../../../common/components/layout/Layout";
import { SubscribeOfNewsletter } from "../../../common/components/SubscribeOfNewsletter";
import { Articles } from "../../../modules/articles/components/Articles";
import { AuthorDetailsT } from "../../../modules/articles/interfaces/author";
import { getInitialData } from "../../../common/hooks/useInitialData";

type Props = {
  authorDetails: AuthorDetailsT;
  articlesList: ArticleT[];
  popularArticles: ArticleT[];
};

export default function AuthorPage({ authorDetails, articlesList, popularArticles }: Props) {
  return (
    <ContainerArticleCustom>
      <ContainerCustom>
        <Articles.AuthorDetails
          author={authorDetails.author}
          socialMedia={authorDetails.socialMedia}
          description={authorDetails.description}
        />
      </ContainerCustom>

      <ContainerCustom padding={"sm"} paddingMb={"md"}>
        <Articles.ArticlesGrid articles={articlesList} />
      </ContainerCustom>

      <ContainerAside>
        <Articles.ArticlesPopular title={"Популярные статьи автора"} articles={popularArticles} />
      </ContainerAside>
      <ContainerCustom padding={"md"} paddingMb={"md"}>
        <SubscribeOfNewsletter title={`Подписаться на статьи ${authorDetails.author.name}`} />
      </ContainerCustom>
    </ContainerArticleCustom>
  );
}

AuthorPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({
      pathname: "/blog/author/id",
    });
    const [authorDetails, articlesList, popularArticles] = await Promise.allSettled([
      getAuthorById(),
      getArticlesList({}),
      getArticlesList({ isPopular: true, author: "author" }),
    ]);

    return {
      props: {
        authorDetails: authorDetails.status === "fulfilled" ? authorDetails.value : [],
        articlesList: articlesList.status === "fulfilled" ? articlesList.value : [],
        popularArticles: popularArticles.status === "fulfilled" ? popularArticles.value : [],
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

const ContainerAside = styled.section`
  @import "variables";

  grid-column: 1;
  padding-top: 32px;

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
    padding-top: 44px;
  }

  @include respond-to(small) {
    &.paddingMb-sm {
      padding-top: 8px;
    }
    &.paddingMb-md {
      padding-top: 24px;
    }
    &.paddingMb-md {
      padding-top: 32px;
    }
  }
`;
