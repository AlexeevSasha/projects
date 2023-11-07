import { ContainerArticle } from "common/components/Container";
import { getLayout } from "common/components/layout/Layout";
import { TitleH1 } from "../../common/components/TitleH1";
import { Orders } from "../../modules/orders/components/Orders";
import styled from "astroturf/react";
import { GetServerSideProps } from "next";
import { DeliveryTimeT, TypeOfDeliveryT } from "../../modules/orders/interfaces/order";
import { UserAddressT } from "../../modules/profile/interfaces/userAddress";
import { getProducts } from "../../api/productsApi";
import { ProductT } from "../../modules/products/interfaces/product";
import { getDeliveryTime, getSelfAddress, getTypeOfDelivery } from "../../api/orderApi";
import { FormProvider, useForm } from "react-hook-form";
import { UserT } from "../../modules/profile/interfaces/user";
import { getUser } from "../../api/userApi";
import { getUserAddress } from "../../api/userAddressApi";
import { OrderFormT } from "../../modules/forms/interfaces/orderForm";
import { CartT } from "../../modules/cart/interfaces/cart";
import { getCart } from "../../api/cartApi";
import { PharmaciesT } from "../../modules/profile/interfaces/pharmacies";
import {
  getPharmacies,
  getPharmaciesFavourites,
  getPharmaciesStory,
} from "../../api/pharmaciesApi";
import { createContext, useState } from "react";
import { getInitialData } from "../../common/hooks/useInitialData";

type Props = {
  pharmacies: PharmaciesT[];
  pharmaciesFavourites: PharmaciesT[];
  pharmaciesOrderHistories: PharmaciesT[];
  typeOfDelivery: TypeOfDeliveryT;
  pharmacyAddress: PharmaciesT;
  userAddress: UserAddressT;
  deliveryTime: DeliveryTimeT[];
  user: Pick<UserT, "phone" | "name">;
  productOrder: ProductT[];
  cart: CartT;
};

type PropsContext = Pick<
  Props,
  | "pharmacies"
  | "pharmaciesFavourites"
  | "pharmaciesOrderHistories"
  | "typeOfDelivery"
  | "deliveryTime"
>;
export const OrderContext = createContext<PropsContext>({} as PropsContext);

export default function OrderPage(props: Props) {
  const [typeDelivery, setTypeDelivery] = useState<TypeOfDeliveryT>("self");

  const methods = useForm<OrderFormT>({
    defaultValues: {
      typeOfDelivery: props.typeOfDelivery,
      typeOfPayment: "card-online",
      pharmacyAddress: props.pharmacyAddress,
      userAddress: props.userAddress,
      user: props.user,
      productOrder: props.productOrder,
      cart: props.cart,
    },
  });

  //todo делать проверку на тип доставки и от него отправлять нужные данные
  const onSubmit = (data: OrderFormT) => {
    console.log("submit ===> ", data);
  };

  return (
    <>
      <ContainerArticleTitle>
        <TitleH1 title={"Оформление"} />
      </ContainerArticleTitle>
      <FormProvider {...methods}>
        <ContainerArticleCustom as={"form"} onSubmit={methods.handleSubmit(onSubmit)}>
          <OrderContext.Provider
            value={{
              pharmacies: props.pharmacies,
              deliveryTime: props.deliveryTime,
              typeOfDelivery: props.typeOfDelivery,
              pharmaciesFavourites: props.pharmaciesFavourites,
              pharmaciesOrderHistories: props.pharmaciesOrderHistories,
            }}
          >
            <ContainerCustom padding={"sm"}>
              <Orders.OrderDeliveryMethod
                typeDelivery={typeDelivery}
                setTypeDelivery={setTypeDelivery}
              />
            </ContainerCustom>
          </OrderContext.Provider>

          <ContainerCustom padding={"sm"}>
            <Orders.OrderPaymentMethod />
          </ContainerCustom>
          <ContainerCustom padding={"sm"}>
            <Orders.ProductOnOrder product={props.productOrder} />
          </ContainerCustom>
          <PositionAside>
            <Orders.TotalPrice cart={props.cart} typeDelivery={typeDelivery} />
          </PositionAside>
          <Orders.TotalPrice isButtonFix cart={props.cart} typeDelivery={typeDelivery} />
        </ContainerArticleCustom>
      </FormProvider>
    </>
  );
}

OrderPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({
      pathname: "/order/id",
    });
    const [
      user,
      typeOfDelivery,
      pharmacyAddress,
      userAddress,
      deliveryTime,
      productOrder,
      cart,
      pharmacies,
      pharmaciesFavourites,
      pharmaciesOrderHistories,
    ] = await Promise.allSettled([
      getUser(),
      getTypeOfDelivery(),
      getSelfAddress(),
      getUserAddress(),
      getDeliveryTime(),
      getProducts({ page: 3, limit: 3 }),
      getCart("23132123123"),
      getPharmacies(),
      getPharmaciesFavourites(),
      getPharmaciesStory(),
    ]);

    return {
      props: {
        typeOfDelivery: typeOfDelivery.status === "fulfilled" ? typeOfDelivery.value : {},
        pharmacyAddress: pharmacyAddress.status === "fulfilled" ? pharmacyAddress.value : {},
        userAddress: userAddress.status === "fulfilled" ? userAddress.value[0] : {},
        deliveryTime: deliveryTime.status === "fulfilled" ? deliveryTime.value : [],
        productOrder: productOrder.status === "fulfilled" ? productOrder.value.data.items : [],
        user:
          user.status === "fulfilled"
            ? { phone: user.value.phone, name: `${user.value.name} ${user.value.surname}` }
            : { phone: "", name: "" },
        cart: cart.status === "fulfilled" ? cart.value : {},
        pharmacies: pharmacies.status === "fulfilled" ? pharmacies.value.data.items : [],
        pharmaciesFavourites:
          pharmaciesFavourites.status === "fulfilled" ? pharmaciesFavourites.value : [],
        pharmaciesOrderHistories:
          pharmaciesOrderHistories.status === "fulfilled" ? pharmaciesOrderHistories.value : [],
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

const PositionAside = styled.aside`
  @import "variables";

  padding-top: 20px;

  @media (min-width: 1199px) {
    grid-column: 2 !important;
    grid-row-start: 1;
    grid-row-end: 3;
    position: sticky;
    top: 100px;
  }
`;

const ContainerArticleTitle = styled(ContainerArticle)`
  padding-top: 20px;
`;

const ContainerCustom = styled.section<{
  padding?: "sm" | "md";
  paddingMb?: "sm";
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
  }
`;
