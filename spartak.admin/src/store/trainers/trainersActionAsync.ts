import { createAsyncThunk } from "@reduxjs/toolkit";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import { ThunkApiType } from "common/interfaces/common";
import { trainersRepository } from "../../api/trainersRepository";
import { Trainer, TrainerFilters, TrainerResponse } from "../../common/interfaces/trainers";

export const getTrainers = createAsyncThunk<TrainerResponse, TrainerFilters, ThunkApiType>(
  "trainers/getTrainers",
  async (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return await trainersRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getTrainer = createAsyncThunk<Trainer, Trainer["Id"], ThunkApiType>(
  "trainers/getTrainer",
  async (id, { rejectWithValue }) => {
    return await trainersRepository.fetchById(id).catch((error) => rejectWithValue({ error }));
  }
);

export const publishTrainer = createAsyncThunk<void, Trainer, ThunkApiType>(
  "trainers/publishTrainer",
  async (trainer, { rejectWithValue }) => {
    return await trainersRepository.publish(trainer).catch((error) => rejectWithValue({ error }));
  }
);

export const draftTrainer = createAsyncThunk<void, Trainer, ThunkApiType>(
  "trainers/draftTrainer",
  async (trainer, { rejectWithValue }) => {
    return await trainersRepository.draft(trainer).catch((error) => rejectWithValue({ error }));
  }
);

export const deleteTrainer = createAsyncThunk<void, Trainer["Id"], ThunkApiType>(
  "trainers/deleteTrainer",
  async (id, { rejectWithValue }) => {
    return await trainersRepository.deleteTrainer(id).catch((error) => rejectWithValue({ error }));
  }
);
