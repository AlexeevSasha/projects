import styled from "astroturf/react";
import { Category } from "modules/categories/components/Category";
import { GetServerSideProps } from "next";
import { getCategoriesSlider, getCategoryById } from "../../api/categoriesApi";
import { getProducts, getProductsFilter } from "../../api/productsApi";
import { ContainerArticle } from "../../common/components/Container";
import { getLayout } from "../../common/components/layout/Layout";
import { TitleH1 } from "../../common/components/TitleH1";
import { CategoryT } from "../../modules/categories/interfaces/category";
import { Filters } from "../../modules/filters/components/Filters";
import { Product } from "../../modules/products/components/Product";
import { SwiperWithButtonTop } from "../../modules/slider/components/SwiperWithButtonTop";
import { FiltersT } from "../../modules/filters/interfaces/filters";
import { CustomSwiper } from "../../modules/slider/components/CustomSwiper";
import { getArticlesList } from "../../api/articlesApi";
import { ArticleT } from "../../modules/articles/interfaces/article";
import { Articles } from "../../modules/articles/components/Articles";
import { SeoText } from "../../modules/seo/components/SeoText";
import { ProductT } from "../../modules/products/interfaces/product";
import { Breadcrumbs } from "../../common/components/Breadcrumbs";
import { SaleT } from "../../modules/sale/interfaces/sale";
import { Sale } from "../../modules/sale/component/Sale";
import { getSalesList } from "../../api/saleApi";
import { Advertisement } from "../../modules/advertisement/components/Advertisement ";
import { getInitialData } from "../../common/hooks/useInitialData";

const breadcrumbs = [
  { title: "Главная", link: "/" },
  { title: "Каталог", link: "/" },
];

type Props = {
  categories: CategoryT[];
  filters: FiltersT[];
  products: ProductT[];
  recommendationProducts: ProductT[];
  category: CategoryT;
  sales: SaleT[];
  articles: ArticleT[];
};

export default function CatalogPage(props: Props) {
  return (
    <>
      <ContainerArticle>
        <ContainerCustom padding={"sm"} paddingMb={"md"}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </ContainerCustom>
        <TitleH1 smallText={"326 товаров"} title={props.category?.name || ""} />
        <ContainerCustom paddingMb={"md"}>
          <Category.Swiper categoriesList={props.categories} type="sm" />
        </ContainerCustom>
      </ContainerArticle>
      <ContainerContent>
        <Filters.FiltersDesktop filters={props.filters} />
        <div>
          <ContainerSortTags>
            <Filters.Sorting />
            <Filters.FiltersMobile filters={props.filters} />
            <Filters.FilterTags />
          </ContainerSortTags>
          <ContainerCustom padding={"sm"} paddingMb={"md"}>
            <Product.ProductsGrid products={props.products} />
          </ContainerCustom>
          <ContainerCustom padding={"lg"} paddingMb={"lg"}>
            <SwiperWithButtonTop<SaleT>
              id={"catalog-promotions-slider"}
              sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
              items={props.sales}
              title={"Акции"}
              link={"/sale"}
            >
              {(param) => (
                <CustomSwiper.SlideOfSale>
                  <Sale.SaleCard {...param} />
                </CustomSwiper.SlideOfSale>
              )}
            </SwiperWithButtonTop>
          </ContainerCustom>
          <ContainerCustom padding={"md"} paddingMb={"lg"}>
            <SwiperWithButtonTop<ProductT>
              id={"catalog-useful-slider"}
              sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
              items={props.recommendationProducts}
              title={"Вам может пригодиться"}
              link={"/"}
            >
              {(param) => (
                <CustomSwiper.SlideOfProduct>
                  <Product.Card {...param} />
                </CustomSwiper.SlideOfProduct>
              )}
            </SwiperWithButtonTop>
          </ContainerCustom>
          <ContainerCustom padding={"md"} paddingMb={"lg"}>
            <SwiperWithButtonTop<ArticleT>
              sliderSettings={{
                desktopSB: 16,
                mobileSB: 8,
              }}
              id={"blogs-slider"}
              items={props.articles}
              title={"Полезные статьи"}
              link={"/blog"}
            >
              {(param) => (
                <CustomSwiper.SlideOfArticle>
                  <Articles.ArticleCard {...param} />
                </CustomSwiper.SlideOfArticle>
              )}
            </SwiperWithButtonTop>
          </ContainerCustom>
          <ContainerCustom padding={"sm"} paddingMb={"lg"}>
            <SeoText.ParagraphSeo>
              Купить препараты из раздела Лекарственные препараты в Москве по доступной цене. Часто
              спрашивают товары: Тантум Верде, Гексорал, Аджисепт, спрей Стрепсилс. Инструкции по
              применению, состав, показания и противопоказания, аналоги лекарственных средства в
              каталоге интернет-аптеки Форте.
            </SeoText.ParagraphSeo>
          </ContainerCustom>
          <ContainerCustom padding={"md"} paddingMb={"lg"}>
            <Advertisement.AppAdvertising />
          </ContainerCustom>
        </div>
      </ContainerContent>
    </>
  );
}

CatalogPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/catalog/id" });
    const [categories, filters, products, category, sales, articles, recommendationProducts] =
      await Promise.allSettled([
        getCategoriesSlider(),
        getProductsFilter(query),
        getProducts(query),
        getCategoryById(String(query.category)),
        getSalesList({}),
        getArticlesList({}),
        getProducts({}),
      ]);

    return {
      props: {
        categories: categories.status === "fulfilled" ? categories.value.data.items : [],
        filters: filters.status === "fulfilled" ? filters.value.data : [],
        products: products.status === "fulfilled" ? products.value.data.items : [],
        category: category.status === "fulfilled" ? category.value.data : {},
        sales: sales.status === "fulfilled" ? sales.value : [],
        articles: articles.status === "fulfilled" ? articles.value : [],
        recommendationProducts:
          recommendationProducts.status === "fulfilled"
            ? recommendationProducts.value.data.items
            : [],
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};

const ContainerContent = styled(ContainerArticle)`
  @import "variables";

  display: grid;
  grid-template-columns: 376px minmax(300px, 1fr);
  grid-column-gap: 20px;
  margin-bottom: 40px;

  @include respond-to(large) {
    grid-template-columns: 300px minmax(300px, 1fr);
  }

  @include respond-to(small) {
    margin-bottom: 36px;
    grid-template-columns: minmax(300px, 1fr);
  }
`;

const ContainerSortTags = styled.section`
  @import "variables";

  display: grid;
  grid-template-columns: 220px 1fr;
  grid-column-gap: 16px;

  @include respond-to(small) {
    grid-template-columns: 1fr fit-content(150px);
    margin-top: 16px;
  }
`;

const ContainerCustom = styled.section<{
  padding?: "sm" | "md" | "lg";
  paddingMb?: "sm" | "md" | "lg";
}>`
  @import "variables";

  &.padding-sm {
    padding-top: 20px;
  }
  &.padding-md {
    padding-top: 40px;
  }
  &.padding-lg {
    padding-top: 60px;
  }

  @include respond-to(small) {
    &.paddingMb-sm {
      padding-top: 12px;
    }
    &.paddingMb-md {
      padding-top: 16px;
    }
    &.paddingMb-lg {
      padding-top: 36px;
    }
  }
`;
