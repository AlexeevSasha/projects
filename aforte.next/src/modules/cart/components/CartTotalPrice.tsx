import styled from "astroturf/react";
import { Button } from "../../../common/components/Button";
import { CartT } from "../../cart/interfaces/cart";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../common/components/ContextProvider";
import { ModalNames } from "../../../common/interfaces/modal";
import { SelectPharmacyModal } from "../../orders/components/SelectPharmacyModal";
import { TypeOfDeliveryT } from "../../orders/interfaces/order";
import { PharmaciesT } from "../../profile/interfaces/pharmacies";
import { useRouter } from "next/router";
import { FixToFooterContainer } from "../../../common/components/FixToFooterContainer";

type Props = {
  typeDelivery: TypeOfDeliveryT;
  cart: CartT;
  pharmacies: PharmaciesT[];
  pharmaciesFavourites: PharmaciesT[];
  pharmaciesOrderHistories: PharmaciesT[];
  isButtonFix?: boolean;
};

export const CartTotalPrice = ({ cart, ...props }: Props) => {
  const router = useRouter();
  const [pharmacy, setPharmacy] = useState<PharmaciesT | null>(null);
  const { openModal } = useContext(AppContext);

  const selectPharmacy = useCallback(
    () =>
      openModal(ModalNames.POPUP_MODAL, {
        children: (
          <SelectPharmacyModal
            getPharmacy={setPharmacy}
            pharmacies={props.pharmacies}
            pharmaciesOrderHistories={props.pharmaciesOrderHistories}
            pharmaciesFavourites={props.pharmaciesFavourites}
          />
        ),
      }),
    []
  );

  const handlerClick = useMemo(
    () => (props.typeDelivery === "self" ? selectPharmacy : () => router.push("/order/11")),
    [props.typeDelivery]
  );

  useEffect(() => {
    pharmacy && router.push("/order/11");
  }, [pharmacy]);

  return props.isButtonFix ? (
    <FixToFooterContainer>
      <CustomButton padding={"sm"} onClick={handlerClick} size={"md"} typeBtn={"green"}>
        {props.typeDelivery === "self" ? "Выбрать аптеку" : "Начать оформление"}
        <span>{cart?.totalPrice} руб</span>
      </CustomButton>
    </FixToFooterContainer>
  ) : (
    <Container>
      <ContainerButton>
        <CustomButton onClick={handlerClick} size={"md"} typeBtn={"green"}>
          {props.typeDelivery === "self" ? "Выбрать аптеку" : "Начать оформление"}
        </CustomButton>
      </ContainerButton>
      <ContentContainer>
        <div>
          <Wrapper>
            <span>Ваш заказ</span>
            <RightSide>{cart.count} товаров</RightSide>
          </Wrapper>
          <Wrapper>
            <span>Стоимость товаров</span>
            <RightSide>{cart.price} руб</RightSide>
          </Wrapper>
          <Wrapper>
            <span>Общая скидка</span>
            <RightSide color={"orange"}>- {cart.discount} руб</RightSide>
          </Wrapper>
          <Wrapper>
            <span>Доставка</span>
            <RightSide color={"green"}>
              {cart.delivery === "free" ? "Бесплатно" : `${cart.delivery} руб`}
            </RightSide>
          </Wrapper>
          <Wrapper>
            <span>Начислим баллы</span>
            <RightSide color={"blue"}>+ {cart.points} балла</RightSide>
          </Wrapper>
        </div>
        <Wrapper last>
          <span>К оплате</span>
          <RightSide>{cart.totalPrice} руб</RightSide>
        </Wrapper>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-gap: 20px;
  background: $white;
  color: $black;
  border-radius: 32px;
  padding: 28px;

  @include respond-to(small) {
    padding: 24px 20px;
  }
`;

const ContentContainer = styled.div`
  @import "variables";

  display: grid;
  grid-gap: 20px;
`;

const Wrapper = styled.div<{ last?: boolean }>`
  @import "variables";

  padding: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: rgb($black, 0.4);

  &.last {
    color: $black;
    font-weight: 600;
    font-size: 18px;
    padding-top: 20px;
    border-top: 1px solid $blue-2;
  }
`;

const RightSide = styled.span<{ color?: "blue" | "green" | "orange" }>`
  @import "variables";

  color: $black;
  font-weight: 600;

  &.color-blue {
    color: $blue1;
  }
  &.color-green {
    color: $greenMain;
  }
  &.color-orange {
    color: $orange3;
  }
`;

const ContainerButton = styled.div`
  @import "variables";

  @include respond-to(small) {
    grid-column: 1;
    grid-row: 2;
  }
`;

const CustomButton = styled(Button)<{ padding?: "sm" }>`
  @import "variables";

  padding: 22px 12px;
  width: 100%;

  &.padding-sm {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;

    span {
      font-weight: 500;
      font-size: 15px;
      line-height: 100%;
      color: rgba($white, 0.8);
    }
  }
`;
