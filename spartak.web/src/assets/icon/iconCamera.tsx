import styled from "styled-components";
import { theme } from "../theme/theme";

export const IconCamera = () => {
  return (
    <Svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.25 16.25H3.75C3.41848 16.25 3.10054 16.1183 2.86612 15.8839C2.6317 15.6495 2.5 15.3315 2.5 15V6.25C2.5 5.91848 2.6317 5.60054 2.86612 5.36612C3.10054 5.1317 3.41848 5 3.75 5H6.24954L7.49954 3.125H12.4995L13.7495 5H16.25C16.5815 5 16.8995 5.1317 17.1339 5.36612C17.3683 5.60054 17.5 5.91848 17.5 6.25V15C17.5 15.3315 17.3683 15.6495 17.1339 15.8839C16.8995 16.1183 16.5815 16.25 16.25 16.25Z"
        stroke="#DCE1EA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 13.125C11.5533 13.125 12.8125 11.8658 12.8125 10.3125C12.8125 8.7592 11.5533 7.5 10 7.5C8.4467 7.5 7.1875 8.7592 7.1875 10.3125C7.1875 11.8658 8.4467 13.125 10 13.125Z"
        stroke="#DCE1EA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const Svg = styled.svg`
  width: 1.08vw;
  height: 1.04vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 2.61vw;
    height: 2.61vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 5.53vw;
    height: 5.53vw;
  }
`;
