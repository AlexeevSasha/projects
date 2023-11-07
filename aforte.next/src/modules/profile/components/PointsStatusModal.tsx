import styled from "astroturf/react";
import { NextImage } from "common/components/NextImage";
import { UserPointsStatusT } from "../interfaces/userPointsStatus";

type Props = {
  status: UserPointsStatusT;
};

export const PointStatusModal = ({ status }: Props) => {
  return (
    <Conteiner>
      <ModalTitile>Полезные статусы</ModalTitile>
      <ModalText>
        Получайте бонусы за оплату покупок на нашем сайте. Среди преимуществ: бесплатные доставки,
        увеличеный кешбек за оплату покупок, а так же возможность оплачивать баллами покупки до 20%
        от стоимости.
      </ModalText>
      <ProgressBar>
        <Step active={status.status === "Золотой" || status.status === "Платиновый"}>
          <HeaderContainer
            active={
              status.status === "Золотой" ||
              status.status === "Платиновый" ||
              status.status === "Серебряный"
            }
          >
            <HeaderContent>
              <ImageContainer>
                <NextImage src="/images/pointStatus.png" alt={"review"} />
              </ImageContainer>
              <TextContainer>
                <Title>Серебряный</Title>
                <StatusState
                  active={
                    status.status === "Золотой" ||
                    status.status === "Платиновый" ||
                    status.status === "Серебряный"
                  }
                >
                  {status.status === "Золотой" ||
                    status.status === "Платиновый" ||
                    status.status === "Серебряный"
                    ? "Статус получен"
                    : `Купите еще на ${status.finishSum - status.currentSum} рублей`}
                </StatusState>
              </TextContainer>
            </HeaderContent>
          </HeaderContainer>
          <BonusBlock>
            <BonusCard>
              <BonusTitle>1</BonusTitle>
              <BonusDescription>
                бесплатных <br /> доставки
              </BonusDescription>
            </BonusCard>
            <BonusCard>
              <BonusTitle>2%</BonusTitle>
              <BonusDescription>
                кешбек <br /> за покупки
              </BonusDescription>
            </BonusCard>
            <BonusCard>
              <BonusTitle>10%</BonusTitle>
              <BonusDescription>
                скидка <br /> при оплате
              </BonusDescription>
            </BonusCard>
          </BonusBlock>
          <BonusBlockMobile>
            <TextMobile>1 бесплатная доставка</TextMobile>
            <TextMobile>2% кешбек за покупки</TextMobile>
            <TextMobile>10% скидка при оплате </TextMobile>
          </BonusBlockMobile>
        </Step>
        <Step active={status.status === "Платиновый"}>
          <HeaderContainer active={status.status === "Платиновый" || status.status === "Золотой"}>
            <HeaderContent>
              <ImageContainer>
                <NextImage src="/images/pointStatus.png" alt={"review"} />
              </ImageContainer>
              <TextContainer>
                <Title>Золотой </Title>
                <StatusState active={status.status === "Платиновый" || status.status === "Золотой"}>
                  {status.status === "Золотой" || status.status === "Платиновый"
                    ? "Статус получен"
                    : `Купите еще на ${status.finishSum - status.currentSum} рублей`}
                </StatusState>
              </TextContainer>
            </HeaderContent>
          </HeaderContainer>
          <BonusBlock>
            <BonusCard>
              <BonusTitle>2</BonusTitle>
              <BonusDescription>
                бесплатные <br /> доставки
              </BonusDescription>
            </BonusCard>
            <BonusCard>
              <BonusTitle>5%</BonusTitle>
              <BonusDescription>
                кешбек <br /> за покупки
              </BonusDescription>
            </BonusCard>
            <BonusCard>
              <BonusTitle>15%</BonusTitle>
              <BonusDescription>
                скидка <br /> при оплате
              </BonusDescription>
            </BonusCard>
          </BonusBlock>
          <BonusBlockMobile>
            <TextMobile>2 бесплатные доставка</TextMobile>
            <TextMobile>5% кешбек за покупки</TextMobile>
            <TextMobile>15% скидка при оплате </TextMobile>
          </BonusBlockMobile>
        </Step>
        <Step active={status.status === "Платиновый"}>
          <HeaderContainer active={status.status === "Платиновый"}>
            <HeaderContent>
              <ImageContainer>
                <NextImage src="/images/pointStatus.png" alt={"review"} />
              </ImageContainer>
              <TextContainer>
                <Title>Платиновый</Title>
                <StatusState active={status.status === "Платиновый"}>
                  {status.status === "Платиновый"
                    ? "Статус получен"
                    : `Купите еще на ${status.finishSum - status.currentSum} рублей`}
                </StatusState>
              </TextContainer>
            </HeaderContent>
          </HeaderContainer>
          <BonusBlock>
            <BonusCard>
              <BonusTitle>5</BonusTitle>
              <BonusDescription>
                бесплатных <br /> доставки
              </BonusDescription>
            </BonusCard>
            <BonusCard>
              <BonusTitle>10%</BonusTitle>
              <BonusDescription>
                кешбек <br /> за покупки
              </BonusDescription>
            </BonusCard>
            <BonusCard>
              <BonusTitle>20%</BonusTitle>
              <BonusDescription>
                скидка <br /> при оплате
              </BonusDescription>
            </BonusCard>
          </BonusBlock>
          <BonusBlockMobile>
            <TextMobile>5 бесплатныx доставка</TextMobile>
            <TextMobile>10% кешбек за покупки</TextMobile>
            <TextMobile>20% скидка при оплате </TextMobile>
          </BonusBlockMobile>
        </Step>
      </ProgressBar>
    </Conteiner>
  );
};
const Conteiner = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 40px 48px 0px 40px;
  @include respond-to(small) {
    padding: 28px 24px 0px 24px;
  }
