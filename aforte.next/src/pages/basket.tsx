import { getBrands } from "api/brandsApi";
import { getCategories } from "api/categoriesApi";
import { getProducts, getProductsById } from "api/productsApi";
import styled from "astroturf/react";
import { ContainerArticle } from "common/components/Container";
import { getLayout } from "common/components/layout/Layout";
import { BrandT } from "common/interfaces/brand";
import { CategoryT } from "modules/categories/interfaces/category";
import { EmptyScreen } from "modules/emptyScreens/components/emptyScreen";
import { ProductT } from "modules/products/interfaces/product";
import { GetServerSideProps } from "next";
import { getCart } from "../api/cartApi";
import { SavePoints } from "../common/components/SavePoints";
import { TitleH1 } from "../common/components/TitleH1";
import { Cart } from "../modules/cart/components/Cart";
import { CartT } from "../modules/cart/interfaces/cart";
import { Product } from "../modules/products/components/Product";
import { CustomSwiper } from "../modules/slider/components/CustomSwiper";
import { SwiperWithButtonTop } from "../modules/slider/components/SwiperWithButtonTop";
import { useContext, useEffect, useState } from "react";
import { PharmaciesT } from "../modules/profile/interfaces/pharmacies";
import { getPharmacies, getPharmaciesFavourites, getPharmaciesStory } from "../api/pharmaciesApi";
import { TypeOfDeliveryT } from "../modules/orders/interfaces/order";
import { AppContext } from "../common/components/ContextProvider";
import { useRouter } from "next/router";
import { getCookie } from "../common/utils/getCookie";
import { getInitialData } from "../common/hooks/useInitialData";

type Props = {
  categories?: CategoryT[];
  products: ProductT[];
  brands: BrandT[];
  cart: CartT;
  pharmacies: PharmaciesT[];
  pharmaciesFavourites: PharmaciesT[];
  pharmaciesOrderHistories: PharmaciesT[];
  isEmpty?: boolean;
};

export default function CartPage(props: Props) {
  const router = useRouter();
  const { allProductIdsBasket } = useContext(AppContext);
  const [typeDelivery, setTypeDelivery] = useState<TypeOfDeliveryT>("self");
  const [productsInBasket, setProductsInBasket] = useState<ProductT[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (allProductIdsBasket.length) {
      if (router?.query?.isEmpty) {
        router?.push({
          query: { ...router.query, isEmpty: [] },
        });
      }
      setLoading(true);
      const products = allProductIdsBasket.map((id) => getProductsById(id).then((res) => res.data));
      Promise.all(products).then((data) => {
        setLoading(false);
        setProductsInBasket(data as any);
      });
    } else {
      if (!JSON.parse(getCookie("basket") || "[]").length) {
        router?.push({
          query: { ...router.query, isEmpty: "true" },
        });
      }
    }
  }, [allProductIdsBasket.length]);

  return props.isEmpty ? (
    <EmptyScreen.Basket
      brands={props.brands}
      categories={props.categories}
      products={props.products}
    />
  ) : (
    <ContainerArticleCustom>
      <ContainerTitle>
        <TitleH1 smallText={"6 товаров"} title={"Корзина"} />
        <Cart.DeliveryMethod typeDelivery={typeDelivery} setTypeDelivery={setTypeDelivery} />
      </ContainerTitle>
      {Array.from(allProductIdsBasket).length ? (
        <CustomContainer padding={"sm"} paddingMb={"sm"}>
          {loading ? (
            <ContainerSkeleton>
              {[...Array(Array.from(allProductIdsBasket).length)].map(Cart.CartProductSceleton)}
            </ContainerSkeleton>
          ) : (
            <Cart.AvailabilityProducts product={productsInBasket} />
          )}
        </CustomContainer>
      ) : null}

      <CustomContainer padding={"sm"} paddingMb={"sm"}>
        <SavePoints />
      </CustomContainer>
      <PositionAside>
        <Cart.CartTotalPrice
          pharmacies={props.pharmacies}
          pharmaciesOrderHistories={props.pharmaciesOrderHistories}
          pharmaciesFavourites={props.pharmaciesOrderHistories}
          cart={props.cart}
          typeDelivery={typeDelivery}
        />

        <Cart.PromoCode />
      </PositionAside>
      <CustomContainer padding={"lg"} paddingMb={"lg"}>
        <SwiperWithButtonTop<ProductT>
          id={"product-carts-slider"}
          items={props.products}
          title={"Вам может пригодиться"}
          sliderSettings={{ desktopSB: 16, mobileSB: 8 }}
        >
          {(param) => (
            <CustomSwiper.SlideOfProduct>
              <Product.Card {...param} />
            </CustomSwiper.SlideOfProduct>
          )}
        </SwiperWithButtonTop>
      </CustomContainer>
      <Cart.CartTotalPrice
        isButtonFix
        pharmacies={props.pharmacies}
        pharmaciesOrderHistories={props.pharmaciesOrderHistories}
        pharmaciesFavourites={props.pharmaciesOrderHistories}
        cart={props.cart}
        typeDelivery={typeDelivery}
      />
    </ContainerArticleCustom>
  );
}

CartPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({
      pathname: "/basket",
    });
    if (query.isEmpty || !JSON.parse(req.cookies?.basket || "[]").length) {
      const [categories, products, brands] = await Promise.allSettled([
        getCategories({ parent: null }),
        getProducts({ page: 1, limit: 10 }),
        getBrands(),
      ]);
      return {
        props: {
          categories: categories.status === "fulfilled" ? categories.value.data.items : [],
          products: products.status === "fulfilled" ? products.value.data.items : [],
          brands: brands.status === "fulfilled" ? brands.value : [],
          initialData: { metaTags, ...initialData },
          isEmpty: true,
        },
      };
    }

    const [products, cart, pharmacies, pharmaciesFavourites, pharmaciesOrderHistories] =
      await Promise.allSettled([
        getProducts({ page: 1, limit: 10 }),
        getCart("id"),
        getPharmacies(),
        getPharmaciesFavourites(),
        getPharmaciesStory(),
      ]);

    return {
      props: {
        cart: cart.status === "fulfilled" ? cart.value : {},
        pharmacies: pharmacies.status === "fulfilled" ? pharmacies.value.data.items : [],
        pharmaciesFavourites:
          pharmaciesFavourites.status === "fulfilled" ? pharmaciesFavourites.value : [],
        pharmaciesOrderHistories:
          pharmaciesOrderHistories.status === "fulfilled" ? pharmaciesOrderHistories.value : [],
        products: products.status === "fulfilled" ? products.value.data.items : [],
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};

const ContainerArticleCustom = styled(ContainerArticle)`
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
    margin-bottom: 20px;
  }
`;

const ContainerTitle = styled.section`
  @import "variables";

  padding-top: 20px;
  h1 {
    padding-bottom: 20px;
  }

  @include respond-to(small) {
    border-radius: 28px;
    background: white;
    padding: 0;
    margin-top: 8px;
    h1 {
      padding: 20px 20px 0;
    }
  }
`;

const PositionAside = styled.aside`
  @import "variables";

  display: grid;
  grid-gap: 20px;
  width: 100%;
  padding-top: 20px;

  @media (min-width: 1199px) {
    padding-top: 0;
    margin-top: 80px;
    grid-column: 2 !important;
    grid-row-start: 1;
    grid-row-end: 3;
    position: sticky;
    top: 100px;
  }

  @include respond-to(small) {
    padding-top: 8px;
    grid-gap: 8px;
    & > div:last-child {
      grid-row: 1;
    }
  }
`;

const CustomContainer = styled.section<{
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

const ContainerSkeleton = styled.div`
  display: grid;
  grid-row-gap: 8px;
`;
