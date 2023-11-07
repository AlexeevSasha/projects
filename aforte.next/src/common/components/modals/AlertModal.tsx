import styled from "astroturf/react";
import { ModalProps, ModalNames } from "common/interfaces/modal";
import React from "react";

type Props = ModalProps & {
  children?: JSX.Element;
};

const AlertModal = ({ onClose, children }: Props) => {
  const closeModal = () => onClose?.(ModalNames.ALERT_MODAL);
  return (
    <>
      <Container>
        <Header>{children}</Header>
      </Container>
      <BlackBG onClick={closeModal} />
    </>
  );
};

export default AlertModal;

const Container = styled.div`
  @import "variables";

  @keyframes popup {
    0% {
      transform: translateY(1000px);
    }
    100% {
      transform: translateY(0);
    }
  }
  margin-bottom: 40px;
  position: relative;
  display: block;
  min-width: 90%;
  width: fit-content;
  border-radius: 102px;
  box-shadow: $shadow;
  animation: popup 0.3s ease-out;
  z-index: 10;
  @media (max-width: 1080px) {
    width: 90%;
  }
  @include respond-to(small) {
    min-width: 100%;
    border-radius: 28px;
    margin-bottom: 0;
    box-shadow: none;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BlackBG = styled.div`
  @import "variables";
  display: none;
  @include respond-to(small) {
    position: absolute;
    display: block;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba($black, 0.2);
    z-index: 9;
  }
`;
