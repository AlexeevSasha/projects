import { get } from "../baseRequest";

export const getCities = async () => {
  const response = await get(`${process.env.REACT_APP_ADMIN}/odata/City?$orderby=OrderNum asc`, "application/json");

  return response.value;
};
