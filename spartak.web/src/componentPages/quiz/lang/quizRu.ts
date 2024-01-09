import { declination } from "../../../assets/helpers/declination";

export const quizRU = {
  dateRange: (from: string, to: string) => `с ${from} до ${to}`,
  starting: "Участвовать",
  finishQuiz: {
    title: (ClientPoints: number, QuizPoints: number) => `Вы набрали ${ClientPoints} баллов из ${QuizPoints}`,
    description:
      "Спасибо, что приняли участие. Результаты будут подведены позднее.<br/> Будьте вместе с любимой командой, получайте призы от клуба и его партнеров!",
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
  points: (points: number) => `балл${points % 100 > 4 || points % 100 === 0 ? "ов" : points % 100 > 1 ? "а" : ""}`,
};
