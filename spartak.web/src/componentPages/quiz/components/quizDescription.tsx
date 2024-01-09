import styled from "styled-components";
import { theme } from "../../../assets/theme/theme";

// Экспортировать вне модуля только через конструкцию Quiz.[Component]
export const QuizDescription = styled.div`
  color: ${(props) => props.theme.colors.white_black};
  font-weight: 500;

  font-size: 0.94vw;
  margin-top: 2.08vw;
  letter-spacing: 0.1px;
  line-height: 156%;

  a {
    color: ${theme.colors.red};
  }

  p {
    margin: 0.83vw 0;
  }

  ul {
    padding: 0;
    display: grid;
    grid-row-gap: 0.83vw;
  }

  li {
    display: grid;
    grid-template-columns: 2.08vw 1fr;
    grid-column-gap: 0.63vw;
    align-items: center;

    :before {
      height: 2.08vw;
      width: 2.08vw;
      content: url("/images/stadium/RedPoint.svg");
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    margin-top: 5.22vw;

    p {
      margin: 2.09vw 0;
    }

    ul {
      grid-row-gap: 1.56vw;
    }

    li {
      grid-template-columns: 5.22vw 1fr;
      grid-column-gap: 1.56vw;

      :before {
        height: 5.22vw;
        width: 5.22vw;
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    margin-top: 4.27vw;

    li {
      grid-template-columns: 6.4vw 1fr;
      grid-column-gap: 3.2vw;

      ::before {
        height: 6.4vw;
        width: 6.4vw;
      }
    }
  }
`;
