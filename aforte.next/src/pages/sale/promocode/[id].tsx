import styled from "astroturf/react";
import { GetServerSideProps } from "next";
import { SaleDetailsT, SaleT } from "../../../modules/sale/interfaces/sale";
import { getSalePromoCodeById, getSalesList } from "../../../api/saleApi";
import { getLayout } from "../../../common/components/layout/Layout";
import { Container } from "../../../common/components/Container";
import { Breadcrumbs } from "../../../common/components/Breadcrumbs";
import { Sale } from "../../../modules/sale/component/Sale";
import { SwiperWithButtonTop } from "../../../modules/slider/components/SwiperWithButtonTop";
import { CustomSwiper } from "../../../modules/slider/components/CustomSwiper";
import { getInitialData } from "../../../common/hooks/useInitialData";

const breadcrumbs = [
  { title: "Главная", link: "/" },
  { title: "Блог", link: "blog" },
  { title: "Полезные статьи", link: "/" },
];

type Props = {
  salePromoCode: SaleDetailsT;
  sales: SaleT[];
};

export default function SalePromoCodePage(props: Props) {
  return (
    <ContainerArticle>
      <ContainerCustom padding={"sm"} paddingMB={"sm"}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </ContainerCustom>
      <ContainerCustom>
        <Sale.SaleDetailsCard isPromocode saleDetails={props.salePromoCode} />
      </ContainerCustom>
      <ContainerCustom padding={"md"} paddingMB={"lg"}>
        <SwiperWithButtonTop<SaleT>
          id={"catalog-promotions-slider"}
          sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
          items={props.sales}
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
    </ContainerArticle>
  );
}

SalePromoCodePage.getLayout = getLayout;

const ContainerArticle = styled.article`
  @import "variables";

  margin-bottom: 18px;

  @include respond-to(small) {
    margin-bottom: 36px;
  }
`;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({
      pathname: "/sale/promocode/id",
    });
    const [salePromoCode, sales] = await Promise.allSettled([
      getSalePromoCodeById("saleId"),
      getSalesList({ saleId: "saleId" }),
    ]);

    return {
      props: {
        salePromoCode: salePromoCode.status === "fulfilled" ? salePromoCode.value : {},
        sales: sales.status === "fulfilled" ? sales.value : [],
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};

const ContainerCustom = styled(Container)<{
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
