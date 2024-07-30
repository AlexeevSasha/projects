import { get } from "../baseRequest";
import { generateODataQueryUser } from "../../core/oDataQueryBuilders/users/generateODataQueryUser";
import type { IFiltersUser } from "../dto/users/IUser";

export const getUsers = async (body: IFiltersUser) => {
  const response = await get(`${process.env.REACT_APP_PROFILE}/odata/UserList?${generateODataQueryUser(body)}`);

  return { allUsers: response.value, count: response["@odata.count"] };
};
