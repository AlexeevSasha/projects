import React from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

export const IconCoin = () => {
  return (
    <Svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 47.5V62.5" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 44.4102V59.4104" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 44.4102V59.4103" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7.5 32.5V47.5C7.5 55 20 62.5 40 62.5C60 62.5 72.5 55 72.5 47.5V32.5"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 47.5C57.9493 47.5 72.5 40.7843 72.5 32.5C72.5 24.2157 57.9493 17.5 40 17.5C22.0507 17.5 7.5 24.2157 7.5 32.5C7.5 40.7843 22.0507 47.5 40 47.5Z"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
const Svg = styled.svg`
  path {
    stroke: ${({ theme }) => theme.colors.grayDark_grayDark1};
  }
    width: 4.17vw;
    height: 4.17vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      width: 10.43vw;
      height: 10.43vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      width: 17.07vw;
      height: 17.07vw;
    }
  }
`;
