import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

export const ContainerContent = styled.article`
  font-family: "FCSM Text", sans-serif;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 82.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 93.87vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 91.47vw;
  }
`;
