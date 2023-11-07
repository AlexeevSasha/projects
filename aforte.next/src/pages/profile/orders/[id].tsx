import { getUser } from "api/userApi";
import { getUserOrdersById } from "api/userOrdersApi";
import { AppContext } from "common/components/ContextProvider";
import { getProfileLayout } from "common/components/layout/ProfileLayout";
import { getInitialData } from "common/hooks/useInitialData";
import { ModalNames } from "common/interfaces/modal";
import { Profile } from "modules/profile/components/Profile";
import { UserT } from "modules/profile/interfaces/user";
import { UserOrderT } from "modules/profile/interfaces/userOrders";
import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";

type Props = {
  user: UserT;
  order: UserOrderT;
};

export default function OrderInfoPage(props: Props) {
  const { openModal } = useContext(AppContext);
  useEffect(() => {
    openModal(ModalNames.ALERT_MODAL, {
      children: <Profile.ProfileAlertModal id={props.order.id} />,
    });
  }, []);
  return (
    <>
      <Profile.OrderInfoDetail order={props.order} />
      <Profile.OrdersInOrderInfo oredrItems={props.order.items} />
    </>
  );
}

OrderInfoPage.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/profile/orders" });
    const [user, order] = await Promise.allSettled([
      getUser(),
      getUserOrdersById(query.id as string),
    ]);
    return {
      props: {
        user: user.status === "fulfilled" ? user.value : [],
        order: order.status === "fulfilled" ? order.value : {},
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};
