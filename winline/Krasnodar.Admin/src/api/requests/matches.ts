import { get, post, put } from "../baseRequest";
import { generateODataQueryMatches } from "../../core/oDataQueryBuilders/generateODataQueryMatches";
import type { IMatch, IMatchFilters } from "../dto/IMatch";
import type { ISelect } from "../dto/ISelect";

export const getMatches = async (body: IMatchFilters) => {
  const url = `${process.env.REACT_APP_MOBILE}/odata/Matching?${generateODataQueryMatches(body)}`;
  const response = await get(url, "application/json; odata.metadata=minimal; odata.streaming=true");

  return { matches: response.value, count: response["@odata.count"] };
};

export const updateMatches = async (body: IMatch): Promise<IMatch> => {
  await put<string>(`${process.env.REACT_APP_MOBILE}/admin/Matching/updateMatch`, JSON.stringify(body), "application/json");

  return body;
};

export const getBiletkaData = async (date: string): Promise<ISelect[]> => {
  return get(`${process.env.REACT_APP_MOBILE}/admin/Matching/GetTicketMatches?matchDate=${date}`);
};

export const ReloadStatisticMatches = async () => {
  return await post(`${process.env.REACT_APP_MOBILE}/admin/Matching/ReloadStatisticMatches`, {});
};

export const SendTicketsNotification = async (id: string): Promise<IMatch> => {
  return await put(`${process.env.REACT_APP_MOBILE}/admin/Matching/SendTicketsNotification?matchId=${id}`);
};
