import { IconDelivery } from "../../../../common/components/icons/IconDelivery";
import styled from "astroturf/react";
import { Button } from "../../../../common/components/Button";
import { useContext } from "react";
import { Forms } from "../../../forms/components";
import { ModalNames } from "../../../../common/interfaces/modal";
import { AppContext } from "../../../../common/components/ContextProvider";
import { CourierDeliveryDetailsModal } from "./CourierDeliveryDetailsModal";
import { useFormContext } from "react-hook-form";
import { OrderFormT } from "../../../forms/interfaces/orderForm";

export const CourierDelivery = () => {
  const { openModal } = useContext(AppContext);
  const method = useFormContext<OrderFormT>();
  const userAddress = method.getValues("userAddress");

  return (
    <ContainerGrid>
      <TitleContainer>
        <IconDelivery />
        <Title>
          <span>Доставка курьером</span>
          <span className={"price-delivery"}>250 руб</span>
        </Title>
      </TitleContainer>
      <Content>
        {!Object.values(userAddress).filter((el) => el).length ? (
          <Forms>
            <Forms.OrderCourierDelivery />
          </Forms>
        ) : (
          <>
            <div>
              {userAddress.street + ", "}
              {"кв. " + userAddress.apartment + ", "}
              {userAddress.entrance ? `${userAddress.entrance} подъезд, ` : null}
              {userAddress.floor + " этаж "}
              {userAddress.intercom ? `, ${userAddress.intercom} домофон` : null}
              {userAddress.description ? `, ${userAddress.description}` : null}
            </div>
            <CustomButton
              onClick={() =>
                openModal(ModalNames.POPUP_MODAL, {
                  children: (
                    <CourierDeliveryDetailsModal userAddress={userAddress} method={method} />
                  ),
                })
              }
              type={"button"}
              typeBtn={"lightBlue"}
            >
              Изменить адрес
            </CustomButton>
          </>
        )}
      </Content>
    </ContainerGrid>
  );
};

const ContainerGrid = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 300px 1fr;
  align-items: start;
  grid-column-gap: 24px;
  color: $black;

  @include respond-to(small) {
    grid-template-columns: 1fr;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: start;
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }
`;

const Title = styled.div`
  @import "variables";

  display: flex;
  flex-direction: column;

  span[class="price-delivery"] {
    margin-top: 12px;
    font-size: 15px;
    color: rgba($black, 0.4);
  }

  @include respond-to(small) {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    span[class="price-delivery"] {
      margin: 0;
    }
  }
`;

const Content = styled.div`
  @import "variables";

  form {
    max-width: 390px;
    width: 100%;
  }

  @include respond-to(small) {
    margin-top: 12px;
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  margin-top: 20px;
  grid-column: 2;
  padding: 16.5px;
  max-width: 400px;
  width: 100%;

  @include respond-to(small) {
    grid-column: 1;
    max-width: 100%;
  }
`;
