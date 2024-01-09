import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

interface IProps {
  clickClose?: () => void;
  head?: string;
  fullWidthTablet?: boolean;
}

export const Modal: FC<IProps> = (props) => {
  useEffect(() => {
    document.body.setAttribute("style", "overflow: hidden; touch-action: none");

    return () => {
      document.body.setAttribute("style", "");
    };
  }, []);

  return (
    <Container>
      {props.head ? <ModalHead>{props.head}</ModalHead> : null}
      <ModalContent fullWidthTablet={props.fullWidthTablet}>{props.children}</ModalContent>
      <Outline onClick={props.clickClose} />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
`;

const ModalHead = styled.div`
  z-index: 1000;
`;

const ModalContent = styled.div<{ fullWidthTablet?: boolean }>`
  display: flex;
  justify-content: center;
  z-index: 1000;
  max-width: 82.5vw;
  width: fit-content;
  overflow: auto;
  height: fit-content;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    max-width: ${({ fullWidthTablet }) => (fullWidthTablet ? "none" : "91.47vw")};
    width: 100vw;
    box-sizing: border-box;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    max-width: 100vw;
  }
`;

const Outline = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${theme.colors.black}80;
`;
