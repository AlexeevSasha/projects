import styled from "astroturf/react";
import { ModalNames, ModalProps } from "common/interfaces/modal";
import React, { useState } from "react";
import { IconArraySmall } from "../icons/IconArraySmall";

type Props = ModalProps & {
  children?: JSX.Element;
  title?: string;
};

const FilterModal = ({ onClose, children, title }: Props) => {
  const [close, setClose] = useState(false);
  const closeModal = () => {
    setClose(true);
    setTimeout(() => onClose?.(ModalNames.FILTER_MODAL), 100);
  };
  return (
    <>
      <Container closing={close}>
        <ContainerIconFilter>
          <Close onClick={closeModal}>
            <IconArraySmall rotate={"90deg"} />
          </Close>
          <span>{title}</span>
        </ContainerIconFilter>
        {children}
      </Container>
      <BlackBG onClick={closeModal} />
    </>
  );
};

export default FilterModal;

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

  position: absolute;
  left: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $BG;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  transition: all 0.3s ease-in-out;
`;

const ContainerIconFilter = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
  line-height: 137%;
  margin-bottom: 20px;

  span {
    padding: 0 50px;
    width: 100%;
    white-space: nowrap;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
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
