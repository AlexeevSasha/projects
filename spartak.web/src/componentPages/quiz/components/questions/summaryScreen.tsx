import { useRouter } from "next/router";
import styled from "styled-components";
import { IClientQuizStatistic } from "../../interfaces/IQuiz";
import { langQuiz } from "../../lang/langQuiz";
import { theme } from "../../../../assets/theme/theme";
import { QuestionContainer, QuestionTitle } from "./questionComponents";

interface IProps {
  clientQuizStatistic: IClientQuizStatistic;
}

export const SummaryScreen = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <QuestionContainer>
      <QuestionTitle
        dangerouslySetInnerHTML={{
          __html: langQuiz[locale].finishQuiz.title(
            props.clientQuizStatistic?.ClientPoints,
            props.clientQuizStatistic?.QuizPoints
          ),
        }}
      />
      <Description dangerouslySetInnerHTML={{ __html: langQuiz[locale].finishQuiz.description }} />
      <ImageContainer>
        {langQuiz[locale].finishQuiz.countRightAnswers(
          props.clientQuizStatistic.ClientCorrectQuestions,
          props.clientQuizStatistic.QuizCorrectQuestions
        )}
      </ImageContainer>
    </QuestionContainer>
  );
};

const Description = styled.div`
  font-family: "Roboto", sans-serif;
  color: ${(props) => props.theme.colors.white_black};

  margin-top: 1.25vw;
  font-size: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    margin-top: 6.4vw;
  }
`;

const ImageContainer = styled.div`
  box-sizing: border-box;
  background: url("/images/quiz/summaryBackground_v1.0.1.png");
  background-size: cover;
  color: ${theme.colors.white};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-weight: 700;

  width: 100%;
  height: 21.35vw;
  font-size: 2.71vw;
  padding: 2.6vw;
  margin-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 48.5vw;
    font-size: 6.78vw;
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 47.2vw;
    font-size: 8.53vw;
    margin-top: 6.4vw;
  }
`;
