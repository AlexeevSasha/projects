import React from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

export const IconAppleColored = () => {
  return (
    <Svg
      width="20"
      height="23"
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.323 21.1716C15.1242 22.3328 13.8016 22.1518 12.5408 21.6043C11.2005 21.0457 9.97515 21.0104 8.5596 21.6043C6.79679 22.3637 5.8612 22.1429 4.79954 21.1716C-1.19444 15.0122 -0.309724 5.62956 6.50262 5.27633C8.15484 5.36464 9.31161 6.1881 10.2848 6.25654C11.7313 5.96292 13.1159 5.1218 14.6642 5.23218C16.5243 5.3823 17.9155 6.11525 18.8445 7.43323C15.0181 9.7292 15.9249 14.7627 19.4395 16.1756C18.7361 18.019 17.8337 19.8403 16.3208 21.187L16.323 21.1716ZM10.1521 5.2101C9.97294 2.47259 12.1958 0.220767 14.7526 0C15.1043 3.15697 11.8773 5.51918 10.1521 5.2101Z"
        fill="black"
      />
    </Svg>
  );
};

const Svg = styled.svg`
  height: 1.25vw;
  width: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 3.13vw;
    width: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 6.4vw;
    width: 6.4vw;
  }
`;
