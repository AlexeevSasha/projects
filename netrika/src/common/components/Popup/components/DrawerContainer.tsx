import { IDrawer } from "../../../interfaces/popup/IModal";
import React, { ReactNode, useEffect } from "react";
import { useDebouncePopup } from "../../../hooks/useDebouncePopup";
import { drawer } from "../../../helpers/event/modalEvent";
import { ModalHeader } from "./ModalHeader";
import { IconLoading } from "../../Icon/IconLoading";
import { ModalFooter } from "./ModalFooter";
import { DrawerAnimate, PopupBackdrop } from "../ui/PopupAnimate";
import styled, { css } from "styled-components";
import { theme } from "../../../styles/theme";

interface IProps extends IDrawer {
  id?: string;
  titleId?: string;
  footer?: ReactNode;
  style?: React.CSSProperties;
  styleContainer?: React.CSSProperties;
  loading?: boolean;
  unitOfMeasureWidth?: "%" | "vw";
}

export const DrawerContainer = ({
  children,
  popupid,
  position = "right",
  closeBackdropClick = true,
  ...props
}: IProps) => {
  const { closeModal, isClose } = useDebouncePopup({
    cb: () => {
      drawer.close(popupid, false);
    },

    delay: 250,
  });

  const onBackdropClick = () => {
    closeBackdropClick && closeModal();
    props?.callbackBackdropClick?.();
  };

  useEffect(() => {
    return () => {
      props?.callbackAfterClose?.();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Wrapper
        unitOfMeasureWidth={props.unitOfMeasureWidth}
        width={props.width}
        footer={!!props.footer}
        id={props?.id || "drawer"}
        isClosed={isClose}
        position={position}
        style={props.styleContainer}
      >
        <ModalHeader onClose={closeModal}>{props.title}</ModalHeader>
        <Content style={props.style}>{children}</Content>
        {props.footer ? <ModalFooter>{props.footer}</ModalFooter> : null}
        {props.loading && (
          <LoadingContainer unitOfMeasureWidth={props.unitOfMeasureWidth} width={props.width}>
            <IconLoading hidePadding heightContainer={"100%"} />
          </LoadingContainer>
        )}
      </Wrapper>
      <PopupBackdrop isClosed={isClose} onClick={onBackdropClick} />
    </>
  );
};

const Wrapper = styled(DrawerAnimate)<Pick<IProps, "footer" | "width" | "unitOfMeasureWidth">>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  background: ${theme.colors.white};
  height: 100vh;
  padding: 0 20px 20px;
  overflow-y: auto;

  ${({ footer }) =>
    footer &&
    css`
      padding: 0 20px;
    `};

  ${({ width, unitOfMeasureWidth }) =>
    width &&
    css`
      max-width: ${width + (unitOfMeasureWidth || "px")};
      width: 100%;
    `};
`;

const Content = styled.div`
  flex: 1;
`;

const LoadingContainer = styled.div<Pick<IProps, "width" | "unitOfMeasureWidth">>`
  position: fixed;
  width: ${({ width, unitOfMeasureWidth }) => (width ? width + (unitOfMeasureWidth || "px") : "100%")};
  height: 100%;
  z-index: 10001;

  &:after {
    position: absolute;
    content: "";
    background: black;
    top: 0;
    left: -20px;
    height: 100%;
    width: calc(100% + 20px);
    z-index: -1;
    opacity: 0.1;
  }
`;
