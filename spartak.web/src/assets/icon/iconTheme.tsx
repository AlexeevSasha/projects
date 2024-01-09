import React from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

export const IconTheme = () => {
  return (
    <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6V18Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </Svg>
  );
};

const Svg = styled.svg`
  width: 1.25vw;
  height: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 3.13vw;
    height: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 6.4vw;
    height: 6.4vw;
  }
`;
