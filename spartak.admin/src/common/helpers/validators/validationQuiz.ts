import { AnswerEnum, IQuiz } from "common/interfaces/IQuiz";

export const validationQuiz = (data: IQuiz["Questions"]) => {
  return data.find(
    (elem) =>
      // В вопросе должно быть минимум 2 ответа
      // (elem.AppearanceAnswer !== AppearanceEnum.FreeAnswer && Number(elem.Answers?.length) < 2) ||
      // В вопросе должен быть хотя бы один правильный ответ
      elem.AnswerType !== AnswerEnum.FreeAnswer && !elem.Answers?.find((answer) => answer.IsCorrectAnswer)
  )
    ? "queez.queezQuestions.validation.multiAnswer"
    : data.find((elem) =>
        // В правильных ответах должны быть баллы
        elem.Answers?.find((answer) => answer.IsCorrectAnswer && !Number(answer.Points))
      )
    ? "queez.queezQuestions.validation.emptyPoint"
    : data.find(
        (elem) =>
          // Все ответы не могут быть правильными
          elem.AnswerType === AnswerEnum.Multiselect &&
          elem.Answers?.filter((answer) => answer.IsCorrectAnswer).length === elem.Answers?.length
      )
    ? "queez.queezQuestions.validation.multiAllRight"
    : "";
};
