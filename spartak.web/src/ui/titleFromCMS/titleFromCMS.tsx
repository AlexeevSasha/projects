import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

export const TitleFromCMS = styled.h1`
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  width: 100%;
  font-size: 3.75vw;
  padding: 0 0 2.08vw 0;
  margin: 0;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    padding-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    padding-bottom: 4.27vw;
  }
`;
