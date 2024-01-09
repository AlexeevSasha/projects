import { createAsyncThunk } from "@reduxjs/toolkit";
import { quizRepository } from "api/quizRepository";
import { IQuiz, IQuizFilter, IQuizResponse } from "common/interfaces/IQuiz";
import { ThunkApiType } from "common/interfaces/common";

export const getQuizByFilter = createAsyncThunk<IQuizResponse, IQuizFilter, ThunkApiType>(
  "quiz/byFilter",
  async (filters, { rejectWithValue }) => {
    return await quizRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getQuizById = createAsyncThunk<IQuiz, IQuiz["Id"], ThunkApiType>(
  "quiz/byId",
  async (filters, { rejectWithValue }) => {
    return await quizRepository.fetchById(filters).catch((error) => rejectWithValue({ error }));
  }
);
