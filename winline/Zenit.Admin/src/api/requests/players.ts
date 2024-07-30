import { generateODataQueryPlayers } from "../../core/oDataQueryBuilders/generateODataQueryPlayers";
import { get, post, put, remove } from "../baseRequest";
import { IAddPlayer, IPlayer, IPlayerFilters } from "../dto/IPlayer";

const path = `${process.env.REACT_APP_MOBILE}${process.env.REACT_APP_ADMIN}`;

export const getPositions = async () => {
  const url = `${path}/Player/GetPositions`;

  return await get(url);
};

export const getTeams = async () => {
  const url = `${path}/Player/GetTeams`;

  return await get(url);
};

export const getSeasons = async () => {
  const url = `${path}/Player/GetSeasons`;

  return await get(url);
};

export const getPlayers = async (body: IPlayerFilters) => {
  const url = `${process.env.REACT_APP_MOBILE}/odata/Player?${generateODataQueryPlayers(body)}`;
  const response = await get(url, "application/json; odata.metadata=minimal; odata.streaming=true");

  return { players: response.value, count: response["@odata.count"] };
};

export const getPlayer = async (id?: string) => {
  const url = `${path}/Player/GetPlayer?playerId=${id}`;

  return await get(url);
};

export const addPlayer = async (body: IAddPlayer): Promise<IPlayer> =>
  post<string>(`${path}/Player/AddPlayer`, JSON.stringify(body), "application/json");

export const updatePlayer = async (body: IPlayer): Promise<IPlayer> =>
  put<string>(`${path}/Player/UpdatePlayer`, JSON.stringify(body), "application/json");

export const deletePlayer = async (id: string) => remove(`${path}/Player/DeletePlayer?playerId=${id}`);
