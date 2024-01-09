import React from "react";
import styled from "styled-components";
import {theme} from "../theme/theme";

export const IconTriangle = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="14" height="6" viewBox="0 0 14 6" fill="none">
      <path d="M5.69842 1.11564C6.4474 0.47366 7.5526 0.47366 8.30158 1.11564L14 6H0L5.69842 1.11564Z" fill="#A5ACB8"/>
    </Svg>
  );
};

const Svg = styled.svg`
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 4.17vw;
    height: 4.17vw;
  }
`;
