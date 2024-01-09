import { ModalAnimate, PopupBackdrop } from "../ui/PopupAnimate";
import React, { ReactNode, useEffect } from "react";
import styled, { css } from "styled-components";
import { theme } from "../../../styles/theme";
import { IModal } from "../../../interfaces/popup/IModal";
import { ModalHeader } from "./ModalHeader";
import { useDebouncePopup } from "../../../hooks/useDebouncePopup";
import { modal } from "../../../helpers/event/modalEvent";
import { ModalFooter } from "./ModalFooter";
import { IconLoading } from "../../Icon/IconLoading";

interface IProps extends IModal {
  footer?: ReactNode;
  style?: React.CSSProperties;
  loading?: boolean;
  fullScreen?: boolean;
}

export const ModalContainer = ({ children, popupid, ...props }: IProps) => {
  const { closeModal, isClose } = useDebouncePopup({
    cb: () => {
      modal.close(popupid, false);
    },

    delay: 250,
  });

  const onBackdropClick = () => {
    props?.closeBackdropClick && closeModal();
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
      <Wrapper>
        <Container
          fullScreen={props.fullScreen}
          footer={!!props.footer}
          id={"modal"}
          isClosed={isClose}
          width={props.width}
        >
          <ModalHeader onClose={closeModal}>{props.title}</ModalHeader>
          <Content style={props.style}>
            {children}
            {props.loading && (
              <LoadingContainer>
                <IconLoading hidePadding heightContainer={"100%"} />
              </LoadingContainer>
            )}
          </Content>
          {props.footer ? <ModalFooter>{props.footer}</ModalFooter> : null}
        </Container>
      </Wrapper>
      <PopupBackdrop isClosed={isClose} onClick={onBackdropClick} />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: calc(100% - 24px);
  padding: 8px;
  z-index: 1000;
`;

const Container = styled(ModalAnimate)<Pick<IProps, "width" | "footer" | "fullScreen">>`
  position: relative;
  width: ${({ width }) => (width ? "100%" : "fit-content")};
  background: ${theme.colors.white};
  z-index: 1000;
  border-radius: 10px;
  overflow-y: auto;
  max-height: calc(100vh - 100px);
  padding: 0 20px 20px;

  ${({ width }) =>
    width &&
    css`
      max-width: ${width + "px"};
    `};

  ${({ fullScreen }) =>
    fullScreen &&
    css`
      height: 100vh;
      width: 100vw;
      max-width: 100%;
    `};

  ${({ footer }) =>
    footer &&
    css`
      padding: 0 20px;
    `};
`;

const Content = styled.div`
  position: relative;
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 1;

  &:after {
    position: absolute;
    content: "";
    background: black;
    width: calc(100% + 40px);
    height: calc(100% + 40px);
    top: -20px;
    left: -20px;
    z-index: -1;
    opacity: 0.1;
  }
`;
