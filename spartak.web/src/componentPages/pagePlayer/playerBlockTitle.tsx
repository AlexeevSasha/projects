import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

export const PlayerBlockTitle = styled.h3`
  width: inherit;
  text-align: left;
  margin: 0;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;
