import styled from "astroturf/react";
import { Brands } from "common/components/brand/Brands";
import { ContainerArticle } from "common/components/Container";
import { HelpfulProductInCart } from "common/components/HelpfulProductInCart";
import { BrandT } from "common/interfaces/brand";
import { Advertisement } from "modules/advertisement/components/Advertisement ";
import { Cart } from "modules/cart/components/Cart";
import { Category } from "modules/categories/components/Category";
import { CategoryT } from "modules/categories/interfaces/category";
import { ProductT } from "modules/products/interfaces/product";
import { SeoText } from "modules/seo/components/SeoText";

type Props = {
  categories?: CategoryT[];
  products?: ProductT[];
  brands: BrandT[];
};

export const EmptyBasket = (props: Props) => {
  return (
    <ContainerArticleCustom>
      <CustomContainer>
        <Cart.Empty />
      </CustomContainer>

      {props.categories ? (
        <CustomContainer paddingMb="md">
          <Category.Swiper categoriesList={props.categories} type="md" />
        </CustomContainer>
      ) : null}
      {props.products ? (
        <CustomContainer padding="sm" paddingMb="lg">
          <HelpfulProductInCart products={props.products} title={"Может вам пригодится"} />
        </CustomContainer>
      ) : null}

      <CustomContainer padding="md" mobile="hide">
        <Advertisement.AppAdvertising />
      </CustomContainer>

      <CustomContainer padding="sm" mobile="hide">
        <SeoText.SeoTextPolzaru />
      </CustomContainer>

      <CustomContainer mobile="hide">
        <Brands brands={props.brands} />
      </CustomContainer>
    </ContainerArticleCustom>
  );
};

const ContainerArticleCustom = styled(ContainerArticle)`
  @import "variables";

  margin-bottom: 60px;

  @include respond-to(large) {
    margin-bottom: 28px;
  }
`;

const CustomContainer = styled.section<{
  padding?: "sm" | "md" | "lg";
  paddingMb?: "sm" | "md" | "lg";
  mobile?: "hide";
}>`
  @import "variables";

  &.padding-sm {
    padding-top: 20px;
  }
  &.padding-md {
    padding-top: 40px;
  }

  @include respond-to(small) {
    &.paddingMb-sm {
      padding-top: 8px;
    }
    &.paddingMb-md {
      padding-top: 16px;
    }
    &.paddingMb-lg {
      padding-top: 28px;
    }
    &.mobile-hide {
      display: none;
    }
  }
`;
