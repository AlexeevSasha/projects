import styled from "styled-components";
import { ContainerContent } from "../../../components/containers/containerContent";
import { theme } from "../../../assets/theme/theme";

// Экспортировать вне модуля только через конструкцию CMS.[Component]
export const Article = styled(ContainerContent)`
  flex-direction: column;
  align-items: self-start;
  position: relative;
  margin-bottom: 4.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;
