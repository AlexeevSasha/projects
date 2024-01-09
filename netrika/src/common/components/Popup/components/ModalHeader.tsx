import { IconCross } from "../../Icon/IconCross";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";

interface IProps {
  children?: ReactNode;
  onClose: () => void;
  style?: React.CSSProperties;
  titleId?: string;
}

//id нужный для автотестов !!

export const ModalHeader = ({ onClose, children, style, titleId }: IProps) => {
  return (
    <HeaderModal style={style}>
      <TitleModal id={titleId || "modal_title"}>{children || ""}</TitleModal>
      <CloseModalIcon id={"cross_close"} onClick={onClose}>
        <IconCross />
      </CloseModalIcon>
    </HeaderModal>
  );
};

const HeaderModal = styled.div`
  position: sticky;
  top: 0;
  background: ${theme.colors.white};
  padding: 20px 0;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
  z-index: 10000;

  &:after {
    position: absolute;
    content: "";
    left: -20px;
    bottom: 0;
    width: calc(100% + 40px);
    height: 1px;
    background: ${theme.colors.gray};
  }
`;

const TitleModal = styled.h3`
  flex: 1;
`;
const CloseModalIcon = styled.div`
  cursor: pointer;
  position: relative;

  &:after {
    position: absolute;
    content: "";
    top: -3px;
    left: -6px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${theme.colors.gray};
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover {
    &:after {
      opacity: 0.5;
    }
  }
`;
