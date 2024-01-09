import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { specialOffersRepository } from "../../../api/specialOffers";
import { theme } from "../../../assets/theme/theme";
import { LoadingScreen } from "../../../ui/LoadingScreen ";
import { AnswerEnum, AppearanceEnum, IQuiz, IQuizAnswerSubmit } from "../interfaces/IQuiz";
import { QuestionFreeAnswer } from "./questions/questionFreeAnswer";
import { QuestionMonoSelect } from "./questions/questionMonoSelect";
import { QuestionMonoSelectWithImg } from "./questions/questionMonoSelectWithImg";
import { QuestionMultiSelect } from "./questions/questionMultiSelect";
import { QuestionMultiSelectWithImg } from "./questions/questionMultiSelectWithImg";
import { SummaryScreen } from "./questions/summaryScreen";

interface IProps {
  quizId: IQuiz["Id"];
  statistic: IQuiz["ClientQuizStatistic"];
}

// Экспортировать вне модуля только через конструкцию Quiz.[Component]
export const QuizQuestions = (props: IProps) => {
  // Хранит все ответы пользователя
  const [questAnswers, setQuestAnswers] = useState<IQuizAnswerSubmit["Questions"]>([]);
  const { query } = useRouter();
  const [questions, setQuestions] = useState<IQuiz["Questions"]>([]);
  const [statistic, setStatistic] = useState(props.statistic);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const nextStep = (answer: IQuizAnswerSubmit["Questions"][0]) => {
    if (step + 1 < questions.length) {
      setStep(step + 1);
      setQuestAnswers([...questAnswers, answer]);
    } else {
      specialOffersRepository.submitQuiz({ QuizId: props.quizId, Questions: [...questAnswers, answer] }).then((res) => {
        setStatistic(res);
        setQuestions([]);
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    specialOffersRepository
      .startingQuiz(String(query?.id))
      .then((res) => {
        if (!res.UserValidation) {
          setQuestions(res.Questions);
        } else {
          setQuestions([{ AnswerType: AnswerEnum.Errors } as IQuiz["Questions"][0]]);
        }
      })
      .catch((err) => {
        console.error("starting quiz is Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderQuestion = () => {
    if (statistic) {
      return <SummaryScreen clientQuizStatistic={statistic} />;
    }
    switch (questions[step]?.AnswerType) {
      case AnswerEnum.FreeAnswer: {
        return (
          <QuestionFreeAnswer
            question={questions[step]}
            step={step}
            countSteps={questions.length}
            onNextStep={nextStep}
          />
        );
      }
      case AnswerEnum.MonoSelect: {
        switch (questions[step]?.AppearanceAnswer) {
          case AppearanceEnum.Text: {
            return (
              <QuestionMonoSelect
                question={questions[step]}
                step={step}
                countSteps={questions.length}
                onNextStep={nextStep}
              />
            );
          }
          case AppearanceEnum.WithImage: {
            return (
              <QuestionMonoSelectWithImg
                question={questions[step]}
                step={step}
                countSteps={questions.length}
                onNextStep={nextStep}
              />
            );
          }
        }
      }
      case AnswerEnum.Multiselect: {
        switch (questions[step]?.AppearanceAnswer) {
          case AppearanceEnum.Text: {
            return (
              <QuestionMultiSelect
                question={questions[step]}
                step={step}
                countSteps={questions.length}
                onNextStep={nextStep}
              />
            );
          }
          case AppearanceEnum.WithImage: {
            return (
              <QuestionMultiSelectWithImg
                question={questions[step]}
                step={step}
                countSteps={questions.length}
                onNextStep={nextStep}
              />
            );
          }
        }
      }
      case "Errors": {
        return <Answer>Не выполнены условия для участия в конкурсе</Answer>;
      }
      default: {
        return <Answer>Ошибка в вопросе, обратитесь в службу поддержки</Answer>;
      }
    }
  };

  return loading ? <LoadingScreen /> : <section>{renderQuestion()}</section>;
};

const Answer = styled.div<{ status?: string }>`
  display: flex;
  align-items: center;
  border: 1px solid ${theme.colors.grayDark};
  color: ${(props) => props.theme.colors.white_black};
  margin-top: 0.83vw;
  padding: 0.83vw 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    padding: 2.09vw 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding: 3.2vw 3.2vw;
  }
`;
