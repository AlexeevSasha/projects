import { ContainerArticle } from "common/components/Container";
import styled from "astroturf/react";
import { GetServerSideProps } from "next";
import { getInitialData } from "../../../common/hooks/useInitialData";
import { Breadcrumbs } from "../../../common/components/Breadcrumbs";
import { TitleH1 } from "../../../common/components/TitleH1";
import { Share } from "../../../common/components/shareSocial/Share";
import { MetaCatalogue } from "../../../modules/metacatalogue/components/MetaCatalogue";
import { FiltersT } from "../../../modules/filters/interfaces/filters";
import { Filters } from "../../../modules/filters/components/Filters";
import { Product } from "../../../modules/products/components/Product";
import { gerMetaCatalogueFilter, getMetaCatalogue } from "../../../api/metaCatalogueApi";
import { ProductT } from "../../../modules/products/interfaces/product";
import { getProducts } from "../../../api/productsApi";
import { SwiperWithButtonTop } from "../../../modules/slider/components/SwiperWithButtonTop";
import { CustomSwiper } from "../../../modules/slider/components/CustomSwiper";
import { getRecommendationCategory } from "../../../api/recommendationCategoryApi";
import { SaleT } from "../../../modules/sale/interfaces/sale";
import { Sale } from "../../../modules/sale/component/Sale";
import { getSalesList } from "../../../api/saleApi";
import { Advertisement } from "../../../modules/advertisement/components/Advertisement ";
import { XSSProtection } from "../../../modules/products/utils/XSSProtection";
import { MetaCatalogueT } from "../../../modules/metacatalogue/interfaces/metaCatalogue";
import { getLayout } from "../../../common/components/layout/Layout";

const breadcrumbs = [
  { title: "Главная", link: "" },
  { title: "Лекарства и аналоги ", link: "" },
];

type Props = {
  filters: FiltersT[];
  analogs: MetaCatalogueT;
  sales: SaleT[];
  recommendationProducts: ProductT[];
  recommendationCategory: RecommendationCategoryT[];
};

export default function AnalogsPage(props: Props) {
  return (
    <>
      <ContainerArticle>
        <ContainerCustom padding={"sm"} paddingMb={"md"}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </ContainerCustom>
        <ContainerTitle>
          <TitleH1 smallText={`${props.analogs.quantity} товаров`} title={props.analogs.name} />
          <MetaCatalogue.AnalogsFilter />
          <ContainerShare>
            <Share />
          </ContainerShare>
        </ContainerTitle>
      </ContainerArticle>
      <ContainerContent>
        <Filters.FiltersDesktop filters={props.filters} />
        <div>
          {props.analogs.text ? (
            <Text
              dangerouslySetInnerHTML={{
                __html: XSSProtection(props.analogs.text.replace(/(\r\n|\r|\n)/g, "<br>")),
              }}
            />
          ) : null}
          <ContainerTags>
            <Filters.Sorting />
            <Filters.FilterTags />
            <Filters.FiltersMobile filters={props.filters} />
          </ContainerTags>
          <ContainerCustom padding={"xxsm"}>
            <Product.ProductsGrid hidePagination products={props.analogs?.products} />
          </ContainerCustom>
          <ContainerCustom padding={"sm"} id={"instructions-for-use"} paddingMb={"md"}>
            <MetaCatalogue.InstructionsUseMedicinalProduct
              shortDescription={props.analogs.shortDescription}
              certificate={props.analogs.certificate}
              images={props.analogs.images}
              descriptionSections={props.analogs.descriptionSections}
              description={props.analogs.description}
            />
          </ContainerCustom>
          <ContainerCustom padding={"md"} paddingMb={"lg"}>
            <SwiperWithButtonTop<ProductT>
              id={"catalog-useful-slider"}
              sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
              items={props.recommendationProducts}
              title={"Вам может пригодиться"}
            >
              {(param) => (
                <CustomSwiper.SlideOfProduct>
                  <Product.Card {...param} />
                </CustomSwiper.SlideOfProduct>
              )}
            </SwiperWithButtonTop>
          </ContainerCustom>
          <ContainerCustom padding={"md"} paddingMb={"lg"}>
            <CustomSwiper.SliderRecommendationCategory
              recommendationCategory={props.recommendationCategory}
            />
          </ContainerCustom>
          <ContainerCustom padding={"md"} paddingMb={"lg"}>
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
          {props.analogs.reviews.length ? (
            <ContainerCustom id={"reviews"} padding={"sm"} paddingMb={"lg"}>
              <Product.Reviews
                reviews={props.analogs.reviews}
                totalReview={props.analogs.totalReview}
              />
            </ContainerCustom>
          ) : null}

          <ContainerCustom padding={"sm"} paddingMb={"md"}>
            <Advertisement.AppAdvertising />
          </ContainerCustom>
        </div>
      </ContainerContent>
    </>
  );
}

AnalogsPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({
      pathname: "/product/metacatalogue/analogs",
    });
    const [filters, analogs, recommendationProducts, recommendationCategory, sales] =
      await Promise.allSettled([
        gerMetaCatalogueFilter(),
        getMetaCatalogue("analogs"),
        getProducts({}),
        getRecommendationCategory(),
        getSalesList({}),
      ]);

    return {
      props: {
        filters: filters.status === "fulfilled" ? filters.value.data : [],
        analogs: analogs.status === "fulfilled" ? analogs.value : {},
        recommendationProducts:
          recommendationProducts.status === "fulfilled"
            ? recommendationProducts.value.data.items
            : [],
        recommendationCategory:
          recommendationCategory.status === "fulfilled" ? recommendationCategory.value : [],
        sales: sales.status === "fulfilled" ? sales.value : [],
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
  margin-top: 16px;
  margin-bottom: 40px;

  @include respond-to(large) {
    grid-template-columns: 300px minmax(300px, 1fr);
  }

  @include respond-to(small) {
    margin-top: 12px;
    grid-template-columns: minmax(300px, 1fr);
  }
`;
const ContainerTags = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 220px 1fr;
  grid-column-gap: 16px;

  @include respond-to(small) {
    grid-template-columns: 1fr fit-content(150px);
    margin-top: 16px;
  }
`;

const ContainerTitle = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr 350px 42px;
  grid-column-gap: 8px;

  @include respond-to(small) {
    grid-row-gap: 8px;
    grid-template-columns: 1fr 42px;

    & > div:nth-child(2) {
      grid-column: 1 /3;
    }
  }
`;

const ContainerShare = styled.div`
  @import "variables";

  min-width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: $blue-2;
  border-radius: 40px;

  & > div:first-child {
    path {
      fill: $blueMain;
      stroke: $blueMain;
    }
  }

  @include respond-to(small) {
    background: transparent;
    grid-column: 2;
    grid-row: 1;
    & > div:first-child {
      path {
        fill: $blue-1;
        stroke: $blue-1;
      }
    }
  }
`;

const Text = styled.div`
  @import "variables";

  margin-bottom: 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: $black;

  @include respond-to(small) {
    margin-bottom: 20px;
  }
`;

const ContainerCustom = styled.section<{
  padding?: "xsm" | "xxsm" | "sm" | "md" | "lg";
  paddingMb?: "sm" | "md" | "lg";
}>`
  @import "variables";

  scroll-margin-top: 90px;

  &.padding-xsm {
    padding-top: 8px;
  }
  &.padding-xxsm {
    padding-top: 16px;
  }
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
