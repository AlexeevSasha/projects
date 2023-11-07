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
  medicinalProduct: MetaCatalogueT;
  sales: SaleT[];
  recommendationProducts: ProductT[];
  recommendationCategory: RecommendationCategoryT[];
};

export default function MedicinalProductPage(props: Props) {
  return (
    <>
      <ContainerArticle>
        <ContainerCustom padding={"sm"} paddingMb={"md"}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </ContainerCustom>
        <ContainerTitle>
          <TitleH1
            smallText={`${props.medicinalProduct.quantity} товаров`}
            title={props.medicinalProduct.name}
          />
          <ContainerShare>
            <Share />
          </ContainerShare>
        </ContainerTitle>
        <ContainerCustom padding={"xsm"} paddingMb={"sm"}>
          <MetaCatalogue.MetaCatalogueTags tags={props.medicinalProduct.activeIngredients} />
        </ContainerCustom>
      </ContainerArticle>
      <ContainerContent>
        <div>
          <AnchorContainer>
            <MetaCatalogue.AnchorOfMedicinalProduct />
          </AnchorContainer>
          <Filters.FiltersDesktop filters={props.filters} />
        </div>
        <div>
          {props.medicinalProduct.text ? (
            <Text
              dangerouslySetInnerHTML={{
                __html: XSSProtection(props.medicinalProduct.text.replace(/(\r\n|\r|\n)/g, "<br>")),
              }}
            />
          ) : null}
          <ContainerTags>
            <Filters.Sorting />
            <Filters.FilterTags />
            <Filters.FiltersMobile filters={props.filters} />
          </ContainerTags>
          <ContainerCustom padding={"xxsm"}>
            <Product.ProductsGrid hidePagination products={props.medicinalProduct?.products} />
          </ContainerCustom>
          <ContainerCustom padding={"sm"} id={"instructions-for-use"} paddingMb={"md"}>
            <MetaCatalogue.InstructionsUseMedicinalProduct
              shortDescription={props.medicinalProduct.shortDescription}
              certificate={props.medicinalProduct.certificate}
              images={props.medicinalProduct.images}
              descriptionSections={props.medicinalProduct.descriptionSections}
              description={props.medicinalProduct.description}
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
          <ContainerCustom id={"drug-analogues"} padding={"md"} paddingMb={"lg"}>
            <SwiperWithButtonTop<ProductT>
              id={"catalog-analogues-slider"}
              sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
              items={props.recommendationProducts}
              title={"Аналоги"}
              link={"/product/metacatalogue/analogs"}
            >
              {(param) => (
                <CustomSwiper.SlideOfProduct>
                  <Product.Card {...param} />
                </CustomSwiper.SlideOfProduct>
              )}
            </SwiperWithButtonTop>
          </ContainerCustom>
          <ContainerCustom paddingMb={"md"}>
            <Product.Analogue />
          </ContainerCustom>
          <ContainerCustom padding={"lg"} paddingMb={"lg"}>
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
          {props.medicinalProduct.reviews.length ? (
            <ContainerCustom id={"reviews"} padding={"sm"} paddingMb={"lg"}>
              <Product.Reviews
                reviews={props.medicinalProduct.reviews}
                totalReview={props.medicinalProduct.totalReview}
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

MedicinalProductPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({
      pathname: "/product/metacatalogue/medicinal-product",
    });
    const [filters, medicinalProduct, recommendationProducts, recommendationCategory, sales] =
      await Promise.allSettled([
        gerMetaCatalogueFilter(),
        getMetaCatalogue("medicinal-product"),
        getProducts({}),
        getRecommendationCategory(),
        getSalesList({}),
      ]);

    return {
      props: {
        filters: filters.status === "fulfilled" ? filters.value.data : [],
        medicinalProduct: medicinalProduct.status === "fulfilled" ? medicinalProduct.value : {},
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
    margin-bottom: 36px;
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
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const ContainerShare = styled.div`
  @import "variables";

  margin-left: 16px;
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

const AnchorContainer = styled.div`
  @import "variables";

  margin-bottom: 10px;

  @include respond-to(small) {
    display: none;
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
