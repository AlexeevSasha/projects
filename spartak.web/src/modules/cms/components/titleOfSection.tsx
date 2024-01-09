import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";

// Экспортировать вне модуля только через конструкцию CMS.[Component]
export const TitleOfSection = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.colors.white_black};
  font-size: 2.08vw;
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;
