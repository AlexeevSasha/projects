import styled from "astroturf/react";
import { NextImage } from "common/components/NextImage";
import { PointStatusBonusT } from "../interfaces/userPointsStatus";

interface IBonus {
  [key: string]: {
    image: string;
    description: string;
  };
}

type Props = {
  bonus: PointStatusBonusT;
};

export const PointsStatusBonus = ({ bonus }: Props) => {
  const statusBonus: IBonus = {
    Delivery: { image: "/images/pointsDelivery.png", description: "бесплатных доставки" },
    Cashback: { image: "/images/pointsСashback.png", description: "кешбек за покупки" },
    Discount: { image: "/images/pointsDiscount.png", description: "скидка при оплате" },
  };
  return (
    <Conteinter>
      <InfoBlock>
        <Title>
          {bonus.count}
          {bonus.type !== "Delivery" ? "%" : ""}
        </Title>
        <Description>{statusBonus[bonus.type]?.description}</Description>
      </InfoBlock>
      <ImageContainer>
        <NextImage src={statusBonus[bonus.type]?.image} alt={"review"} />
      </ImageContainer>
    </Conteinter>
  );
};
const Conteinter = styled.div`
  @import "variables";
  background: $grey;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 20px;
  padding: 28px;
  @include respond-to(small) {
    padding: 20px;
    align-items: flex-start;
  }
`;
const InfoBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  @include respond-to(small) {
    margin-right: 5px;
  }
`;
const Title = styled.span`
  @import "variables";
  font-weight: 600;
  font-size: 24px;
  line-height: 137%;
  @include respond-to(small) {
    font-size: 20px;
  }
`;
const Description = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  margin-top: 17px;
  @include respond-to(small) {
    margin-top: 29px;
  }
`;
const ImageContainer = styled.div<{ settings?: boolean }>`
  @import "variables";
  max-width: 90px;
  width: 100%;
  div {
    height: 90px;
  }
  @include respond-to(small) {
    max-width: 48px;
    div {
      height: 48px;
    }
  }
`;
