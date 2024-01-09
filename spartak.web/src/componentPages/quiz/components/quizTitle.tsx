import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";

// Экспортировать вне модуля только через конструкцию Quiz.[Component]
export const QuizTitle = styled.h1`
  font-weight: 700;
  color: ${(props) => props.theme.colors.white_black};
  margin: 0;

  font-size: 2.71vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;
