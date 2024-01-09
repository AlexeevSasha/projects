import { useRouter } from "next/router";
import { useContext, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import { specialOffersRepository } from "../../../../api/specialOffers";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { theme } from "../../../../assets/theme/theme";
import { Checkbox } from "../../../../components/checkbox";
import { Input } from "../../../../components/input/input";
import { ThemeContext } from "../../../../core/themeProvider";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { ICorrectQuizAnswerResponse, IQuiz, IQuizAnswerSubmit } from "../../interfaces/IQuiz";
import { QuestionContainer, QuestionTitle, StepOfQuiz } from "./questionComponents";
import { ResultAnswerQuiz } from "./resultAnswerQuiz";

interface IProps {
  question: IQuiz["Questions"][0];
  step: number;
  countSteps: number;
  onNextStep: (value: IQuizAnswerSubmit["Questions"][0]) => void;
}

export const QuestionMultiSelect = (props: IProps) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { locale = "ru" } = useRouter();
  const [questAnswers, setQuestAnswers] = useState<string[]>([]);
  const [questFreeAnswers, setQuestFreeAnswers] = useState("");
  const [checkResult, setCheckResult] = useState<ICorrectQuizAnswerResponse[]>([]);

  const checkAnswer = () => {
    specialOffersRepository
      .checkAnswer({
        QuestionId: props.question.Id,
        Responses:
          props.question.Answers?.map((answer) => ({
            AnswerId: answer.Id,
            IsClientResponded: questAnswers.includes(answer.Id),
          })) || [],
      })
      .then((res) => {
        setCheckResult(res);
      })
      .catch((err) => {
        setCheckResult(err);
      });
  };

  // При переходе к следующему шагу, сохраняет ответ в стейт родителя
  const nextStep = () => {
    props.onNextStep({
      QuestionId: props.question.Id,
      Responses: questFreeAnswers ? [...checkResult, { ClientFreeResponse: questFreeAnswers }] : checkResult,
    });
    setCheckResult([]);
    setQuestAnswers([]);
  };

  return (
    <QuestionContainer>
      <QuestionTitle dangerouslySetInnerHTML={{ __html: getLocalValue(props.question.Text, locale) }} />
      {props.question.QuestionImage ? (
        <ImageContainer>
          <NextImage src={props.question.QuestionImage} alt={getLocalValue(props.question.Text, locale)} />
        </ImageContainer>
      ) : null}
      {checkResult.length
        ? checkResult.map((elem) => (
            <ResultAnswerQuiz
              key={elem.AnswerId}
              checkedResult={elem}
              questionAnswers={props.question.Answers?.find((answer) => elem.AnswerId === answer.Id)}
              points={elem.Points}
            />
          ))
        : props.question.Answers?.map((elem) => (
            <Answer key={elem.Id}>
              <Checkbox
                value={elem.Id}
                label={getLocalValue(elem.Text, locale)}
                onChange={() => {
                  setQuestAnswers(
                    questAnswers.includes(elem.Id)
                      ? questAnswers.filter((answer) => answer !== elem.Id)
                      : questAnswers.length < props.question.CorrectAnswerCount
                      ? [...questAnswers, elem.Id]
                      : questAnswers
                  );
                }}
                checked={questAnswers.includes(elem.Id)}
                lightStyle={!isDarkTheme}
              />
            </Answer>
          ))}
      <FreeAnswer>
        {props.question.IsAdditionalFreeAnswer ? (
          <Input
            label={lang[locale].profile.quiz.yourAnswer}
            lightStyle={!isDarkTheme}
            value={questFreeAnswers}
            onChange={(e) => setQuestFreeAnswers(e.currentTarget.value)}
          />
        ) : null}
      </FreeAnswer>
      <StepOfQuiz
        step={props.step}
        countSteps={props.countSteps}
        onCheck={checkAnswer}
        onNext={nextStep}
        isChecked={!!checkResult.length}
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
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.grayDark_grayLight};
  margin-top: 0.83vw;
  padding: 0.83vw 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 2.09vw;
    padding: 2.09vw 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 4.27vw;
    padding: 3.2vw 3.2vw;
  }
`;

const FreeAnswer = styled.div<{ status?: string }>`
  display: flex;
  align-items: center;
  margin-top: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 4.27vw;
  }
`;
