import styled from "astroturf/react";
import { Brands } from "common/components/brand/Brands";
import { Button } from "common/components/Button";
import { Container } from "common/components/Container";
import { AppContext } from "common/components/ContextProvider";
import { HelpfulProductInCart } from "common/components/HelpfulProductInCart";
import { NextImage } from "common/components/NextImage";
import { BrandT } from "common/interfaces/brand";
import { ModalNames } from "common/interfaces/modal";
import { Advertisement } from "modules/advertisement/components/Advertisement ";
import { AdvertisementAllBannersT } from "modules/advertisement/interfaces/advertisementBanner";
import { Auth } from "modules/auth/components/Auth";
import { Category } from "modules/categories/components/Category";
import { CategoryT } from "modules/categories/interfaces/category";
import { ProductT } from "modules/products/interfaces/product";
import { SeoText } from "modules/seo/components/SeoText";
import { useContext } from "react";

type Props = {
  brands: BrandT[];
  advertisement: AdvertisementAllBannersT;
  products?: ProductT[];
  categories?: CategoryT[];
};

export const OrdersEmpty = ({ brands, advertisement, products, categories }: Props) => {
  const { openModal } = useContext(AppContext);
  return (
    <Conteiner>
      <OrdersEmptyBlock>
        <ImageContainer>
          <NextImage src={"/images/auth.png"} alt={"empty"} />
        </ImageContainer>
        <EmptyTitle>Заказы только для авторизованных</EmptyTitle>
        <EmptyText>Войдите на сайт, чтобы увидеть свои заказы</EmptyText>
        <CustomButton
          typeBtn={"blue"}
          onClick={() =>
            openModal(ModalNames.POPUP_MODAL, {
              children: <Auth.AuthModal />,
            })
          }
        >
          Войти{" "}
        </CustomButton>
      </OrdersEmptyBlock>

      {categories ? (
        <CategoryBlock>
          <Category.Swiper categoriesList={categories} type="md" />
        </CategoryBlock>
      ) : null}

      {products ? (
        <ProductsBlock>
          <HelpfulProductInCart products={products} title={"Подобрали специально для вас"} />
        </ProductsBlock>
      ) : null}

      <ContainerAdvertisement>
        <Advertisement.AppAdvertising />
        {advertisement.bigBanner?.[1] ? (
          <Advertisement.HorizontAdvertisement {...advertisement.bigBanner?.[1]} />
        ) : null}
      </ContainerAdvertisement>

      <SeoBlock>
        <SeoText.SeoTextPolzaru />
      </SeoBlock>

      <BrandsBlock>
        <Brands brands={brands} />
      </BrandsBlock>
    </Conteiner>
  );
};
const Conteiner = styled.section`
  @import "variables";
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 12px;
  @include respond-to(small) {
    margin-bottom: 36px;
  }
`;

const OrdersEmptyBlock = styled.section`
  @import "variables";
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 88px;
  @include respond-to(small) {
    margin-top: 48px;
  }
`;

const ImageContainer = styled.div`
  @import "variables";

  width: 220px;
  height: 220px;

  @include respond-to(small) {
    width: 180px;
    height: 180px;
  }
`;

const EmptyTitle = styled.h1`
  @import "variables";
  margin: 20px 0 0 0;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  @include respond-to(small) {
    margin: 12px 0 0 0;
    font-weight: 600;
    font-size: 20px;
    line-height: 137%;
  }
`;

const EmptyText = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  margin-top: 12px;
  @include respond-to(small) {
    font-size: 13px;
    line-height: 20px;
    margin-top: 16px;
  }
`;

const CustomButton = styled(Button)`
  @import "variables";
  width: fit-content;
  padding: 16.5px 40px;
  margin-top: 20px;
  @include respond-to(small) {
    padding: 17px 0;
    width: 100%;
    margin-top: 24px;
  }
`;

const CategoryBlock = styled.section`
  @import "variables";
  margin-top: 68px;
  @include respond-to(small) {
    margin-top: 56px;
  }
`;

const ProductsBlock = styled.section`
  @import "variables";
  margin-top: 20px;
  @include respond-to(small) {
    margin-top: 28px;
  }
`;

const ContainerAdvertisement = styled(Container)`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr 376px;
  grid-column-gap: 20px;
  padding-top: 40px;

  @include respond-to(small) {
    display: none;
  }
`;

const SeoBlock = styled.section`
  @import "variables";
  margin-top: 12px;
  @include respond-to(small) {
    display: none;
  }
`;

const BrandsBlock = styled.section`
  @import "variables";
  margin-top: 32px;
  @include respond-to(small) {
    display: none;
  }
`;
