import { get } from "../baseRequest";

export const getClubs = async () => {
  const response = await get(`${process.env.REACT_APP_ADMIN}/odata/Club`, "application/json");

  return response.value;
};
