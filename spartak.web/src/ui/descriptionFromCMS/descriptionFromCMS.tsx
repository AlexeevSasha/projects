import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

export const DescriptionFromCMS = styled.div`
  font-family: "FCSM Text", sans-serif;
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;
