import React, { FC } from "react";
import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";

interface IProps {
  checked?: boolean;
  onClick?: () => void;
  active?: boolean;
  setActive?: () => void;
}

export const ItemSize: FC<IProps> = ({ checked, onClick, children, setActive, active }) => {
  return (
    <Size
      checked={checked}
      onClick={() => {
        setActive?.();
        onClick?.();
      }}
      active={Boolean(active)}
    >
      {children}
    </Size>
  );
};

const Size = styled.div<{ checked?: boolean; active: boolean }>`
  font-family: "FCSM Text", sans-serif;
  font-weight: 600;
  width: fit-content;
  box-sizing: border-box;
  display: flex;
  color: ${({ checked }) => (checked ? theme.colors.red : theme.colors.grayLight)};
  cursor: pointer;
  font-size: 0.73vw;

  &:hover {
    color: ${theme.colors.red};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;
