import React from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

interface IProps {
  rotate: string;
  onClick?: () => void;
  color?: string;
}

export const IconPlus = (props: IProps) => {
  return (
    <Svg
      style={{ transform: `rotate(${props.rotate})` }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.onClick}
    >
      <path
        d="M3.75 12H20.25"
        stroke={props.color ?? theme.colors.white}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3.75V20.25"
        stroke={props.color ?? theme.colors.white}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const Svg = styled.svg`
  transition: all 0.2s ease-in-out;
  width: 1.25vw;
  height: 1.25vw;
  cursor: pointer;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 3.13vw;
    height: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    min-width: 6.4vw;
    min-height: 6.4vw;
  }
`;