`;
const ModalTitile = styled.span`
  @import "variables";
  font-weight: 600;
  font-size: 22px;
  line-height: 137%;
  @include respond-to(small) {
    font-size: 20px;
  }
`;
const ModalText = styled.span`
  margin-top: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  max-width: 592px;
`;
const ProgressBar = styled.ul`
  @import "variables";
  position: relative;
  padding: 0;
  margin: 0;
  margin-top: 26px;
  padding-left: 12px;
  @include respond-to(small) {
    margin-top: 20px;
    max-height: 270px;
    overflow-x: scroll;
  }
`;
const Step = styled.li<{ active: boolean }>`
  @import "variables";
  list-style: none;
  height: 215px;
  border-left: 2px solid $blue-2;
  &:last-child {
    border-left-color: transparent;
  }
  &.active {
    border-left: 2px solid $greenMain;
    &:last-child {
      border-left-color: transparent;
    }
  }
  @include respond-to(small) {
    height: 228px;
  }
`;
const HeaderContainer = styled.div<{ active: boolean }>`
  @import "variables";
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  &:before {
    $size: 34px;
    color: red;
    position: relative;
    left: -16px;
    display: inline-block;
    min-width: $size;
    height: $size;
    text-align: center;
    border-radius: 50%;
    background-color: $blue-2;
    content: "";
  }
  &.active::before {
    background-color: $greenMain;
    content: url("../../../common/components/icons/CheckContent.svg");
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @include respond-to(small) {
    &::before {
      $size: 27px;
      min-width: $size;
      height: $size;
      left: -12px;
    }
  }
`;
const HeaderContent = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  width: 100%;
  @include respond-to(small) {
    flex-direction: column;
  }
`;
const BonusBlock = styled.div`
  @import "variables";
  margin: 16px 0px 36px 0px;
  display: flex;
  flex-direction: row;
  padding: 0px 0px 0px 30px;
  :last-child {
    margin-right: 0px;
  }
  @include respond-to(small) {
    display: none;
  }
`;
const BonusCard = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 150px;
  border-radius: 20px;
  background: $grey;
  margin-right: 12px;
`;
const BonusTitle = styled.span`
  font-weight: 600;
  font-size: 20px;
  line-height: 137%;
`;
const BonusDescription = styled.span`
  margin-top: 4px;
  font-weight: 400;
  font-size: 14px;
  line-height: 137%;
`;
const ImageContainer = styled.div<{ settings?: boolean }>`
  @import "variables";
  max-width: 52px;
  width: 100%;
  div {
    height: 52px;
  }
  @include respond-to(small) {
    max-width: 48px;
    div {
      height: 48px;
    }
  }
`;
const TextContainer = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  @include respond-to(small) {
    margin-left: 0px;
  }
`;
const Title = styled.span`
  @import "variables";
  font-weight: 600;
  font-size: 18px;
  line-height: 137%;
  @include respond-to(small) {
    font-size: 16px;
    margin-top: 16px;
  }
`;
const StatusState = styled.span<{ active?: boolean }>`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  line-height: 137%;
  margin-top: 4px;
  opacity: 0.4;
  &.active {
    color: $greenMain;
    opacity: 1;
  }
`;
const BonusBlockMobile = styled.div`
  @import "variables";
  display: none;
  @include respond-to(small) {
    display: flex;
    flex-direction: column;
    margin: 12px 0px 36px 0px;
    padding: 0px 0px 0px 28px;
    :first-child {
      margin-top: 0;
    }
  }
`;
const TextMobile = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  margin-top: 6px;
`;
