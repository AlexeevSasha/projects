import React from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

export const IconGift = () => {
  return (
    <Svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M67.5 25H12.5C11.1193 25 10 26.1193 10 27.5V37.5C10 38.8807 11.1193 40 12.5 40H67.5C68.8807 40 70 38.8807 70 37.5V27.5C70 26.1193 68.8807 25 67.5 25Z"
        stroke="#C8122D"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M65 40V62.5C65 63.163 64.7366 63.7989 64.2678 64.2678C63.7989 64.7366 63.163 65 62.5 65H17.5C16.837 65 16.2011 64.7366 15.7322 64.2678C15.2634 63.7989 15 63.163 15 62.5V40"
        stroke="#C8122D"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M40 25V65" stroke="#C8122D" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M54.1421 21.4643C50.6066 24.9999 40 24.9999 40 24.9999C40 24.9999 40 14.3933 43.5355 10.8577C44.9423 9.45254 46.8496 8.6635 48.838 8.66406C50.8263 8.66463 52.7331 9.45476 54.1391 10.8608C55.5451 12.2668 56.3353 14.1735 56.3358 16.1619C56.3364 18.1503 55.5473 20.0575 54.1421 21.4643V21.4643Z"
        stroke="#0D1116"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.8577 21.4643C29.3933 24.9999 39.9999 24.9999 39.9999 24.9999C39.9999 24.9999 39.9999 14.3933 36.4643 10.8577C35.0575 9.45254 33.1503 8.6635 31.1619 8.66406C29.1735 8.66463 27.2668 9.45476 25.8608 10.8608C24.4548 12.2668 23.6646 14.1735 23.6641 16.1619C23.6635 18.1503 24.4525 20.0575 25.8577 21.4643V21.4643Z"
        stroke="#0D1116"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
const Svg = styled.svg`
  path:nth-of-type(4) {
    stroke: ${({ theme }) => theme.colors.white_black};
  }  
  path:nth-of-type(5) {
    stroke: ${({ theme }) => theme.colors.white_black};
  }
    width: 4.17vw;
    height: 4.17vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      width: 10.43vw;
      height: 10.43vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      width: 17.07vw;
      height: 17.07vw;
    }
  }
`;
