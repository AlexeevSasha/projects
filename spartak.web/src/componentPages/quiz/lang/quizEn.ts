import { declination } from "../../../assets/helpers/declination";
import { quizRU } from "./quizRu";

export const quizEN: typeof quizRU = {
  dateRange: (from: string, to: string) => `from ${from} to ${to}`,
  starting: "Start",
  finishQuiz: {
    title: (ClientPoints: number, QuizPoints: number) => `Вы набрали ${ClientPoints} баллов из ${QuizPoints}`,
    description:
      "Спасибо, что приняли участие. Результаты будут подведены позднее. Будьте вместе с любимой командой, получайте призы от клуба и его партнеров!",
    countRightAnswers: (ClientCorrectQuestions: number, QuizCorrectQuestions: number) =>
      QuizCorrectQuestions !== 0
        ? `${ClientCorrectQuestions} ${declination("вопрос", ClientCorrectQuestions)} из ${QuizCorrectQuestions}`
        : "",
  },
  numberOfQuestions: (step: number, countSteps: number) => `Вопрос ${step} из ${countSteps}`,
  buttonCheck: "ответить",
  buttonNext: "дальше",
  answer: {
    success: "Ответ верный",
    error: "Упс, ответ неверный!",
  },
  points: (points: number) => `point${points > 1 ? "s" : ""}`,
};
