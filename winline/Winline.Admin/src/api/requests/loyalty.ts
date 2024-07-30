import { generateODataQueryLoyalty } from "../../core/oDataQueryBuilders/generateODataQueryLoyalty";

import { get, post, put, remove } from "../baseRequest";
import { ILoyalty, ILoyaltyFilters } from "../dto/loyalty/ILoyalty";

export const getLoyalty = async (body: ILoyaltyFilters) => {
  const url = `${process.env.REACT_APP_ADMIN}/odata/Loyalty?${generateODataQueryLoyalty(body)}`;
  const response = await get(url, "application/json; odata.metadata=minimal; odata.streaming=true");
  const data = response.value;

  return { data, count: response["@odata.count"] };
};

export const getAvailability = async () => {
  const url = `${process.env.REACT_APP_ADMIN}/Loyalty/GetAllAvailabilityConditionType`;

  return await get(url);
};

export const getEvents = async (clubId: string) => {
  const response = await get(`${process.env.REACT_APP_ADMIN}/ClubEventSectors/GetEvents?clubId=${clubId}`, "application/json");

  return response;
};

export const getSectors = async (eventId: string) => {
  const response = await get(`${process.env.REACT_APP_ADMIN}/ClubEventSectors/GetSectors?eventId=${eventId}`, "application/json");

  return response;
};

export const getLoyaltyReport = async () => {
  const response = await get(`${process.env.REACT_APP_ADMIN}/LoyaltyReport/GetReport`, "application/csv");

  return response.value;
};

export const getLoyaltyType = async () => {
  const url = `${process.env.REACT_APP_ADMIN}/Loyalty/GetAllAwardType`;

  return await get(url);
};

export const getLoyaltyStatuses = async () => {
  const url = `${process.env.REACT_APP_ADMIN}/Loyalty/GetAllLoyaltyStatus`;

  return await get(url);
};

export const addLoyalty = async (body: ILoyalty): Promise<ILoyalty> =>
  post<string>(`${process.env.REACT_APP_ADMIN}/Loyalty/AddLoyalty`, JSON.stringify(body), "application/json");

export const updateLoyalty = async (body: ILoyalty): Promise<ILoyalty> =>
  put<string>(`${process.env.REACT_APP_ADMIN}/Loyalty/UpdateLoyalty`, JSON.stringify(body), "application/json");

export const endLoyalty = async (id: string): Promise<ILoyalty> =>
  put<string>(`${process.env.REACT_APP_ADMIN}/Loyalty/SetOutOfStockLoyalty`, JSON.stringify(id), "application/json");

export const deleteLoyalty = async (id: string) => remove(`${process.env.REACT_APP_ADMIN}/Loyalty/DeleteLoyalty?id=${id}`);
