import styled from "astroturf/react";
import { AppContext } from "common/components/ContextProvider";
import { IconCross } from "common/components/icons/IconCross";
import { ModalNames } from "common/interfaces/modal";
import { useContext } from "react";

export const OrderPaymentErrorAlert = () => {
  const { closeModal } = useContext(AppContext);
  return (
    <Container>
      <InfoBlock>
        <TitleAlert>Ошибка оплаты</TitleAlert>
        <DescriptionAlert>Попробуйте повторить оплату или изменить способ оплаты</DescriptionAlert>
      </InfoBlock>
      <Close onClick={() => closeModal(ModalNames.ALERT_MODAL)}>
        <IconCross />
      </Close>
    </Container>
  );
};
const Container = styled.div`
  @import "variables";

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 20px 20px 40px;
  background: $orange3;
  width: 100%;
  border-radius: 102px;
  justify-content: space-between;

  @include respond-to(small) {
    flex-direction: column;
    padding: 24px;
    border-radius: 28px;
    margin: 0 10px 10px;
  }
`;
const InfoBlock = styled.div`
  @import "variables";

  display: flex;
  flex-direction: column;
  padding-right: 60px;

  @include respond-to(small) {
    padding-right: 40px;
  }
`;
const TitleAlert = styled.span`
  @import "variables";

  font-size: 18px;
  font-weight: 600;
  color: $white;
  margin-bottom: 4px;

  @include respond-to(small) {
    font-size: 14px;
  }
`;
const DescriptionAlert = styled.span`
  @import "variables";

  font-weight: 400;
  font-size: 14px;
  color: #e0e9f7;

  @include respond-to(small) {
    font-size: 13px;
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
  background: $white;
  transition: all 0.3s ease-in-out;

  svg path {
    stroke: $orange3;
  }

  &:hover {
    transform: rotate(90deg);
  }

  @include respond-to(small) {
    width: 32px;
    height: 32px;
    padding: 6px;
    right: 22px;
  }
`;
