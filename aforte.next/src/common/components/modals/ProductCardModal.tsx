import styled from "astroturf/react";
import { ModalProps, ModalNames } from "common/interfaces/modal";
import React, { useState } from "react";
import { IconCross } from "../icons/IconCross";

type Props = ModalProps & {
  title?: string;
  subStr?: string;
  children?: JSX.Element;
};

const ProductCardModal = ({ onClose, title, subStr, children }: Props) => {
  const [close, setClose] = useState(false);
  const closeModal = () => {
    setClose(true);
    setTimeout(() => onClose?.(ModalNames.POPUP_MODAL), 100);
  };
  return (
    <>
      <Container closing={close}>
        <ContainerGrid>
          <Title>
            <span>{subStr}</span>
            <h3>{title}</h3>
          </Title>
          <Close onClick={closeModal}>
            <IconCross />
          </Close>
        </ContainerGrid>
        <ContainerContent>{children}</ContainerContent>
      </Container>
      <BlackBG onClick={closeModal} />
    </>
  );
};

export default ProductCardModal;

const Container = styled.div<{ closing: boolean }>`
  @import "variables";

  position: relative;
  display: block;
  background: $white;
  color: $black;
  border-radius: 28px;
  padding: 24px;
  z-index: 10;
  animation: popup 0.3s ease-out;
  max-width: 500px;
  width: 100%;

  @include modal(openPopupTop);

  &.closing {
    @include modal(closePopupTop);
  }

  @include respond-to(small) {
    margin: 0 16px;
  }
`;

const Close = styled.span`
  @import "variables";

  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 40px;
  background: $BG;
  padding: 12px;
  width: fit-content;
  height: fit-content;
  transition: all 0.3s ease-in-out;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    transform: rotate(90deg);
  }
`;

const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 40px;
  grid-column-gap: 20px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  @import "variables";

  font-weight: 600;
  font-size: 20px;
  line-height: 137%;

  span {
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.02em;
    color: rgba($black, 0.4);
    margin-bottom: 8px;
  }

  h3 {
    margin: 0;
  }
`;

const ContainerContent = styled.div`
  max-height: 400px;
  overflow-y: auto;

  & > div:first-child {
    padding-top: 0;
  }
  & > div:last-child {
    padding-bottom: 0;
    border: none;
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
