import { getLayout } from "../../common/components/layout/Layout";
import { ContainerArticle } from "../../common/components/Container";
import { GetServerSideProps } from "next";
import { TitleH1 } from "../../common/components/TitleH1";
import { Breadcrumbs } from "../../common/components/Breadcrumbs";
import { getSaleById, getSaleListFilter, getSalesList } from "../../api/saleApi";
import { FiltersT } from "../../modules/filters/interfaces/filters";
import { Filters } from "../../modules/filters/components/Filters";
import styled from "astroturf/react";
import { Sale } from "../../modules/sale/component/Sale";
import { SaleDetailsT, SaleT } from "../../modules/sale/interfaces/sale";
import { SeoText } from "../../modules/seo/components/SeoText";
import { CustomSwiper } from "../../modules/slider/components/CustomSwiper";
import { SwiperWithButtonTop } from "../../modules/slider/components/SwiperWithButtonTop";
import { Product } from "../../modules/products/components/Product";
import { getProducts } from "../../api/productsApi";
import { ProductT } from "../../modules/products/interfaces/product";
import { SaleSearch } from "../../modules/sale/component/SaleSearch";
import { Advertisement } from "../../modules/advertisement/components/Advertisement ";
import { getInitialData } from "../../common/hooks/useInitialData";

const breadcrumbs = [
  { title: "Главная", link: "/" },
  { title: "Блог", link: "blog" },
  { title: "Полезные статьи", link: "/" },
];

type Props = {
  similarSales: SaleT[];
  filters: FiltersT[];
  saleDetails: SaleDetailsT;
  products: ProductT[];
};

export default function SaleByIdPage(props: Props) {
  return (
    <>
      <ContainerArticle>
        <ContainerCustom padding={"sm"} paddingMB={"sm"}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </ContainerCustom>
        <ContainerCustom>
          <Sale.SaleDetailsCard saleDetails={props.saleDetails} />
        </ContainerCustom>
        <ContainerCustom padding={"sm"} paddingMB={"md"}>
          <TitleH1 title={"Товары, участвующие в акции"} smallText={"326 товаров"} />
        </ContainerCustom>
      </ContainerArticle>
      <ContainerContent>
        <Filters.FiltersDesktop filters={props.filters} />
        <div>
          <ContainerTags>
            <Filters.Sorting />
            <Filters.FilterTags />
            <Filters.FiltersMobile filters={props.filters} />
          </ContainerTags>
          <ContainerSearch>
            <SaleSearch />
          </ContainerSearch>
          <ContainerCustom padding={"sm"} paddingMB={"sm"}>
            <Product.ProductsGrid products={props.products} />
          </ContainerCustom>
          <ContainerCustom padding={"lg"} paddingMB={"lg"}>
            <SwiperWithButtonTop<SaleT>
              id={"catalog-promotions-slider"}
              sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
              items={props.similarSales}
              title={"Похожие акции"}
              link={"/sale"}
            >
              {(param) => (
                <CustomSwiper.SlideOfSale>
                  <Sale.SaleCard {...param} />
                </CustomSwiper.SlideOfSale>
              )}
            </SwiperWithButtonTop>
          </ContainerCustom>
          <ContainerCustom padding={"sm"} paddingMB={"lg"}>
            <SeoText.ParagraphSeo>
              Купить препараты из раздела Лекарственные препараты в Москве по доступной цене. Часто
              спрашивают товары: Тантум Верде, Гексорал, Аджисепт, спрей Стрепсилс. Инструкции по
              применению, состав, показания и противопоказания, аналоги лекарственных средства в
              каталоге интернет-аптеки Форте.
            </SeoText.ParagraphSeo>
          </ContainerCustom>
          <ContainerCustom padding={"md"} paddingMB={"lg"}>
            <Advertisement.AppAdvertising />
          </ContainerCustom>
        </div>
      </ContainerContent>
    </>
  );
}

SaleByIdPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/sale/id" });
    const [similarSales, filters, saleDetails, products] = await Promise.allSettled([
      getSalesList({ saleId: "1" }),
      getSaleListFilter(),
      getSaleById("saleId"),
      getProducts({}),
    ]);

    return {
      props: {
        similarSales: similarSales.status === "fulfilled" ? similarSales.value : [],
        filters: filters.status === "fulfilled" ? filters.value.data : [],
        saleDetails: saleDetails.status === "fulfilled" ? saleDetails.value : {},
        products: products.status === "fulfilled" ? products.value.data.items : [],
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
  margin-top: 20px;

  @include respond-to(medium) {
    grid-template-columns: 300px minmax(300px, 1fr);
    margin-top: 12px;
  }

  @include respond-to(small) {
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

const ContainerSearch = styled.div`
  @import "variables";

  display: none;
  margin-top: 12px;

  @include respond-to(small) {
    display: block;
  }
`;

const ContainerCustom = styled.section<{
  padding?: "sm" | "md" | "lg";
  paddingMB?: "sm" | "md" | "lg";
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
      padding-top: 24px;
    }
    &.paddingMB-lg {
      padding-top: 36px;
    }
  }
`;
