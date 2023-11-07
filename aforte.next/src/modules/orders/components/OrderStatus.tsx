import styled from "astroturf/react";
import { NextImage } from "../../../common/components/NextImage";
import { Button } from "../../../common/components/Button";
import { IconInfo } from "../../../common/components/icons/IconInfo";
import { UserOrderT } from "../../profile/interfaces/userOrders";
import Link from "next/link";
import { OrderStatusInfo } from "./OrderStatusInfo";
import { ModalNames } from "../../../common/interfaces/modal";
import { Profile } from "../../profile/components/Profile";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../common/components/ContextProvider";
import { OrderPaymentErrorAlert } from "./OrderPaymentErrorAlert";

type StatusT = {
  [key: string]: {
    status: string;
    title: string;
    delivery: string;
    typeBtn: "orange" | "green";
  };
};

const statusOrders: StatusT = {
  expected: {
    status: "Ожидает оплаты",
    title: "ожидает оплаты",
    delivery: "Оплатите заказ до",
    typeBtn: "orange",
  },
  going: {
    status: "Собираем ваш заказ",
    title: "оформлен",
    delivery: "Планируем доставить",
    typeBtn: "green",
  },
};

type Props = {
  order: UserOrderT;
};

export const OrderStatus = ({ order }: Props) => {
  const { openModal } = useContext(AppContext);

  useEffect(() => {
    if (order.status === "expected") {
      openModal(ModalNames.ALERT_MODAL, {
        children: <OrderPaymentErrorAlert />,
      });
    }
  }, []);

  return (
    <Container>
      <Status>
        <ContainerImage>
          <NextImage src={"/images/heart.png"} alt={"image"} />
        </ContainerImage>
        <ContainerOrder>
          <Order>
            <Link href={"/profile/orders"} className={"list-order"}>
              К списку заказов
            </Link>
            <div>{`Заказ №${order.id} ${statusOrders[order?.status]?.title}`}</div>
            <span className={"date-order"}>
              {statusOrders[order?.status]?.delivery}{" "}
              {new Date(order.deliveryDetails.deliveryDate).toLocaleString("ru", {
                month: "long",
                day: "numeric",
              })}
            </span>
          </Order>
          <CustomButton
            onClick={() =>
              openModal(ModalNames.POPUP_MODAL, {
                children: <Profile.DeliveredModal order={order} />,
              })
            }
            typeBtn={statusOrders[order?.status]?.typeBtn}
          >
            {statusOrders[order?.status]?.title}
          </CustomButton>
        </ContainerOrder>
      </Status>
      {order.status !== "expected" ? (
        <SuccessOrder>
          <IconInfo />
          <span>
            Мы пришлем sms-сообщение, как только товар поступит в аптеку. Вы можете найти информацию
            о заказе в разделе <strong>истории заказов.</strong> С любыми вопросами и сложностями
            звоните нам по телефону <strong>8 (800) 350-10-96.</strong>
          </span>
        </SuccessOrder>
      ) : null}
      <OrderStatusInfo order={order} />
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 44px;
  color: $black;
  background: $white;
  padding: 32px 40px 40px;
  border-radius: 32px;

  @include respond-to(small) {
    grid-row-gap: 16px;
  }
`;

const Status = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 100px 1fr;
  height: 100%;
  grid-column-gap: 20px;

  @include respond-to(small) {
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
  }
`;

const ContainerImage = styled.div`
  @import "variables";

  width: 100px;
  height: 100px;

  @include respond-to(small) {
    background: $grey;
    width: 100%;
    height: 180px;
    padding: 20px;
    border-radius: 28px;
  }
`;

const ContainerOrder = styled.div`
  @import "variables";

  display: flex;
  justify-content: space-between;

  @include respond-to(small) {
    flex-direction: column;
  }
`;

const Order = styled.div`
  @import "variables";

  height: fit-content;
  font-weight: 600;
  font-size: 22px;
  line-height: 137%;

  a[class="list-order"] {
    font-size: 16px;
    color: $blue1;

    @include respond-to(small) {
      font-size: 14px;
    }
  }
  span[class="date-order"] {
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    letter-spacing: 0.02em;
    color: rgba($black, 0.4);

    @include respond-to(small) {
      font-size: 14px;
    }
  }

  @include respond-to(small) {
    font-size: 20px;
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  padding: 13px 20px;
  height: fit-content;
  width: fit-content;

  @include respond-to(small) {
    margin-top: 12px;
    padding: 4px 16px;
  }
`;

const SuccessOrder = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 20px 1fr;
  grid-column-gap: 12px;
  padding: 20px 24px;
  background: rgba(109, 196, 123, 0.1);
  color: $green1;
  border-radius: 20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;

  svg {
    g {
      opacity: 1;
    }
    rect {
      fill: $green1;
    }
  }
`;
