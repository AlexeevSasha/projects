import { get, post, put, remove } from "../baseRequest";
import { generateODataQueryLoyaltyProgram } from "../../core/oDataQueryBuilders/pointsSystem/generateODataQueryLoyaltyProgram";
import { generateODataQueryProduct } from "../../core/oDataQueryBuilders/pointsSystem/generateODataQueryProduct";
import { generateODataQueryOrder } from "../../core/oDataQueryBuilders/pointsSystem/generateODataQueryOrder";
import type {
  IFilters,
  ILoyaltyProgramFilters,
  IBaseFilters,
  ILoyaltyProgram,
  IProduct,
  IOrder,
  IPoll,
  IPlayer
} from "../dto/pointsSystem";
import type { ISelect } from "../dto/ISelect";
import { generateODataQueryPoll } from "../../core/oDataQueryBuilders/pointsSystem/generateODataQueryPoll";

export const getLoyaltyPrograms = async (body: ILoyaltyProgramFilters) => {
  const url = `${process.env.REACT_APP_MOBILE}/odata/LoyaltyProgram?${generateODataQueryLoyaltyProgram(body)}`;
  const response = await get(url, "application/json; odata.metadata=minimal; odata.streaming=true");

  return { data: response.value, count: response["@odata.count"] };
};

export const updateLoyaltyPrograms = async (body: ILoyaltyProgram): Promise<ILoyaltyProgram> =>
  await put<string>(`${process.env.REACT_APP_MOBILE}/admin/LoyaltyProgram/${body.id}`, JSON.stringify(body), "application/json");

export const getProducts = async (body: IFilters) => {
  const response = await get(
    `${process.env.REACT_APP_MOBILE}/odata/Product?${generateODataQueryProduct(body)}`,
    "application/json; odata.metadata=minimal; odata.streaming=true"
  );

  return { data: response.value, count: response["@odata.count"] };
};

export const createProduct = async (body: IProduct): Promise<IProduct> =>
  await post(`${process.env.REACT_APP_MOBILE}/admin/product`, JSON.stringify(body), "application/json");

export const updateProduct = async (body: IProduct): Promise<IProduct> =>
  await put(`${process.env.REACT_APP_MOBILE}/admin/product/${body.id}`, JSON.stringify(body), "application/json");

export const changeVisibilityProduct = async (body: IProduct): Promise<IProduct> =>
  await post(`${process.env.REACT_APP_MOBILE}/admin/product/changeVisibility`, JSON.stringify(body), "application/json");

export const deleteProduct = async (id: string) => await remove(`${process.env.REACT_APP_MOBILE}/admin/product/${id}`);

export const getOrders = async (body: IBaseFilters<IOrder>) => {
  const url = `${process.env.REACT_APP_MOBILE}/odata/productOrder?${generateODataQueryOrder(body)}`;
  const response = await get(url, "application/json; odata.metadata=minimal; odata.streaming=true");

  return { data: response.value, count: response["@odata.count"] };
};

export const ChangeOrderStatus = async (body: IOrder): Promise<{ id: string; status: string }> =>
  await post(`${process.env.REACT_APP_MOBILE}/admin/productOrder/changeStatus`, JSON.stringify(body), "application/json");

export const getOrderStatuses = async () => await get(`${process.env.REACT_APP_MOBILE}/admin/productOrder/statuses`);

export const getPolls = async (body: IBaseFilters<IPoll>) => {
  const url = `${process.env.REACT_APP_MOBILE}/odata/poll?${generateODataQueryPoll(body)}`;
  const response = await get(url, "application/json; odata.metadata=minimal; odata.streaming=true");

  return { data: response.value, count: response["@odata.count"] };
};

export const getPollById = async (id: string) => await get(`${process.env.REACT_APP_MOBILE}/admin/poll/${id}`);

export const createPoll = async (body: IPoll): Promise<IPoll> =>
  await post(`${process.env.REACT_APP_MOBILE}/admin/poll/${body.type}`, JSON.stringify(body), "application/json");

export const updatePoll = async (body: IPoll): Promise<IPoll> =>
  await put(`${process.env.REACT_APP_MOBILE}/admin/poll/${body.type}/${body.id}`, JSON.stringify(body), "application/json");

export const setResultPoll = async (body: Partial<IPoll>): Promise<IPoll> => {
  const { type, ...rest } = body;

  return await post(`${process.env.REACT_APP_MOBILE}/admin/poll/${type}/setResult`, JSON.stringify(rest), "application/json");
};

export const deletePoll = async (id: string) => await remove(`${process.env.REACT_APP_MOBILE}/admin/poll/${id}`);

export const getPollStatuses = async () => await get(`${process.env.REACT_APP_MOBILE}/admin/poll/statuses`);

export const getMatches = async (): Promise<ISelect[]> => await get(`${process.env.REACT_APP_MOBILE}/admin/poll/matches`);

export const getPlayers = async (id: string): Promise<IPlayer[]> => await get(`${process.env.REACT_APP_MOBILE}/admin/poll/${id}/players`);

export const getTeamsByMatchId = async (id: string): Promise<ISelect[]> =>
  await get(`${process.env.REACT_APP_MOBILE}/admin/poll/matches/${id}/teams`);
