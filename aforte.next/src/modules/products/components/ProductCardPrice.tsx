import styled from "astroturf/react";
import { ProductPrice } from "./ProductPrice";
import { ProductButtonCard } from "./ProductButtonCard";
import { IconPoints, IconPointsCircle } from "../../../common/components/icons/IconPoints";
import { IconShop } from "../../../common/components/icons/IconShop";
import { IconDelivery } from "../../../common/components/icons/IconDelivery";
import { IconInfo } from "../../../common/components/icons/IconInfo";
import { Button } from "../../../common/components/Button";
import { ProductT } from "../interfaces/product";
import { useCallback, useContext } from "react";
import { AppContext } from "../../../common/components/ContextProvider";
import { ModalNames } from "../../../common/interfaces/modal";
import { BonusPoints } from "../../../common/components/BonusPoints";

type Props = {
  endedProduct?: boolean;
} & Pick<ProductT, "regularPrice" | "salePrice" | "discount" | "id">;

export const ProductCardPrice = ({
  endedProduct,
  salePrice,
  regularPrice,
  discount,
  id,
}: Props) => {
  const { openModal } = useContext(AppContext);

  const openPointsModal = useCallback(
    () =>
      openModal(ModalNames.POPUP_MODAL, {
        children: <BonusPoints />,
      }),
    []
  );
  return endedProduct ? (
    <Container>
      <Ended>
        <p> Товар закончился</p>
        <span>242 руб</span>
      </Ended>
      <CustomButton typeBtn={"lightBlue"}>Посмотреть аналоги</CustomButton>
    </Container>
  ) : (
    <Container>
      <div>
        <Price>Цена</Price>
        <Wrapper>
          <ProductPrice
            discount={discount}
            regularPrice={regularPrice}
            salePrice={salePrice}
            size={"lg"}
          />
          <Points onClick={openPointsModal}>
            <IconPointsCircle />
            <span>28 баллов</span>
          </Points>
          <Points onClick={openPointsModal} mobile>
            <span>+28</span>
            <IconPoints />
          </Points>
        </Wrapper>
      </div>
      <div>
        <FlexIcon style={{ marginBottom: 8 }}>
          <IconShop />
          <span> Забрать из аптеки завтра</span>
        </FlexIcon>
        <FlexIcon>
          <IconDelivery />
          <span> Доставить в течение часа за 250 руб</span>
        </FlexIcon>
      </div>
      <ProductButtonCard idProduct={id} toCart size={"lg"} type={"green"} />
      <InfoWrapper>
        <IconInfo />
        <span>Вы сможете выбрать удобный способ и срок доставки при оформлении</span>{" "}
      </InfoWrapper>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-gap: 20px;
  max-width: 400px;
  width: 100%;
  background: $white;
  color: $black;
  border-radius: 32px;
  padding: 28px;
  height: fit-content;

  @include respond-to(small) {
    max-width: 100%;
  }
`;

const Wrapper = styled.div`
  @import "variables";

  display: grid;
  grid-gap: 4px;

  @include respond-to(small) {
    grid-template-columns: 1fr fit-content(100px);
    justify-content: space-between;
    align-items: center;
  }
`;

const Price = styled.p`
  @import "variables";

  margin: 0;
  font-weight: 500;
  font-size: 13px;
  line-height: 137%;
  letter-spacing: 0.02em;
  color: rgb($black, 0.4);
`;

const FlexIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 137%;
  letter-spacing: 0.02em;

  svg {
    margin-right: 8px;
  }
`;

const InfoWrapper = styled(FlexIcon)`
  @import "variables";

  color: $blue3;
  align-items: start;
  font-size: 13px;
  line-height: 18px;

  svg {
    margin: 4px 8px 0 0;
    min-width: 20px;
  }
`;

const Points = styled(FlexIcon)<{ mobile?: boolean }>`
  @import "variables";

  @include respond-to(small) {
    display: none;
  }

  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  line-height: 137%;
  color: $blue1;

  &.mobile {
    display: none;
    align-items: center;
    justify-content: start;

    font-size: 12px;
    line-height: 126%;
    letter-spacing: 0.02em;
    background: $blue-2;
    color: #5580c5;
    padding: 5px 10px;
    border-radius: 20px;
    height: fit-content;

    @include respond-to(small) {
      display: inline-flex;
    }
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  padding: 20px 0;
`;

const Ended = styled.div`
  @import "variables";

  font-weight: 600;
  font-size: 28px;
  line-height: 137%;
  color: rgb($black, 0.4);

  p {
    margin: 0;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: 0.02em;
  }
`;
