import { GetServerSideProps } from "next";
import styled from "astroturf/react";
import { ProductT } from "../../modules/products/interfaces/product";
import { CharityDetailsT, CharityT } from "../../modules/charity/interfaces/charity";
import { AsideLinks } from "../../common/components/AsideLinks";
import { ArticleT } from "../../modules/articles/interfaces/article";
import { Articles } from "../../modules/articles/components/Articles";
import { CustomSwiper } from "../../modules/slider/components/CustomSwiper";
import { Charity } from "../../modules/charity/components/Charity";
import { getLayout } from "../../common/components/layout/Layout";
import { getInitialData } from "../../common/hooks/useInitialData";
import { getArticlesList } from "../../api/articlesApi";
import { getCharities, getCharitiesById } from "../../api/charityApi";
import { getProducts } from "../../api/productsApi";
import { ContainerArticle } from "../../common/components/Container";
import { Product } from "../../modules/products/components/Product";

type Props = {
  products: ProductT[];
  charity: CharityT[];
  charityDetails: CharityDetailsT;
  articles: ArticleT[];
};

export default function CharityDetailsPage({ charity, products, articles, charityDetails }: Props) {
  return (
    <ContainerArticleCustom>
      <Charity.CharityDetails {...charityDetails} />
      <PositionAside>
        <AsideLinks
          activeLink={"charity"}
          links={["about-company", "charity", "certificates", "career", "contact"]}
        />
        <Articles.ArticlesPopular articles={articles} />
      </PositionAside>
      <ContainerCustom padding={"md"} paddingMb={"md"}>
        <CustomSwiper.SliderWithButtonTop<ProductT>
          id={"goods-for-charity-slider"}
          title={"Благотворительные товары"}
          items={products}
          sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
        >
          {(param) => (
            <CustomSwiper.SlideOfProduct>
              <Product.Card {...param} />
            </CustomSwiper.SlideOfProduct>
          )}
        </CustomSwiper.SliderWithButtonTop>
      </ContainerCustom>
      <ContainerCustom padding={"xsm"} paddingMb={"lg"}>
        <CustomSwiper.SliderWithButtonTop<CharityT>
          id={"charity-slider"}
          title={"Благотворительность"}
          link={"/charity"}
          items={charity}
          sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
        >
          {(param) => (
            <CustomSwiper.SlideOfCharity>
              <Charity.CharityCard {...param} />
            </CustomSwiper.SlideOfCharity>
          )}
        </CustomSwiper.SliderWithButtonTop>
      </ContainerCustom>
    </ContainerArticleCustom>
  );
}

CharityDetailsPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/charity" });
    const [articles, charity, products, charityDetails] = await Promise.allSettled([
      getArticlesList({ isPopular: true }),
      getCharities(),
      getProducts({ limit: 10 }),
      getCharitiesById(query.id as string),
    ]);

    return {
      props: {
        articles: articles.status === "fulfilled" ? articles.value : [],
        products: products.status === "fulfilled" ? products.value.data.items : [],
        charity: charity.status === "fulfilled" ? charity.value : [],
        charityDetails: charityDetails.status === "fulfilled" ? charityDetails.value : {},
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
  grid-template-columns: minmax(300px, 1fr) 375px;
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
    margin-bottom: 36px;
    margin-top: 8px;
  }
`;

const PositionAside = styled.aside`
  @import "variables";

  display: grid;
  grid-row-gap: 20px;
  width: 100%;
  padding-top: 20px;

  @media (min-width: 1199px) {
    padding-top: 0;
    grid-column: 2 !important;
    grid-row-start: 1;
    grid-row-end: 3;
    position: sticky;
    top: 100px;
  }

  @include respond-to(small) {
    display: none;
    padding-top: 8px;
    grid-row-gap: 8px;
  }
`;

const ContainerCustom = styled.section<{
  padding?: "sm" | "xsm" | "md";
  paddingMb?: "sm" | "md" | "lg";
}>`
  @import "variables";

  &.padding-sm {
    padding-top: 20px;
  }
  &.padding-xsm {
    padding-top: 24px;
  }
  &.padding-md {
    padding-top: 44px;
  }

  @include respond-to(small) {
    &.paddingMb-sm {
      padding-top: 12px;
    }
    &.paddingMb-md {
      padding-top: 28px;
    }
    &.paddingMb-lg {
      padding-top: 36px;
    }
  }
`;
