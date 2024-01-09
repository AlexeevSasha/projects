import styled from "styled-components";
import { theme } from "../../../styles/theme";
import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export const ModalFooter = ({ children }: IProps) => {
  return <Footer>{children}</Footer>;
};

const Footer = styled.div`
  position: sticky;
  bottom: 0;
  background: ${theme.colors.white};
  padding: 20px 0;
  margin-top: 20px;
  width: 100%;
  z-index: 10000;

  &:after {
    position: absolute;
    content: "";
    left: -20px;
    top: 0;
    width: calc(100% + 40px);
    height: 1px;
    background: ${theme.colors.gray};
  }
`;
