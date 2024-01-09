import { createSlice } from "@reduxjs/toolkit";
import { AnswerEnum, AppearanceEnum, IQuiz } from "common/interfaces/IQuiz";
import { getQuizByFilter, getQuizById } from "./quizActionAsync";

export type QuizState = {
  isLoading: boolean;
  count: number;
  quiz?: IQuiz;
  quizList?: IQuiz[];
};

export const quizInitialState: QuizState = {
  isLoading: false,
  count: 0,
};

export const { actions: quizActions, reducer: quizReducer } = createSlice({
  name: "quiz",
  initialState: quizInitialState,
  reducers: {
    resetQuiz(state) {
      state.quiz = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuizByFilter.fulfilled, (state, { payload }) => {
        state.count = payload["@odata.count"];
        state.quizList = payload.value;
        state.isLoading = false;
      })
      .addCase(getQuizByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getQuizById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuizById.fulfilled, (state, { payload }) => {
        const data = {
          ...payload,
          Questions: payload.Questions.map((question) => ({
            ...question,
            Answers:
              // Если тип "Один правильный ответ", то нужно поместить его в поле NumOfTrueAnswer первого элемента Answers, чтобы форма могла правильно отобразить его
              question.AnswerType === AnswerEnum.MonoSelect
                ? question.Answers?.map((answer, index) => {
                    if (answer.IsCorrectAnswer && question.Answers) {
                      question.Answers[0].NumOfTrueAnswer = index;
                    }

                    return answer;
                  })
                : question.Answers,
          })),
        };
        state.quiz = data;
        state.isLoading = false;
      })
      .addCase(getQuizById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
