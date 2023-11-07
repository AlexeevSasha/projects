import styled from "astroturf/react";
import { ModalProps, ModalNames } from "common/interfaces/modal";
import React, { useState } from "react";
import { IconCross } from "../icons/IconCross";

type Props = ModalProps & {
  children?: JSX.Element;
  title?: string;
};

const PopupModalMobile = ({ onClose, children, title }: Props) => {
  const [close, setClose] = useState(false);
  const closeModal = () => {
    setClose(true);
    setTimeout(() => onClose?.(ModalNames.POPUP_MODAL_MOBILE), 100);
  };
  return (
    <>
      <Container closing={close}>
        {title ? (
          <ContainerIconFilter>
            <span>{title}</span>
            <Close onClick={closeModal}>
              <IconCross />
            </Close>
          </ContainerIconFilter>
        ) : null}
        {children}
      </Container>
      <BlackBG onClick={closeModal} />
    </>
  );
};

export default PopupModalMobile;

const Container = styled.div<{ closing: boolean }>`
  @import "variables";

  position: relative;
  display: block;
  background: $white;
  border-radius: 40px 40px 0 0;
  padding: 24px 40px 24px 24px;
  width: 100%;
  z-index: 10;

  @include modal(openPopupTop);

  &.closing {
    @include modal(closePopupTop);
  }
`;

const Close = styled.div`
  @import "variables";

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $BG;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: rotate(90deg);
  }
`;

const ContainerIconFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 20px;
  line-height: 137%;
  margin-bottom: 24px;
`;

const BlackBG = styled.div`
  @import "variables";

  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba($black, 0.2);
  z-index: 9;
`;
