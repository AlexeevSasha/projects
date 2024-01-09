import React from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

export const IconCLock = () => {
  return (
    <Svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 25V40" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52.9904 47.5L40 40" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M22.4478 31.1602H9.94775V18.6602"
        stroke="#C8122D"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5544 59.4455C24.4003 63.2914 29.3003 65.9105 34.6348 66.9716C39.9693 68.0327 45.4986 67.4881 50.5236 65.4067C55.5486 63.3253 59.8435 59.8005 62.8652 55.2782C65.8869 50.7558 67.4998 45.439 67.4998 40C67.4998 34.561 65.8869 29.2442 62.8652 24.7218C59.8435 20.1995 55.5486 16.6747 50.5236 14.5933C45.4986 12.5119 39.9693 11.9673 34.6348 13.0284C29.3003 14.0895 24.4003 16.7086 20.5544 20.5546L9.94775 31.1612"
        stroke="#C8122D"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
const Svg = styled.svg`
  path:nth-of-type(1) {
    stroke: ${({ theme }) => theme.colors.white_black};
  }  
  path:nth-of-type(2) {
    stroke: ${({ theme }) => theme.colors.white_black};
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
