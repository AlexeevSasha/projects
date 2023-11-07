import { IconShop } from "../../../common/components/icons/IconShop";
import { IconDebitCard } from "../../../common/components/icons/IconDebitCard";
import { IconPerson } from "../../../common/components/icons/IconPerson";
import { phoneNumberFormatted } from "../../profile/utils/phoneNumberFormatted";
import styled from "astroturf/react";
import { UserOrderT } from "../../profile/interfaces/userOrders";

type Props = {
  order: UserOrderT;
};

export const OrderStatusInfo = ({ order }: Props) => {
  return (
    <FullInfoBlock>
      <ContainerGridInfo>
        <IconShop />
        <ContentInfo>
          <div className={"title-info"}>Самовывоз из аптеки</div>
          <div>Планета здоровья</div>
          <div>115531, г Москва, ул Саянская, д. 11А. М. Новогиреево</div>
          <div>Время работы — 10:00–22:00 Пн–Вс</div>
          <div style={{ fontWeight: 500 }}>Срок хранения заказа — 3 дня</div>
        </ContentInfo>
      </ContainerGridInfo>
      <ContainerInfoUser>
        <ContainerGridInfo>
          <IconDebitCard />
          <ContentInfo>
            <div className={"title-info"}>Оплата при получении</div>
            <div>
              <b>{order.price} ₽</b> за {order.items.length} товара,{" "}
              {order.status === "delivered"
                ? "оплачено"
                : "не оплачено, Заказ можно оплатить в аптеке наличными или картой"}
            </div>
          </ContentInfo>
        </ContainerGridInfo>
        <ContainerGridInfo>
          <ContainerPersonIcon>
            <IconPerson />
          </ContainerPersonIcon>
          <ContentInfo>
            <div className={"title-info"}>{order.deliveryDetails.buyerName}</div>
            <div>
              {order.deliveryDetails.buyerPhone
                ? phoneNumberFormatted(order.deliveryDetails.buyerPhone)
                : null}
            </div>
          </ContentInfo>
        </ContainerGridInfo>
      </ContainerInfoUser>
    </FullInfoBlock>
  );
};

const FullInfoBlock = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 44px;

  @include respond-to(small) {
    grid-template-columns: 1fr;
    grid-row-gap: 24px;
  }
`;

const ContainerGridInfo = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: start;
  grid-column-gap: 16px;
  color: $black;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ContentInfo = styled.div`
  @import "variables";

  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.02em;

  div[class="title-info"] {
    margin-bottom: 12px;
    font-weight: 600;
  }

  @include respond-to(small) {
    font-weight: 400;
    font-size: 14px;

    div[class="title-info"] {
      font-size: 16px;
      font-weight: 600;
    }
  }
`;

const ContainerPersonIcon = styled.div`
  @import "variables";

  svg {
    opacity: 0.3;
    width: 24px;
    height: 24px;
    margin-right: 16px;
    ellipse {
      fill: $blue1;
    }
    path {
      fill: $blue1;
    }
  }
`;

const ContainerInfoUser = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 24px;
`;
