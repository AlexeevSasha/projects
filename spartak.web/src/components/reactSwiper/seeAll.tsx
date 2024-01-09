import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

export const SeeAll = styled.a`
  color: ${({ theme }) => theme.colors.grayLight_grayDark1};
  font-family: "FCSM Text", sans-serif;
  font-weight: 600;
  width: 100%;
  text-align: right;
  cursor: pointer;
  font-size: 0.73vw;
  text-transform: uppercase;
  text-decoration: none;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
  height: fit-content;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    top: 4vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.67vw;
    top: 5.8vw;
  }
`;
