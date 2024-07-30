import { get, remove } from "../baseRequest";
import { generateODataQueryUser } from "../../core/oDataQueryBuilders/users/generateODataQueryUser";
import type { IFiltersUser } from "../dto/users/IUser";

export const getUsers = async (body: IFiltersUser) => {
  const response = await get(`${process.env.REACT_APP_CLUB}/odata/User?${generateODataQueryUser(body)}`);

  return { allUsers: response.value, count: response["@odata.count"] };
};

export const revokeOfConsentWinLine = async (id: string) =>
  await remove(`${process.env.REACT_APP_CLUB}/User/RevokeOfConsentWinLine?userId=${id}`);
