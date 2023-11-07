import { IconShop } from "../../../common/components/icons/IconShop";
import styled from "astroturf/react";
import { Button } from "../../../common/components/Button";
import { useFormContext } from "react-hook-form";
import { OrderFormT } from "../../forms/interfaces/orderForm";
import { useContext } from "react";
import { AppContext } from "../../../common/components/ContextProvider";
import { ModalNames } from "../../../common/interfaces/modal";
import { SelectPharmacyModal } from "./SelectPharmacyModal";
import { OrderContext } from "../../../pages/order/[id]";

export const SelfDeliveryDetails = () => {
  const { pharmacies, pharmaciesFavourites, pharmaciesOrderHistories } = useContext(OrderContext);
  const { openModal } = useContext(AppContext);
  const { getValues, setValue } = useFormContext<OrderFormT>();
  const pharmacyAddress = getValues("pharmacyAddress");

  return (
    <Container>
      <Name>
        <IconShop />
        <span>{pharmacyAddress.title}</span>
      </Name>
      <Content>
        <div>
          {pharmacyAddress.address} {pharmacyAddress.subway ? ", " + pharmacyAddress.subway : " "}
        </div>
        <div>Время работы — {pharmacyAddress.workingHours.join(", ")}</div>
        <div>Оплата — карта, наличные</div>
        <div style={{ fontWeight: 500 }}>Срок хранения заказа — 3 дня</div>
      </Content>
      <CustomButton
        onClick={() =>
          openModal(ModalNames.POPUP_MODAL, {
            children: (
              <SelectPharmacyModal
                currentPharmacyId={pharmacyAddress.id}
                setValue={setValue}
                pharmacies={pharmacies}
                pharmaciesOrderHistories={pharmaciesOrderHistories}
                pharmaciesFavourites={pharmaciesFavourites}
              />
            ),
          })
        }
        type={"button"}
        typeBtn={"lightBlue"}
      >
        Выбрать другую аптеку
      </CustomButton>
    </Container>
  );
};

const Container = styled.div`
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

const Content = styled.div`
  @import "variables";

  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.02em;

  @include respond-to(small) {
    font-weight: 400;
    font-size: 13px;
    margin-top: 12px;
    padding-left: 40px;
  }
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  margin-top: 20px;
  grid-column: 2;
  padding: 16.5px;
  max-width: 400px;

  @include respond-to(small) {
    grid-column: 1;
    max-width: 100%;
  }
`;
