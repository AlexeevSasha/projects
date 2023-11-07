import { getLayout } from "../../common/components/layout/Layout";
import { ContainerArticle } from "../../common/components/Container";
import { GetServerSideProps } from "next";
import { TitleH1 } from "../../common/components/TitleH1";
import { Breadcrumbs } from "../../common/components/Breadcrumbs";
import { getCategoryListSale, getSaleListFilter, getSalesList } from "../../api/saleApi";
import { FiltersT } from "../../modules/filters/interfaces/filters";
import { Filters } from "../../modules/filters/components/Filters";
import styled from "astroturf/react";
import { Sale } from "../../modules/sale/component/Sale";
import { SaleT } from "../../modules/sale/interfaces/sale";
import { SeoText } from "../../modules/seo/components/SeoText";
import { ListOfCategoryButtons } from "../../common/components/listOfCategoryButtons/ListOfCategoryButtons";
import { CategoryButtonT } from "../../common/interfaces/categoryButton";
import { Advertisement } from "../../modules/advertisement/components/Advertisement ";
import { getInitialData } from "../../common/hooks/useInitialData";

const breadcrumbs = [
  { title: "Главная", link: "/" },
  { title: "Блог", link: "blog" },
  { title: "Полезные статьи", link: "/" },
];

type Props = {
  filters: FiltersT[];
  categoryListSale: CategoryButtonT[];
  sales: SaleT[];
};

export default function SalePage(props: Props) {
  return (
    <>
      <ContainerArticle>
        <ContainerCustom padding={"sm"} paddingMb={"md"}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </ContainerCustom>
        <ContainerCustom>
          <TitleH1 title={"Акции"} smallText={"26 акций"} />
        </ContainerCustom>
        <ContainerCustom padding={"xsm"}>
          <ListOfCategoryButtons categoriesList={props.categoryListSale} />
        </ContainerCustom>
      </ContainerArticle>
      <ContainerContent>
        <Filters.FiltersDesktop filters={props.filters} />
        <div>
          <ContainerFilterTags>
            <Filters.FilterTags textAlign={"start"} />
            <Sale.SaleGrid sales={props.sales} />
          </ContainerFilterTags>
          <ContainerCustom padding={"md"} paddingMb={"md"}>
            <SeoText.ParagraphSeo>
              Купить препараты из раздела Лекарственные препараты в Москве по доступной цене. Часто
              спрашивают товары: Тантум Верде, Гексорал, Аджисепт, спрей Стрепсилс. Инструкции по
              применению, состав, показания и противопоказания, аналоги лекарственных средства в
              каталоге интернет-аптеки Форте.
            </SeoText.ParagraphSeo>
          </ContainerCustom>
          <ContainerCustom padding={"md"} paddingMb={"md"}>
            <Advertisement.AppAdvertising />
          </ContainerCustom>
        </div>
      </ContainerContent>
    </>
  );
}

SalePage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/sale" });
    const [filters, categoryListSale, sales] = await Promise.allSettled([
      getSaleListFilter(),
      getCategoryListSale(),
      getSalesList({}),
    ]);

    return {
      props: {
        filters: filters.status === "fulfilled" ? filters.value.data : [],
        categoryListSale: categoryListSale.status === "fulfilled" ? categoryListSale.value : [],
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
  margin-bottom: 40px;
  margin-top: 20px;

  @include respond-to(large) {
    grid-template-columns: 300px minmax(300px, 1fr);
  }

  @include respond-to(small) {
    margin-top: 8px;
    margin-bottom: 36px;
    grid-template-columns: minmax(300px, 1fr);
  }
`;

const ContainerFilterTags = styled.div`
  display: grid;
  grid-row-gap: 24px;
`;

const ContainerCustom = styled.section<{
  padding?: "xsm" | "sm" | "md";
  paddingMb?: "sm" | "md";
}>`
  @import "variables";

  &.padding-xsm {
    padding-top: 8px;
  }
  &.padding-sm {
    padding-top: 20px;
  }
  &.padding-md {
    padding-top: 40px;
  }

  @include respond-to(small) {
    &.paddingMb-sm {
      padding-top: 12px;
    }
    &.paddingMb-md {
      padding-top: 24px;
    }
  }
`;
