import styled from "astroturf/react";
import { GetServerSideProps } from "next";
import { getArticlesList } from "../../api/articlesApi";
import { getCategoriesSlider, getCategoryById } from "../../api/categoriesApi";
import { getProducts, getProductsFilter } from "../../api/productsApi";
import { getSalesList } from "../../api/saleApi";
import { Breadcrumbs } from "../../common/components/Breadcrumbs";
import { ContainerArticle } from "../../common/components/Container";
import { getLayout } from "../../common/components/layout/Layout";
import { TitleH1 } from "../../common/components/TitleH1";
import { ArticleT } from "../../modules/articles/interfaces/article";
import { CategoryT } from "../../modules/categories/interfaces/category";
import { Filters } from "../../modules/filters/components/Filters";
import { FiltersT } from "../../modules/filters/interfaces/filters";
import { Product } from "../../modules/products/components/Product";
import { ProductT } from "../../modules/products/interfaces/product";
import { SaleT } from "../../modules/sale/interfaces/sale";
import { SeoText } from "../../modules/seo/components/SeoText";
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
  //   category: CategoryT;
  sales: SaleT[];
  articles: ArticleT[];
};

export default function CatalogPage(props: Props) {
  return (
    <>
      <CustomContainerArticle>
        <ContainerCustom padding={"sm"} paddingMb={"md"}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </ContainerCustom>
        <TitleH1 smallText={"326 товаров"} title={"Скидки"} />
      </CustomContainerArticle>
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

          <ContainerCustom padding={"md"} paddingMb={"sm"}>
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
    const { metaTags = {}, ...initialData } = await getInitialData({
      pathname: "/discounts",
    });
    const [categories, filters, products, category, sales, articles, recommendationProducts] =
      await Promise.allSettled([
        getCategoriesSlider(),
        getProductsFilter(query),
        getProducts(query),
        getCategoryById("114164"),
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
    grid-template-columns: minmax(300px, 1fr);
  }
`;

const CustomContainerArticle = styled(ContainerArticle)`
  @import "variables";
  margin-bottom: 20px;

  @include respond-to(large) {
    margin-bottom: 20px;
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
