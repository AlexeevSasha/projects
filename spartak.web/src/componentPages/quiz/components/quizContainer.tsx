import styled from "styled-components";
import { ContainerContent } from "../../../components/containers/containerContent";
import { theme } from "../../../assets/theme/theme";

export const QuizContainer = styled(ContainerContent)`
  font-family: "FCSM Text", sans-serif;
  margin: 3.33vw auto;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1.25vw;

  align-items: start;

  position: relative;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 5.22vw auto 9vw;
    grid-template-columns: 1fr;
    grid-row-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 4.27vw auto 16vw;
    grid-row-gap: 6.4vw;
  }
`;
