import styled from "astroturf/react";
import { AppContext } from "common/components/ContextProvider";
import { IconCross } from "common/components/icons/IconCross";
import { ModalNames } from "common/interfaces/modal";
import { useContext } from "react";
import { Button } from "../../../common/components/Button";

type Props = {
  id: string;
};

export const ProfileAlertModal = ({ id }: Props) => {
  const { closeModal } = useContext(AppContext);
  return (
    <ProfileAlert>
      <InfoBlock>
        <TitleAlert>Заказ №{id} отменен</TitleAlert>
        <DescriptionAlert>
          Оплата будет возвращена на карту указанную при оформлении заказа в течении 7 дней
        </DescriptionAlert>
      </InfoBlock>
      <CustomButton onClick={() => closeModal(ModalNames.ALERT_MODAL)}>
        Перейти к покупкам
      </CustomButton>
      <Close onClick={() => closeModal(ModalNames.ALERT_MODAL)}>
        <IconCross />
      </Close>
    </ProfileAlert>
  );
};
const ProfileAlert = styled.div`
  @import "variables";
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 20px 20px 40px;
  background: $blue1;
  width: 100%;
  border-radius: 102px;
  justify-content: space-between;
  @include respond-to(small) {
    flex-direction: column;
    padding: 24px;
    border-radius: 28px;
    background: $white;
  }
`;
const InfoBlock = styled.div`
  @import "variables";
  display: flex;
  flex-direction: column;
  @include respond-to(small) {
    align-items: center;
  }
`;
const TitleAlert = styled.span`
  @import "variables";
  font-size: 18px;
  font-weight: 600;
  color: $white;
  margin-bottom: 4px;
  line-height: 137%;
  @include respond-to(small) {
    color: $black;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 12px;
  }
`;
const DescriptionAlert = styled.span`
  @import "variables";
  font-weight: 400;
  font-size: 14px;
  line-height: 137%;
  color: $white;
  @include respond-to(small) {
    color: $black;
    text-align: center;
    line-height: 160%;
  }
`;
const CustomButton = styled(Button)`
  @import "variables";
  font-weight: 600;
  font-size: 14px;
  color: $blue1;
  background: $blue-3;
  padding: 14px 40px;
  border-radius: 56px;
  margin: 0px 84px 0px 10px;
  &:hover {
    background: $blue-2;
  }
  @include respond-to(small) {
    width: 100%;
    margin: 16px 0px 0px 0px;
    color: $white;
    background: $blue1;
    &:hover {
      background: $blue1;
    }
  }
`;
const Close = styled.span`
  @import "variables";

  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 40px;
  padding: 12px;
  background: $blue-1;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: rotate(90deg);
  }

  @include respond-to(small) {
    display: none;
  }
`;
