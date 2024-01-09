import React from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

export const IconFacebookColored = () => {
  return (
    <Svg
      width="12"
      height="22"
      viewBox="0 0 12 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.59621 3.49758C8.22054 3.49758 7.82281 4.09997 7.82281 5.42861V7.63269H11.4922L11.1244 11.1936H7.82424V22H3.42069V11.1936H0.454102V7.63269H3.42069V5.48913C3.42069 1.8973 4.88759 5.57693e-05 8.98037 5.57693e-05C9.83798 -0.00191467 10.695 0.0483304 11.5464 0.150652V3.50181L9.59621 3.49758Z"
        fill="#1877F2"
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
