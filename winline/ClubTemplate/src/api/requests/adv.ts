import { get, post, put, remove } from "../baseRequest";
import { generateODataQueryAdv } from "../../core/oDataQueryBuilders/generateODataQueryAdv";
import type { IAdv, IAdvFilters } from "../dto/adv/IAdv";
import type { Moment } from "moment";

const path = `${process.env.REACT_APP_MOBILE}${process.env.REACT_APP_ADMIN}`;
export const getStatuses = async () => {
  const url = `${path}/Banner/GetAllBannerStatus`;

  return await get(url);
};

export const getPlaces = async (data: Moment[], bannerId: string | undefined = undefined) => {
  const params = `?startPublish=${data[0].toDate().toISOString()}
    &endPublish=${data[1].toDate().toISOString()}
    ${bannerId ? "&bannerId=" + bannerId : ""}`;
  const url = `${path}/Banner/GetLocations${params}`;

  return await get(url);
};

export const getBanners = async (body: IAdvFilters) => {
  const url = `${process.env.REACT_APP_MOBILE}/odata/Banner?${generateODataQueryAdv(body ?? undefined)}`;
  const response = await get(url, "application/json; odata.metadata=minimal; odata.streaming=true");

  return { data: response.value, count: response["@odata.count"] };
};

export const createBanner = async (body: IAdv): Promise<IAdv> =>
  post<string>(`${path}/Banner/AddBanner`, JSON.stringify(body), "application/json");

export const updateBanner = async (body: IAdv): Promise<IAdv> =>
  put<string>(`${path}/Banner/UpdateBanner`, JSON.stringify(body), "application/json");

export const deleteBanner = async (id: string) => remove(`${path}/Banner/DeleteBanner?id=${id}`);
