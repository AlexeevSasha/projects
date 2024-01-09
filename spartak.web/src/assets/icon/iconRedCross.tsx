import React from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

export const IconRedCross = () => {
  return (
    <Svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 6C10.5523 6 11 6.44772 11 7V9H13C13.5523 9 14 9.44772 14 10C14 10.5523 13.5523 11 13 11H11V13C11 13.5523 10.5523 14 10 14C9.44772 14 9 13.5523 9 13V11H7C6.44772 11 6 10.5523 6 10C6 9.44772 6.44772 9 7 9H9V7C9 6.44772 9.44772 6 10 6Z"
        fill="#CC122D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17ZM10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
        fill="#CC122D"
      />
    </Svg>
  );
};
const Svg = styled.svg`
  height: 1.04vw;
  width: 1.04vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 2.61vw;
    width: 2.61vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 5.33vw;
    width: 5.33vw;
  }
`;
