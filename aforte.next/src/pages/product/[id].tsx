import { getLayout } from "../../common/components/layout/Layout";
import { ContainerArticle } from "../../common/components/Container";
import styled from "astroturf/react";
import { Breadcrumbs } from "../../common/components/Breadcrumbs";
import { productMock } from "../../api/mockData/productMock";
import { Product } from "../../modules/products/components/Product";
import { SwiperWithButtonTop } from "../../modules/slider/components/SwiperWithButtonTop";
import { GetServerSideProps } from "next";
import { CustomSwiper } from "../../modules/slider/components/CustomSwiper";
import { getRecommendationCategory } from "../../api/recommendationCategoryApi";
import { ProductT } from "../../modules/products/interfaces/product";
import { getProductsById } from "../../api/productsApi";
import { SaleT } from "../../modules/sale/interfaces/sale";
import { Sale } from "../../modules/sale/component/Sale";
import { getSalesList } from "../../api/saleApi";
import { getProductReviews } from "../../api/reviewsApi";
import { ProductReviewsT } from "../../modules/reviews/interfaces/reviews";
import { Reviews } from "../../modules/reviews/components/Reviews";
import { Advertisement } from "../../modules/advertisement/components/Advertisement ";
import { getInitialData } from "../../common/hooks/useInitialData";

const breadcrumbs = [
  { title: "Лекарственные средства", link: "/" },
  { title: "Средства от горла", link: "#" },
  { title: "Средства от простуды", link: "#" },
];

type Props = {
  product: ProductT;
  sales: SaleT[];
  recommendationCategory: RecommendationCategoryT[];
  reviews: {
    reviews: ProductReviewsT[];
    totalReview: number | null;
  };
};

//todo поменять api для отзывов

export default function ProductPage(props: Props) {
  return (
    <ContainerArticle>
      <ContainerCustom padding={"sm"} paddingMb={"sm"}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </ContainerCustom>

      <ContainerGrid>
        <ContainerCustom>
          <Product.DetailsCard {...props.product} />
        </ContainerCustom>
        <PositionAside>
          <Product.CardPrice
            id={props.product.id}
            discount={props.product.discount}
            regularPrice={props.product.regularPrice}
            salePrice={props.product.salePrice}
          />
        </PositionAside>
        <ContainerCustom paddingMb={"sm"}>
          <Product.Attributes attributes={props.product.attributes} isMobile />
        </ContainerCustom>
        <ContainerCustom padding={"sm"} paddingMb={"sm"}>
          <Product.InstructionsUseProduct
            descriptionSections={props.product.descriptionSections}
            description={props.product.description}
          />
        </ContainerCustom>
        <ContainerCustom padding={"md"} paddingMb={"md"}>
          <SwiperWithButtonTop<ProductT>
            sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
            id={"product-analogue-slider"}
            items={productMock}
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
        <ContainerCustom paddingMb={"sm"}>
          <Product.Analogue />
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
        <ContainerCustom padding={"lg"} paddingMb={"lg"}>
          <CustomSwiper.SliderRecommendationCategory
            recommendationCategory={props.recommendationCategory}
          />
        </ContainerCustom>

        <ContainerCustom id={"reviews-product"} padding={"md"} paddingMb={"lg"}>
          {props.reviews.reviews.length ? (
            <Product.Reviews
              totalReview={props.reviews.totalReview}
              reviews={props.reviews.reviews}
            />
          ) : (
            <Reviews.NoReview />
          )}
        </ContainerCustom>

        <ContainerCustom padding={"lg"} paddingMb={"lg"}>
          <SwiperWithButtonTop
            id={"product-carts-slider"}
            items={productMock}
            title={"Вам может пригодиться"}
            sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
          >
            {(param) => (
              <CustomSwiper.SlideOfProduct>
                <Product.Card {...param} />
              </CustomSwiper.SlideOfProduct>
            )}
          </SwiperWithButtonTop>
        </ContainerCustom>
        <ContainerCustom padding={"md"} paddingMb={"lg"}>
          <Advertisement.AppAdvertising />
        </ContainerCustom>
      </ContainerGrid>
      <Product.ProductMobileBuy id={props.product.id} />
    </ContainerArticle>
  );
}

ProductPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({
      pathname: "/product/id",
    });
    const [product, sales, recommendationCategory, reviews] = await Promise.allSettled([
      getProductsById(query.id as string),
      getSalesList({}),
      getRecommendationCategory(),
      getProductReviews(),
    ]);

    return {
      props: {
        product: product.status === "fulfilled" ? product.value.data : {},
        sales: sales.status === "fulfilled" ? sales.value : [],
        recommendationCategory:
          recommendationCategory.status === "fulfilled" ? recommendationCategory.value : [],
        reviews: reviews.status === "fulfilled" ? reviews.value : {},
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};

const ContainerCustom = styled.section<{
  padding?: "sm" | "md" | "lg";
  paddingMb?: "sm" | "md" | "lg";
}>`
  @import "variables";

  scroll-margin-top: 90px;

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

const ContainerGrid = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: minmax(300px, 1fr) 375px;
  grid-column-gap: 20px;
  margin-bottom: 40px;
  align-items: start;

  & > section {
    grid-column: 1;
  }

  @include respond-to(large) {
    grid-template-columns: minmax(300px, 1fr);
  }
`;

const PositionAside = styled.aside`
  @import "variables";

  padding-top: 20px;
  & > div {
    max-width: 100%;
  }

  @media (min-width: 1199px) {
    padding-top: 0;
    grid-column: 2 !important;
    grid-row: 1;
    position: sticky;
    top: 100px;
  }

  @include respond-to(small) {
    padding-top: 8px;
  }
`;
