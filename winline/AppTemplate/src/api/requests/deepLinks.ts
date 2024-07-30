import { get } from "../baseRequest";
import { IDeepLink } from "../dto/IDeepLink";

export const getDeepLinks = async () => {
  const response = await get(`${process.env.REACT_APP_ADMIN}/v1/DeepLink/GetDeepLinks`);

  return response.result.items;
};
