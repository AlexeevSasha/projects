import { getProducts } from "api/productsApi";
import { getUser } from "api/userApi";
import { getUserOrders } from "api/userOrdersApi";
import styled from "astroturf/react";
import { IconOrder } from "common/components/icons/IconOrder";
import { IconPointsCircle } from "common/components/icons/IconPoints";
import { IconShop } from "common/components/icons/IconShop";
import { getProfileLayout } from "common/components/layout/ProfileLayout";
import { TitleWithButtonTop } from "common/components/TitleWithButtonTop";
import { ProductT } from "modules/products/interfaces/product";
import { Profile } from "modules/profile/components/Profile";
import { UserT } from "modules/profile/interfaces/user";
import { UserOrderT } from "modules/profile/interfaces/userOrders";
import { SwiperWithButtonTop } from "modules/slider/components/SwiperWithButtonTop";
import { GetServerSideProps } from "next";
import { Product } from "../../modules/products/components/Product";
import { Advertisement } from "../../modules/advertisement/components/Advertisement ";
import { getInitialData } from "common/hooks/useInitialData";


type Props = {
  products: ProductT[];
  user: UserT;
  userOrders: UserOrderT[];
};

export default function ProfilePage(props: Props) {
  return (
    <>
      <ProfileMobile>
        <Profile.ProfileInfoMobile user={props.user} />
      </ProfileMobile>
      <MobileReversWrapper>
        <CardBlock>
          <Profile.ProfileCard
            icon={<IconOrder />}
            title={`${props.userOrders.length} заказов`}
            description={"Ближайшая доставка завтра"}
            order
          />
          <Profile.ProfileCard
            icon={<IconShop />}
            title={"Мои аптеки"}
            description={"В избранном нет аптек"}
          />
          <Profile.ProfileCard
            icon={<IconPointsCircle />}
            title={`${props.user.points} баллов`}
            description={"1 балл = 1 рубль"}
          />
        </CardBlock>
        <Profile.ProfileBanner />
        <ProfileMobile>
          <Profile.ProfileMobileMenu points={props.user.points} />
        </ProfileMobile>
        {props.userOrders && (
          <SwiperWithButtonTop<UserOrderT>
            mobileDisplayNoneTitle
            slidesPerView={1}
            id={"dad"}
            title="Ближайшие доставки"
            link={"/profile/orders"}
            items={props.userOrders}
            pagination={false}
            breakpoints={{
              0: {
                slidesPerView: 1.1,
                spaceBetween: 8,
              },
              767: {
                spaceBetween: 8,
                slidesPerView: 1,
              },
            }}
          >
            {(param) => <Profile.OrderCard props={param} />}
          </SwiperWithButtonTop>
        )}
        {true && (
          <AdverstimsementBlock>
            <Advertisement.HorizontAdvertisement
              desktopImage={"/mockImages/horizontalBanner.png"}
              mobileImage={"/mockImages/horizontalBanner.png"}
              id={"profile"}
            />
          </AdverstimsementBlock>
        )}
        <CustomTitleWithButtonTop>
          <TitleWithButtonTop title={"Рекомендации для вас"} />
        </CustomTitleWithButtonTop>
        <ProductCardWrapper>
          {props.products.slice(0, 8).map((product, item) => (
            <Product.Card {...product} key={item} />
          ))}
        </ProductCardWrapper>
        <AppAdvertisingBlock>
          <Advertisement.AppAdvertising />
        </AppAdvertisingBlock>
      </MobileReversWrapper>
    </>
  );
}

ProfilePage.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/profile" });
    const [products, user, userOrders] = await Promise.allSettled([
      getProducts(query),
      getUser(),
      getUserOrders(),
    ]);
    return {
      props: {
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

const ProfileMobile = styled.div`
  @import "variables";
  display: none;
  @include respond-to(small) {
    display: block;
  }
`;

const MobileReversWrapper = styled.div`
  @import "variables";
  @include respond-to(small) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const CardBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  width: 100%;

  @include respond-to(medium) {
    flex-direction: column;
  }
  @include respond-to(small) {
    display: none;
  }
`;

const AdverstimsementBlock = styled.div`
  @import "variables";
  padding: 20px 0px 40px 0;
  @include respond-to(small) {
    display: none;
  }
`;

const CustomTitleWithButtonTop = styled.div`
  @import "variables";
  width: fit-content;
  margin-bottom: 20px;
  @include respond-to(small) {
    display: none;
  }
`;

const ProductCardWrapper = styled.div`
  @import "variables";
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  margin-bottom: 40px;
  @include respond-to(small) {
    display: none;
  }
`;

const AppAdvertisingBlock = styled.div`
  @import "variables";
  margin-bottom: 40px;
  @include respond-to(small) {
    display: none;
  }
`;
