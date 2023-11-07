import { getMarketingBigBanners, getMarketingSmallBanners } from "api/marketingApi";
import { MarketingMockType } from "api/mockData/marketingMock";
import styled from "astroturf/react";
import { Container } from "common/components/Container";
import { getLayout } from "common/components/layout/Layout";
import { Category } from "modules/categories/components/Category";
import { Marketing } from "modules/marketing/components/Marketing";
import { MarketingBigSlide } from "modules/marketing/interfaces/marketingBigSlide";
import { MarketingSmallSlide } from "modules/marketing/interfaces/marketingSmallSlide";
import { GetServerSideProps } from "next";
import { getCategoriesSlider } from "../api/categoriesApi";
import { Brands } from "../common/components/brand/Brands";
import { Mailing } from "../common/components/Mailing";
import { SeoText } from "../modules/seo/components/SeoText";
import { CategoryT } from "../modules/categories/interfaces/category";
import { CustomSwiper } from "../modules/slider/components/CustomSwiper";
import { SwiperWithButtonTop } from "../modules/slider/components/SwiperWithButtonTop";
import { Articles } from "../modules/articles/components/Articles";
import { getArticlesList } from "../api/articlesApi";
import { ArticleT } from "../modules/articles/interfaces/article";
import { BrandT } from "../common/interfaces/brand";
import { getBrands } from "../api/brandsApi";
import { getInitialData } from "common/hooks/useInitialData";
import { SaleT } from "../modules/sale/interfaces/sale";
import { Sale } from "../modules/sale/component/Sale";
import { getSalesList } from "../api/saleApi";
import { getAdvertisement } from "../api/advertisementApi";
import { AdvertisementAllBannersT } from "../modules/advertisement/interfaces/advertisementBanner";
import { Advertisement } from "../modules/advertisement/components/Advertisement ";
import { getProducts } from "../api/productsApi";
import { Product } from "../modules/products/components/Product";
import { ProductT } from "../modules/products/interfaces/product";
import { BenefitsPharmacies } from "../common/components/BenefitsPharmacies";
import { Reviews } from "../modules/reviews/components/Reviews";
import { StoryReviewsT } from "../modules/reviews/interfaces/reviews";
import { getStoryReviews } from "../api/reviewsApi";
import { MetaCatalogue } from "../modules/metacatalogue/components/MetaCatalogue";
import { getCategoryMetaCatalogue } from "../api/metaCatalogueApi";
import { CategoryButtonT } from "../common/interfaces/categoryButton";
import { TitleWithButtonTop } from "../common/components/TitleWithButtonTop";

interface IProps {
  categories: CategoryT[];
  marketing: MarketingMockType;
  articles: ArticleT[];
  brands: BrandT[];
  sales: SaleT[];
  advertisement: AdvertisementAllBannersT;
  discountedProducts: ProductT[];
  reviews: StoryReviewsT[];
  categoryMetaCatalogue: CategoryButtonT[];
}

export default function Index(props: IProps) {
  return (
    <ContainerArticle>
      <CustomContainer padding="sm" paddingMB={"sm"}>
        <CustomSwiper<MarketingBigSlide>
          pagination={{ clickable: true }}
          id={"big-banner-slider"}
          arrowSettings={{ color: "white", inside: true }}
          sliderSettings={{ paginateColor: "white" }}
          items={props.marketing.bigBanner}
          slidesPerView={1}
          loop
        >
          {(elem) => <Marketing.BigSlide {...elem} />}
        </CustomSwiper>
      </CustomContainer>

      <CustomContainer padding="sm" paddingMB={"md"}>
        <CustomSwiper<MarketingSmallSlide>
          id={"small-banner-slider"}
          arrowSettings={{ hidden: true }}
          sliderSettings={{ desktopSB: 20, mobileSB: 12 }}
          items={props.marketing.smallBanner}
        >
          {(elem) => <Marketing.SmallSlide {...elem} />}
        </CustomSwiper>
      </CustomContainer>

      <CustomContainer padding={"md"} paddingMB={"xmd"}>
        <BenefitsPharmacies />
      </CustomContainer>

      <CustomContainer padding="sm" paddingMB={"xmd"}>
        <ContainerTitleCategory>
          <TitleWithButtonTop title={"Каталог товаров"} />
        </ContainerTitleCategory>
        <Category.Swiper categoriesList={props.categories} type="md" />
      </CustomContainer>

      {props.advertisement.bigBanner?.[0] ? (
        <CustomContainer paddingMB={"xlg"}>
          <Advertisement.HorizontAdvertisement {...props.advertisement.bigBanner?.[0]} />
        </CustomContainer>
      ) : null}

      <CustomContainer padding={"md"} paddingMB={"lg"}>
        <SwiperWithButtonTop<SaleT>
          id={"sale-slider"}
          sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
          items={props.sales}
          title={"Акции"}
          link={"/sale"}
        >
          {(param) => (
            <CustomSwiper.SlideOfSale size={"sm"}>
              <Sale.SaleCard {...param} />
            </CustomSwiper.SlideOfSale>
          )}
        </SwiperWithButtonTop>
      </CustomContainer>

      {props.advertisement.verticalBanner?.[0] ? (
        <CustomContainer padding="md" paddingMB={"lg"}>
          <Advertisement.AdvertisementWithProduct positionAdv={"left"}>
            <Advertisement.VerticalAdvertisement {...props.advertisement.verticalBanner?.[0]} />
            <Product.ProductsGrid
              products={props.advertisement.verticalBanner?.[0].products}
              hidePagination
            />
          </Advertisement.AdvertisementWithProduct>
        </CustomContainer>
      ) : null}

      <CustomContainer padding="lg" paddingMB={"lg"}>
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
      </CustomContainer>

      <CustomContainer padding="md" paddingMB={"lg"}>
        <SwiperWithButtonTop<ProductT>
          sliderSettings={{
            desktopSB: 16,
            mobileSB: 8,
          }}
          id={"product-slider"}
          items={props.discountedProducts}
          title={"Скидки"}
          link={"/discounts"}
        >
          {(param) => (
            <CustomSwiper.SlideOfProduct>
              <Product.Card {...param} />
            </CustomSwiper.SlideOfProduct>
          )}
        </SwiperWithButtonTop>
      </CustomContainer>

      {props.advertisement.verticalBanner?.[1] ? (
        <CustomContainer padding="md" paddingMB={"lg"}>
          <Advertisement.AdvertisementWithProduct positionAdv={"right"}>
            <Product.ProductsGrid
              products={props.advertisement.verticalBanner?.[1].products}
              hidePagination
            />
            <Advertisement.VerticalAdvertisement {...props.advertisement.verticalBanner?.[1]} />
          </Advertisement.AdvertisementWithProduct>
        </CustomContainer>
      ) : null}

      <CustomContainer padding="lg" paddingMB={"lg"}>
        <SwiperWithButtonTop<StoryReviewsT>
          sliderSettings={{
            desktopSB: 16,
            mobileSB: 8,
          }}
          id={"reviews-story-slider"}
          items={props.reviews}
          title={"Отзывы о магазине"}
          link={"/"}
        >
          {(param) => (
            <CustomSwiper.SlideOfStoryReviews>
              <Reviews.StoryReviewsSmallCard review={param} />
            </CustomSwiper.SlideOfStoryReviews>
          )}
        </SwiperWithButtonTop>
      </CustomContainer>

      <CustomContainer paddingMB={"lg"}>
        <Mailing />
      </CustomContainer>

      <ContainerAdvertisement>
        <Advertisement.AppAdvertising />
        {props.advertisement.bigBanner?.[1] ? (
          <Advertisement.HorizontAdvertisement {...props.advertisement.bigBanner?.[1]} />
        ) : null}
      </ContainerAdvertisement>

      <CustomContainer padding="sm" paddingMB={"lg"}>
        <SeoText.SeoTextPolzaru />
      </CustomContainer>

      <CustomContainer padding={"sm"} paddingMB={"md"}>
        <Brands brands={props.brands} />
      </CustomContainer>

      <CustomContainer padding={"sm"} paddingMB={"md"}>
        <MetaCatalogue.AlphabeticalLink category={props.categoryMetaCatalogue} />
      </CustomContainer>
    </ContainerArticle>
  );
}

