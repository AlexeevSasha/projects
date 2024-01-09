import React from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

export const IconWarning = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="#CC122D"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path d="M12 7.5V12.75" stroke="#CC122D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12 17.25C12.6213 17.25 13.125 16.7463 13.125 16.125C13.125 15.5037 12.6213 15 12 15C11.3787 15 10.875 15.5037 10.875 16.125C10.875 16.7463 11.3787 17.25 12 17.25Z"
        fill="#CC122D"
      />
    </Svg>
  );
};

const Svg = styled.svg`
  min-height: 1.25vw;
  min-width: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    min-height: 3.13vw;
    min-width: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    min-height: 6.4vw;
    min-width: 6.4vw;
  }
`;
