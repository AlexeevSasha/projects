import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import i18next from "i18next";
import { IPlayer, IPlayerFilters } from "../../api/dto/IPlayer";
import { addPlayer, deletePlayer, getPlayer, getPlayers, updatePlayer } from "../../api/requests/players";

export const getAllPlayersThunk = createAsyncThunk("players/getAllPlayers", async (request: IPlayerFilters) => await getPlayers(request));

export const getPlayerThunk = createAsyncThunk("players/getPlayer", async (id?: string) => await getPlayer(id));

export const addPlayerThunk = createAsyncThunk("players/addPlayer", async (data: IPlayer) => {
  const player = await addPlayer(data);
  message.success(i18next.t("success.create.player"));

  return player;
});

export const updatePlayerThunk = createAsyncThunk("players/updatePlayer", async (data: IPlayer) => {
  const player = await updatePlayer(data);
  message.success(i18next.t("success.update.player"));

  return player;
});

export const deletePlayerThunk = createAsyncThunk("players/updatePlayer", async (id: string) => {
  await deletePlayer(id);
  message.success(i18next.t("success.delete.player"));

  return;
});
