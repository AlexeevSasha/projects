import styled from "styled-components";
import { theme } from "../theme/theme";

export const IconYellowCard = () => {
  return (
    <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.47664 4.35189L18.6326 6.48122L15.8298 19.8493L5.67385 17.7199L8.47664 4.35189Z"
        fill="#FFBD3E"
        fillOpacity="0.4"
        stroke="#FFBD3E"
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
    width: 6.4vw;
    height: 6.4vw;
  }
`;
