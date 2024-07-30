import {get} from "../baseRequest";
import {IDeepLink} from "../dto/IDeepLink";

export const getDeepLinks = async (): Promise<IDeepLink[]> =>
  await get(`${process.env.REACT_APP_ADMIN}/DeepLink/GetDeepLinks`);
