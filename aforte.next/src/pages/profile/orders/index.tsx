import { getAdvertisement } from "api/advertisementApi";
import { getBrands } from "api/brandsApi";
import { getProducts } from "api/productsApi";
import { getUser } from "api/userApi";
import { getUserOrders } from "api/userOrdersApi";
import styled from "astroturf/react";
import { getProfileLayout } from "common/components/layout/ProfileLayout";
import { TitleH1 } from "common/components/TitleH1";
import { BrandT } from "common/interfaces/brand";
import { EmptyScreen } from "modules/emptyScreens/components/emptyScreen";
import { Sorting } from "modules/filters/components/Sorting";
import { Product } from "modules/products/components/Product";
import { ProductT } from "modules/products/interfaces/product";
import { Profile } from "modules/profile/components/Profile";
import { UserT } from "modules/profile/interfaces/user";
import { UserOrderT } from "modules/profile/interfaces/userOrders";
import { SaleSearch } from "modules/sale/component/SaleSearch";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Advertisement } from "../../../modules/advertisement/components/Advertisement ";
import { AdvertisementAllBannersT } from "modules/advertisement/interfaces/advertisementBanner";
import { CategoryT } from "modules/categories/interfaces/category";
import { getCategories } from "api/categoriesApi";
import { getInitialData } from "common/hooks/useInitialData";

type Props = {
  isEmpty: boolean;
  user: UserT;
  userOrders: UserOrderT[];
  products: ProductT[];
  brands: BrandT[];
  advertisement: AdvertisementAllBannersT;
  categories?: CategoryT[];
};

export default function OrdersPage(props: Props) {
  const [checked, setChecked] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked);
  return props.isEmpty ? (
    <EmptyScreen.OrdersEmpty
      brands={props.brands}
      advertisement={props.advertisement}
      products={props.products}
      categories={props.categories}
    />
  ) : (
    <>
      <FilterBlock>
        <TextBlock>
          <TextBlockMobile>
            <TitleH1 title={"Мои заказы"} />
            <OrdersCount>{props.userOrders.length} заказов</OrdersCount>
          </TextBlockMobile>
          <SortingBlockMobile>
            <Sorting noneTitleMobile />
          </SortingBlockMobile>
        </TextBlock>
        <Profile.ProfileSwitch id="orders" checked={checked} onChange={(e) => onChange(e)} />
      </FilterBlock>
      {checked && <SaleSearch placeholder="Найти товар" />}
      {checked && (
        <SortingBlock>
          <Sorting />
        </SortingBlock>
      )}
      {checked ? (
        <ProductCardWrapper>
          {props.products.map((product, item) => (
            <Product.Card {...product} key={item} />
          ))}
        </ProductCardWrapper>
      ) : (
        <div>
          {props.userOrders.map((param, index) => (
            <Link href={`orders/${param.id}`} key={index}>
              <OrderCardWrapper>
                <Profile.OrderCard props={param} orderPage />
              </OrderCardWrapper>
            </Link>
          ))}
        </div>
      )}
      <AppAdvertisingBlock>
        <Advertisement.AppAdvertising />
      </AppAdvertisingBlock>
    </>
  );
}

OrdersPage.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/profile/orders" });
    if (query.isEmpty) {
      const [brands, advertisement, products, categories] = await Promise.allSettled([
        getBrands(),
        getAdvertisement(),
        getProducts({ page: 1, limit: 10 }),
        getCategories({ parent: null }),
      ]);
      //todo костыль чтобы добавить продукты в моки рекламы
      const advertisementBanner =
        advertisement.status === "fulfilled"
          ? {
            ...advertisement.value,
            verticalBanner: advertisement.value.verticalBanner.map((el) => ({
              ...el,
            })),
          }
          : {};

      return {
        props: {
          isEmpty: true,
          brands: brands.status === "fulfilled" ? brands.value : [],
          advertisement: advertisementBanner,
          products: products.status === "fulfilled" ? products.value.data.items : [],
          categories: categories.status === "fulfilled" ? categories.value.data.items : [],
          initialData: { metaTags, ...initialData },
        },
      };
    }
    const [products, user, userOrders] = await Promise.allSettled([
      getProducts(query),
      getUser(),
      getUserOrders(),
    ]);
    return {
      props: {
        isEmpty: false,
        products: products.status === "fulfilled" ? products.value.data.items : [],
        user: user.status === "fulfilled" ? user.value : [],
        userOrders: userOrders.status === "fulfilled" ? userOrders.value : [],
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};

const AppAdvertisingBlock = styled.div`
  @import "variables";
  margin-bottom: 40px;
  margin-top: 20px;
  @include respond-to(small) {
    display: none;
  }
`;

const FilterBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  @include respond-to(medium) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 12px;
  }
`;

const TextBlock = styled.div`
  @import "variables";
  display: flex;
  align-items: baseline;
  @include respond-to(medium) {
    margin-bottom: 12px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

const OrdersCount = styled.span`
  @import "variables";
  margin-left: 6px;
  font-weight: 500;
  font-size: 15px;
  opacity: 0.3;
  @include respond-to(small) {
    margin-left: 2px;
  }
`;

const SortingBlock = styled.div`
  @import "variables";
  margin: 20px 0px;
  @include respond-to(small) {
    display: none;
  }
`;

const SortingBlockMobile = styled.div`
  @import "variables";
  display: none;
  @include respond-to(small) {
    display: block;
  }
`;

const TextBlockMobile = styled.div`
  display: flex;
  align-items: baseline;
`;

const ProductCardWrapper = styled.div`
  @import "variables";
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  margin-bottom: 20px;
  @include respond-to(small) {
    margin-top: 12px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    grid-column-gap: 8px;
    grid-row-gap: 8px;
  }
`;

const OrderCardWrapper = styled.div`
  @import "variables";
  margin-bottom: 12px;
  @include respond-to(small) {
    margin-bottom: 8px;
  }
`;
