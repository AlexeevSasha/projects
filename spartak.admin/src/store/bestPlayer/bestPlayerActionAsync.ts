import { createAsyncThunk } from "@reduxjs/toolkit";
import { bestPlayerRepository } from "api/bestPlayerRepository";
import { clubsPlayersRepository } from "api/playersRepository";
import { teamsRepository } from "api/teamsRepository";
import { validationSearchUserName } from "common/helpers/validators/validationSearchUserName";
import {
  BestPlayerEntity,
  BestPlayerFiltersType,
  BestPlayerResponce,
  SeasonsForMvp,
  VotingEntity,
  VotingMatch,
} from "common/interfaces/bestPlayer";
import { ThunkApiType } from "common/interfaces/common";
import { Player, PlayersFilters, PlayerType } from "common/interfaces/players";
import { StateType } from "store";

export const getBestPlayerList = createAsyncThunk<BestPlayerResponce, BestPlayerFiltersType, ThunkApiType>(
  "bestPlayer/byFilter",
  (filters, { rejectWithValue }) => {
    validationSearchUserName(filters.FullName);

    return bestPlayerRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }));
  }
);

export const getBestPlayer = createAsyncThunk<BestPlayerEntity, BestPlayerEntity["Id"], ThunkApiType>(
  "bestPlayer/byId",
  (id, { rejectWithValue }) => bestPlayerRepository.fetchById(id).catch((error) => rejectWithValue({ error }))
);

export const saveVoting = createAsyncThunk<void, VotingEntity, ThunkApiType>(
  "bestPlayer/publish",
  (voting, { rejectWithValue }) => bestPlayerRepository.saveVoting(voting).catch((error) => rejectWithValue({ error }))
);

export const deleteBestPlayer = createAsyncThunk<void, BestPlayerEntity["Id"], ThunkApiType>(
  "bestPlayer/delete",
  (id, { rejectWithValue }) => bestPlayerRepository.remove(id).catch((error) => rejectWithValue({ error }))
);

export const getMainTeamPlayers = createAsyncThunk<Player[], undefined, ThunkApiType>(
  "bestPlayer/getMainTeamPlayers",
  async (_, { rejectWithValue, getState }) => {
    const { mainTeamPlayers } = (getState() as StateType).bestPlayer;
    if (!mainTeamPlayers.length) {
      try {
        const { Id } = (await teamsRepository.fetchByFilter({ SortOrder: 1, Section: "Site" })).teams[0] || {};

        return clubsPlayersRepository.fetchMainTeamPlayers(Id, "Published", PlayerType.own);
      } catch (error) {
        rejectWithValue({ error });
      }
    }

    return mainTeamPlayers;
  }
);

export const getVotingMatches = createAsyncThunk<VotingMatch[], undefined, ThunkApiType>(
  "bestPlayer/getVotingMatches",
  (_, { rejectWithValue }) => bestPlayerRepository.getVotingMatches().catch((error) => rejectWithValue({ error }))
);
export const getSeasonForMvp = createAsyncThunk<SeasonsForMvp[], undefined, ThunkApiType>(
  "bestPlayer/GetSeasonForMvp",
  (_, { rejectWithValue }) => bestPlayerRepository.getSeasonForMvp().catch((error) => rejectWithValue({ error }))
);
