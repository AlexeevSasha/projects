import styled from "astroturf/react";
import { Icon } from "common/components/Icon";
import { ModalNames, ModalProps } from "common/interfaces/modal";
import { Button } from "../Button";

type Props = ModalProps & {
  title?: string;
  message?: string;
  desc?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

const ConfirmModal = ({
  onClose,
  callBack,
  title,
  message,
  desc,
  confirmLabel,
  cancelLabel,
}: Props) => {
  return (
    <Container>
      <Content>
        <Header>{title || "Подтверждение отмены"}</Header>

        <Text>{desc || ""}</Text>

        <Text>{message || "Вы действительно хотите отменить последние изменения?"}</Text>

        <BtnGroup>
          <Button
            onClick={() => {
              callBack?.("submit");
              onClose?.(ModalNames.CONFIRM_MODAL);
            }}
          >
            {confirmLabel || "Подтвердить"}
          </Button>

          <Cancel
            onClick={() => {
              callBack?.("cancel");
              onClose?.(ModalNames.CONFIRM_MODAL);
            }}
          >
            {cancelLabel || "Отменить"}
          </Cancel>
        </BtnGroup>
      </Content>

      <Close>
        <Icon name="cross" onClick={() => onClose?.(ModalNames.ALERT_MODAL)} />
      </Close>
    </Container>
  );
};

export default ConfirmModal;

const Container = styled.div`
  display: flex;
  position: absolute;
  background: #f9f9f9;
  border-radius: 2px;
  box-shadow: 4px 5px 25px #d2d2d2;
  padding: 14px;
  z-index: 10;
`;

const Content = styled.div`
  margin-right: 10px;
  margin-left: 14px;
  width: 318px;

  & > * {
    line-height: 18px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  /* color: $lightBlue; */
  line-height: 20px;
`;

const Text = styled.div`
  font-size: 14px;
  margin-top: 14px;
  color: #585757;
`;

const Cancel = styled(Button)`
  /* background: $lightGrey; */
  /* color: $lightBlue; */
  margin-left: 20px;
`;

const Close = styled.span`
  @import "variables";

  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  color: $gray;
  display: flex;
  align-items: center;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
  font-size: 14px;
`;
