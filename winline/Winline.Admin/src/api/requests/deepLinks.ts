import { get } from "../baseRequest";
import { IDeepLink } from "../dto/IDeepLink";

export const getDeepLinks = async (id: string): Promise<IDeepLink[]> =>
  await get(`${process.env.REACT_APP_ADMIN}/DeepLink/GetByClubId/${id}`);
