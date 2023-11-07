import { getProducts } from "api/productsApi";
import styled from "astroturf/react";
import { GetServerSideProps } from "next";
import { getArticlesById, getArticlesList } from "../../api/articlesApi";
import { ContainerArticle } from "../../common/components/Container";
import { getLayout } from "../../common/components/layout/Layout";
import { SubscribeOfNewsletter } from "../../common/components/SubscribeOfNewsletter";
import { Articles } from "../../modules/articles/components/Articles";
import { ArticleT } from "../../modules/articles/interfaces/article";
import { ArticleDetailsT } from "../../modules/articles/interfaces/articleDetails";
import { Product } from "../../modules/products/components/Product";
import { ProductT } from "../../modules/products/interfaces/product";
import { CustomSwiper } from "../../modules/slider/components/CustomSwiper";
import { SwiperWithButtonTop } from "../../modules/slider/components/SwiperWithButtonTop";
import { getInitialData } from "../../common/hooks/useInitialData";

type Props = {
  articleDetails: ArticleDetailsT;
  otherArticles: ArticleT[];
  productFromArticle: ProductT[];
  readAlsoArticles: ArticleT[];
};

export default function DetailsBlogPage(props: Props) {
  return (
    <ContainerArticleCustom>
      <ContainerCustom>
        <Articles.DetailsArticle {...props.articleDetails} />
      </ContainerCustom>
      <ContainerAside>
        <Articles.AnchorOfArticle anchors={props.articleDetails.anchors} />
        <ContainerCustom padding={"xsm"} paddingMb={"md"}>
          <Articles.OtherArticlesByAuthor articles={props.otherArticles} />
        </ContainerCustom>
      </ContainerAside>

      <ContainerCustom padding={"md"} paddingMb={"md"}>
        <SwiperWithButtonTop<ProductT>
          id={"product-carts-slider"}
          items={props.productFromArticle}
          title={"Товары из статьи"}
          sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
        >
          {(param) => (
            <CustomSwiper.SlideOfProduct>
              <Product.Card {...param} />
            </CustomSwiper.SlideOfProduct>
          )}
        </SwiperWithButtonTop>
      </ContainerCustom>

      <ContainerCustom padding={"sm"} paddingMb={"md"}>
        <Articles.Comments {...props.articleDetails.comments} />
      </ContainerCustom>

      <ContainerCustom padding={"sm"} paddingMb={"md"}>
        <SubscribeOfNewsletter title={"Подписаться на нашу рассылку"} />
      </ContainerCustom>

      <ContainerCustom padding={"md"} paddingMb={"md"}>
        <SwiperWithButtonTop<ArticleT>
          id={"articles-more"}
          title={"Читайте также"}
          link={"/blog"}
          items={props.readAlsoArticles}
          sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
        >
          {(param) => (
            <CustomSwiper.SlideOfArticle>
              <Articles.ArticleCard {...param} />
            </CustomSwiper.SlideOfArticle>
          )}
        </SwiperWithButtonTop>
      </ContainerCustom>
    </ContainerArticleCustom>
  );
}

DetailsBlogPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({
      pathname: "/blog/id",
    });
    const [articleDetails, productFromArticle, otherArticles, readAlsoArticles] =
      await Promise.allSettled([
        getArticlesById(),
        getProducts({}),
        getArticlesList({ author: "author" }),
        getArticlesList({ articleId: "idArticle" }),
      ]);

    return {
      props: {
        articleDetails:
          articleDetails.status === "fulfilled" ? articleDetails.value : ({} as ArticleDetailsT),
        otherArticles: otherArticles.status === "fulfilled" ? otherArticles.value : [],
        productFromArticle:
          productFromArticle.status === "fulfilled" ? productFromArticle.value.data.items : [],
        readAlsoArticles: readAlsoArticles.status === "fulfilled" ? readAlsoArticles.value : [],
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} as Props };
  }
};

const ContainerArticleCustom = styled(ContainerArticle)`
  @import "variables";

  display: grid;
  grid-template-columns: minmax(300px, 1fr) 376px;
  grid-column-gap: 20px;
  margin-bottom: 40px;
  margin-top: 20px;
  align-items: start;

  & > section {
    grid-column: 1;
  }

  @include respond-to(large) {
    grid-template-columns: minmax(300px, 1fr);
  }
  @include respond-to(small) {
    margin-top: 8px;
  }
`;

const ContainerAside = styled.aside`
  grid-row: 4;

  & > div:first-child {
    display: none;
  }

  @media (min-width: 1199px) {
    grid-column: 2 !important;
    grid-row: 1;
    position: sticky;
    top: 100px;

    & > div:first-child {
      display: block;
    }
  }
`;

const ContainerCustom = styled.section<{
  padding?: "xsm" | "sm" | "md";
  paddingMb?: "sm" | "md";
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
  }
`;
