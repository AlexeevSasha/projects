import styled from "styled-components";
import { langQuiz } from "../lang/langQuiz";
import { useRouter } from "next/router";
import { theme } from "../../../assets/theme/theme";

interface IProps {
  StartPublish: string;
  EndPublish: string;
}

// Экспортировать вне модуля только через конструкцию Quiz.[Component]
export const QuizDate = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  return <DateContainer>{langQuiz[locale].dateRange(props.StartPublish, props.EndPublish)}</DateContainer>;
};

const DateContainer = styled.p`
  color: ${(props) => props.theme.colors.grayLight_grayDark};
  margin: 0;
  font-weight: 500;
  font-size: 1.25vw;
  margin-top: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    margin-top: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    margin-top: 2.13vw;
  }
`;
