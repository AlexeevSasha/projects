import { quizEN } from "./quizEn";
import { quizRU } from "./quizRu";

export const langQuiz: { [key: string]: typeof quizRU } = {
  ru: quizRU,
  en: quizEN,
};
