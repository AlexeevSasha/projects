import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";

export const VotingSectionTitle = styled.h3`
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: 700;
  font-size: 2.08vw;
  margin: 0 0 2.08vw;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    margin-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: 500;
    font-size: 6.4vw;
    margin-bottom: 4.27vw;
  }
`;
