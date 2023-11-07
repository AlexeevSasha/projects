import styled from "astroturf/react";
import { AppContext } from "common/components/ContextProvider";
import { NextImage } from "common/components/NextImage";
import { ModalNames } from "common/interfaces/modal";
import { useContext } from "react";
import { Button } from "../../../common/components/Button";


export const ProfileDistributionsModal = () => {
  const { closeModal } = useContext(AppContext);
  return (
    <Conteiner>
      <ImageContainer>
        <NextImage src={"/images/polza.png"} alt={"review"} />
      </ImageContainer>
      <Title>Ваш промокод на скидку 10%</Title>
      <Description>Спасибо, что подключили почту, теперь вы можете использовать промокод <span>POLZA10</span> на скидку 10% для оплаты покупок</Description>
      <CustomButton onClick={() => closeModal(ModalNames.POPUP_MODAL)}>
        Применить промокод
      </CustomButton>
    </Conteiner>
  );
};
const Conteiner = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  max-width: 470px;
  @include respond-to(small) {
    padding: 24px;
    max-width: 100%;
  }
`;
const Title = styled.span`
  @import "variables";
  font-weight: 600;
  font-size: 22px;
  line-height: 137%;
  margin-bottom: 20px;
  @include respond-to(small) {
    font-size: 20px;
    margin-bottom: 12px;
  }
`;
const Description = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  margin-bottom: 28px;
  text-align: center;
  span {
    font-weight: 600;
    color: $blue1;
  }
  @include respond-to(small) {
    margin-bottom: 20px;
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 20px;
  }
`;
const CustomButton = styled(Button) <{ deleteModal?: boolean; deleteError?: boolean }>`
  @import "variables";
  font-weight: 600;
  font-size: 14px;
  width: 100%;
  color: $white;
  background: $blue1;
  padding: 16.5px 0px;
  border-radius: 16px;
  &:hover {
    background: $blue2;
  }
  &.deleteModal {
    background: $orange3;
    &:hover {
      background: $orangeHover;
    }
    &.deleteError {
      color: $blue1;
      background: $blue-3;
      &:hover {
        background: $blue-2;
      }
    }
  }
`;
const ImageContainer = styled.div`
  @import "variables";
  width: 100%;
  padding: 24px 103px;
  margin-bottom: 28px;
  border-radius: 28px;
  background: $blue-3;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    height: 200px;
    width: 200px;
  }
  @include respond-to(small) {
    margin-bottom: 20px;
    padding: 20px 88px;
    div {
      height: 150px;
      width: 150px;
    }
  }
`;
