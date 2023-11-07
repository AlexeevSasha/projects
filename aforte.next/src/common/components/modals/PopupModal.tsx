import styled from "astroturf/react";
import { ModalProps, ModalNames } from "common/interfaces/modal";
import React, { useState } from "react";
import { IconCross } from "../icons/IconCross";

type Props = ModalProps & {
  children?: JSX.Element;
};

const PopupModal = ({ onClose, children }: Props) => {
  const [close, setClose] = useState(false);
  const closeModal = () => {
    setClose(true);
    setTimeout(() => onClose?.(ModalNames.POPUP_MODAL), 100);
  };
  return (
    <>
      <Container closing={close}>
        <Close onClick={closeModal}>
          <IconCross />
        </Close>
        {children}
      </Container>
      <BlackBG onClick={closeModal} />
    </>
  );
};

export default PopupModal;

const Container = styled.div<{ closing: boolean }>`
  @import "variables";

  position: relative;
  display: block;
  background: $white;
  border-radius: 40px;
  width: fit-content;
  z-index: 10;
  margin-right: 72px;
  animation: popup 0.3s ease-out;

  @include modal(openPopupTop);

  &.closing {
    @include modal(closePopupTop);
  }

  @include respond-to(small) {
    border-radius: 40px 40px 0 0;
    margin: 0;
    width: 100%;
  }
`;

const Close = styled.span`
  @import "variables";

  position: absolute;
  top: 0;
  right: -72px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 40px;
  padding: 18px;
  background: $white;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: rotate(90deg);
  }

  @include respond-to(small) {
    display: none;
  }
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
