import styled from "styled-components";
import { theme } from "../theme/theme";

export const IconYouTube = () => {
  return (
    <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 12L10.5 9V15L15 12Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />

      <path
        d="M2.25 12C2.25 14.7895 2.5382 16.4263 2.75729 17.2675C2.81585 17.4972 2.92832 17.7097 3.08537 17.8873C3.24241 18.0649 3.43952 18.2026 3.66037 18.2888C6.79883 19.4949 12 19.4618 12 19.4618C12 19.4618 17.2011 19.4949 20.3396 18.2888C20.5604 18.2026 20.7576 18.0649 20.9146 17.8873C21.0717 17.7097 21.1841 17.4972 21.2427 17.2675C21.4618 16.4263 21.75 14.7896 21.75 12C21.75 9.21039 21.4618 7.57368 21.2427 6.73248C21.1841 6.50273 21.0717 6.29025 20.9146 6.11264C20.7576 5.93502 20.5605 5.79738 20.3396 5.71113C17.2012 4.50506 12 4.53818 12 4.53818C12 4.53818 6.79888 4.50506 3.66039 5.71112C3.43955 5.79737 3.24244 5.93501 3.08539 6.11262C2.92834 6.29024 2.81588 6.50272 2.75731 6.73246C2.53821 7.57366 2.25 9.21039 2.25 12Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
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
