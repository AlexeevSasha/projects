import styled from "astroturf/react";
import { AppContext } from "common/components/ContextProvider";
import { TextArea } from "common/components/inputs/TextArea";
import { ModalNames } from "common/interfaces/modal";
import { useContext } from "react";
import { Button } from "../../../common/components/Button";

export const ProfileDeleteOrderModal = () => {
  const { closeModal } = useContext(AppContext);
  return (
    <Conteiner>
      <Title>Вы уверены, что хотите отменить заказ?</Title>
      <Description>Опишите, по какой причине вы хотите отменить заказ</Description>
      <CustomTextArea placeholder="Причина отмены *" />
      <CustomButton onClick={() => closeModal(ModalNames.POPUP_MODAL)}>Отменить заказ</CustomButton>
    </Conteiner>
  );
};
const Conteiner = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 470px;
  padding: 32px;
  @include respond-to(small) {
    padding: 24px;
    width: 100%;
  }
`;
const Title = styled.span`
  @import "variables";
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 12px;
  line-height: 137%;
  @include respond-to(small) {
    font-size: 20px;
  }
`;
const Description = styled.span`
  @import "variables";
  font-weight: 500;
  font-size: 16px;
  opacity: 0.4;
  line-height: 140%;
  margin-bottom: 24px;
  @include respond-to(small) {
    margin-bottom: 20px;
    font-weight: 400;
    font-size: 14px;
    opacity: 1;
  }
`;
const CustomButton = styled(Button)`
  @import "variables";
  font-weight: 600;
  font-size: 14px;
  width: 100%;
  color: $white;
  background: $orange3;
  padding: 16.5px 0px;
  border-radius: 16px;
  margin-top: 24px;
  &:hover {
    background: $orangeHover;
  }
  @include respond-to(small) {
    margin-top: 20px;
  }
`;
const CustomTextArea = styled(TextArea)`
  @import "variables";
  height: 104px;
  @include respond-to(small) {
    height: 90px;
  }
`;
