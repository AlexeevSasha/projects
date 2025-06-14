import styled from "styled-components";
import { theme } from "../theme/theme";

export const IconPlay = () => {
  return (
    <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.3889 11.36L7.8911 3.11102C7.77741 3.04154 7.64726 3.0036 7.51404 3.00111C7.38083 2.99861 7.24935 3.03165 7.13314 3.09683C7.01692 3.162 6.92017 3.25696 6.85283 3.37193C6.7855 3.4869 6.75 3.61774 6.75 3.75098V20.2488C6.75 20.3821 6.7855 20.5129 6.85283 20.6279C6.92017 20.7429 7.01692 20.8378 7.13314 20.903C7.24935 20.9682 7.38083 21.0012 7.51404 20.9987C7.64726 20.9962 7.77741 20.9583 7.8911 20.8888L21.3889 12.6399C21.4985 12.5729 21.5891 12.4788 21.652 12.3668C21.7148 12.2547 21.7478 12.1284 21.7478 11.9999C21.7478 11.8714 21.7148 11.7451 21.652 11.633C21.5891 11.521 21.4985 11.427 21.3889 11.36Z"
        stroke="currentColor"
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
    width: 2.61vw;
    height: 2.61vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 5.33vw;
    height: 5.33vw;
  }
`;
