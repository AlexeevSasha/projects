import React from "react";
import { IconLoading } from "../../components/Icon/IconLoading";
import styled, { css } from "styled-components";
import { IButton } from "./interfaces/IButton";
import { ButtonStyles } from "./styles/ButtonStyles";

interface IProps extends IButton {
  isLoading?: boolean;
}

export const Button = ({ children, ...attr }: IProps) => {
  return (
    <ButtonCustomStyles {...attr}>
      {attr.isLoading && (
        <Loading>
          <IconLoading width={20} height={20} hidePadding />
        </Loading>
      )}
      {children}
    </ButtonCustomStyles>
  );
};

const ButtonCustomStyles = styled(ButtonStyles)<Pick<IProps, "color" | "isLoading" | "fullWith">>`
  ${({ isLoading }) =>
    isLoading &&
    css`
      pointer-events: none;
      padding-left: 40px !important;
    `};
`;

const Loading = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 12px;
`;
