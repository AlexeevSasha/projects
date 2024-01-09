import { useRouter } from "next/router";
import { useState, useContext } from "react";
import styled from "styled-components";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { theme } from "../../../../assets/theme/theme";
import { Input } from "../../../../components/input/input";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { IQuiz, IQuizAnswerSubmit } from "../../interfaces/IQuiz";
import { QuestionContainer, QuestionTitle, StepOfQuiz } from "./questionComponents";
import { ThemeContext } from "../../../../core/themeProvider";
import { lang } from "../../../../../public/locales/lang";

interface IProps {
  question: IQuiz["Questions"][0];
  step: number;
  countSteps: number;
  onNextStep: (value: IQuizAnswerSubmit["Questions"][0]) => void;
}

export const QuestionFreeAnswer = (props: IProps) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { locale = "ru" } = useRouter();
  const [questAnswers, setQuestAnswers] = useState("");

  // При переходе к следующему шагу, сохраняет ответ в стейт родителя
  const checkAnswer = () => {
    props.onNextStep({
      QuestionId: props.question.Id,
      Responses: [{ AnswerId: null, ClientFreeResponse: questAnswers }],
    });
    setQuestAnswers("");
  };

  return (
    <QuestionContainer>
      <QuestionTitle dangerouslySetInnerHTML={{ __html: getLocalValue(props.question.Text, locale) }} />
      {props.question.QuestionImage ? (
        <ImageContainer>
          <NextImage src={props.question.QuestionImage} alt={getLocalValue(props.question.Text, locale)} />
        </ImageContainer>
      ) : null}
      <Answer>
        <Input
          label={lang[locale].profile.quiz.yourAnswer}
          lightStyle={!isDarkTheme}
          value={questAnswers}
          onChange={(e) => setQuestAnswers(e.currentTarget.value)}
        />
      </Answer>

      <StepOfQuiz
        step={props.step}
        countSteps={props.countSteps}
        onCheck={checkAnswer}
        isChecked={false}
        disabled={!questAnswers.length}
      />
    </QuestionContainer>
  );
};

const ImageContainer = styled.div`
  width: 100%;
  height: 21.35vw;
  margin-top: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 49.02vw;
    margin-top: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 47.47vw;
    margin-top: 4.27vw;
  }
`;

const Answer = styled.div`
  display: grid;
  align-items: center;
  margin-top: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 4.27vw;
  }
`;