Index.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/" });
    const [
      categories,
      marketingBigBanners,
      marketingSmallBanners,
      sales,
      articles,
      brands,
      advertisement,
      products,
      discountedProducts,
      reviews,
      categoryMetaCatalogue,
    ] = await Promise.allSettled([
      getCategoriesSlider(),
      getMarketingBigBanners(),
      getMarketingSmallBanners(),
      getSalesList({}),
      getArticlesList({}),
      getBrands(),
      getAdvertisement(),
      getProducts({ limit: 8 }),
      getProducts({ isHaveDiscount: "true" }),
      getStoryReviews(),
      getCategoryMetaCatalogue(),
    ]);

    //todo костыль чтобы добавить продукты в моки рекламы
    const advertisementBanner =
      advertisement.status === "fulfilled"
        ? {
            ...advertisement.value,
            verticalBanner: advertisement.value.verticalBanner.map((el) => ({
              ...el,
              products: products.status === "fulfilled" ? products.value.data.items : [],
            })),
          }
        : {};

    return {
      props: {
        categories: categories.status === "fulfilled" ? categories.value.data.items : [],
        marketing: {
          bigBanner: marketingBigBanners.status === "fulfilled" ? marketingBigBanners.value : [],
          smallBanner:
            marketingSmallBanners.status === "fulfilled" ? marketingSmallBanners.value : [],
        },
        sales: sales.status === "fulfilled" ? sales.value : [],
        articles: articles.status === "fulfilled" ? articles.value : [],
        brands: brands.status === "fulfilled" ? brands.value : [],
        advertisement: advertisementBanner,
        discountedProducts:
          discountedProducts.status === "fulfilled" ? discountedProducts.value.data.items : [],
        reviews: reviews.status === "fulfilled" ? reviews.value : [],
        categoryMetaCatalogue:
          categoryMetaCatalogue.status === "fulfilled" ? categoryMetaCatalogue.value : [],

        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};

const ContainerArticle = styled.article`
  @import "variables";

  margin-bottom: 60px;

  @include respond-to(small) {
    margin-bottom: 36px;
  }
`;

const CustomContainer = styled(Container)<{
  padding?: "sm" | "md" | "lg";
  paddingMB?: "sm" | "md" | "xmd" | "lg" | "xlg";
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
    &.paddingMB-sm {
      padding-top: 8px;
    }
    &.paddingMB-md {
      padding-top: 12px;
    }
    &.paddingMB-xmd {
      padding-top: 20px;
    }
    &.paddingMB-lg {
      padding-top: 36px;
    }
    &.paddingMB-xlg {
      padding-top: 44px;
    }
  }
`;

const ContainerAdvertisement = styled(Container)`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr 376px;
  grid-column-gap: 20px;
  padding-top: 20px;

  @include respond-to(small) {
    padding-top: 12px;
    grid-template-columns: 1fr;
    grid-row-gap: 12px;
  }
`;

const ContainerTitleCategory = styled.div`
  @import "variables";

  display: none;

  @include respond-to(small) {
    display: block;
    margin-bottom: 12px;
  }
`;
