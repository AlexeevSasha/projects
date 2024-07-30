import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "../../api/dto/IPlayer";
import { addPlayerThunk, deletePlayerThunk, getAllPlayersThunk, getPlayerThunk, updatePlayerThunk } from "./playersActionAsync";

export const playersAdapter = createEntityAdapter<IPlayer>();

const initialPlayer: IPlayer = {
  id: "",
  avatarUri: "",
  birthday: "",
  country: "",
  firstName: "",
  lastName: "",
  height: 0,
  weight: 0,
  // eslint-disable-next-line id-blacklist
  number: 0,
  position: {
    id: "",
    name: "",
    category: ""
  },
  season: {
    id: "",
    name: ""
  },
  team: {
    id: "",
    name: ""
  },
  productUrl: "",
  profile: {
    biography: "",
    career: [{ id: "", club: "", period: "" }]
  },
  statistics: [
    {
      id: "",
      average: { effectiveness: 0, points: 0, selections: 0, transfers: 0 },
      total: { effectiveness: 0, points: 0, selections: 0, transfers: 0 },
      tournament: ""
    }
  ]
};

export const playersSlice = createSlice({
  name: "players",
  initialState: playersAdapter.getInitialState<{ isLoading: boolean; count: number; player: IPlayer }>({
    isLoading: false,
    count: 0,
    player: initialPlayer
  }),
  reducers: {},
  extraReducers: {
    [getAllPlayersThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllPlayersThunk.fulfilled.type]: (state, { payload }: PayloadAction<{ players: IPlayer[]; count: number }>) => {
      state.count = payload.count;
      playersAdapter.setAll(state, payload.players);
      state.isLoading = false;
    },
    [getAllPlayersThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [getPlayerThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getPlayerThunk.fulfilled.type]: (state, { payload }: PayloadAction<IPlayer>) => {
      state.isLoading = false;
      state.player = payload;
    },
    [getPlayerThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [addPlayerThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addPlayerThunk.fulfilled.type]: (state, { payload }: PayloadAction<IPlayer>) => {
      state.isLoading = false;
      state.count += 1;
      state.entities[payload.id] = payload;
    },
    [addPlayerThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [updatePlayerThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updatePlayerThunk.fulfilled.type]: (state, { payload }: PayloadAction<IPlayer>) => {
      playersAdapter.updateOne(state, { id: payload.id, changes: payload });
      state.isLoading = false;
    },
    [updatePlayerThunk.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [deletePlayerThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deletePlayerThunk.fulfilled.type]: (state, { payload }: PayloadAction<number>) => {
      playersAdapter.removeOne(state, payload);
      state.isLoading = false;
      state.count -= 1;
    },
    [deletePlayerThunk.rejected.type]: (state) => {
      state.isLoading = false;
    }
  }
});
