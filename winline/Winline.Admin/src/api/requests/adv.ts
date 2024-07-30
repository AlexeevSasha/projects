import { get, post, put, remove } from "../baseRequest";
import { generateODataQueryAdv } from "../../core/oDataQueryBuilders/generateODataQueryAdv";
import type { IAdv, IAdvFilters } from "../dto/adv/IAdv";
import type { Moment } from "moment";

export const getStatuses = async () => {
  const url = `${process.env.REACT_APP_ADMIN}/Banner/GetAllBannerStatus`;

  return await get(url);
};

export const getPlaces = async (data: Moment[], club: string, bannerId: string | undefined = undefined) => {
  const params = `?startPublish=${data[0].toDate().toISOString()}
    &endPublish=${data[1].toDate().toISOString()}
    &clubId=${club}
    ${bannerId ? "&bannerId=" + bannerId : ""}`;
  const url = `${process.env.REACT_APP_ADMIN}/Banner/GetLocations${params}`;

  return await get(url);
};

export const getBanners = async (body: IAdvFilters | undefined) => {
  const url = `${process.env.REACT_APP_ADMIN}/odata/Banner?${generateODataQueryAdv(body ?? undefined)}`;
  const response = await get(url, "application/json; odata.metadata=minimal; odata.streaming=true");

  return { data: response.value, count: response["@odata.count"] };
};

export const createBanner = async (body: IAdv): Promise<IAdv> =>
  post<string>(`${process.env.REACT_APP_ADMIN}/Banner/AddBanner`, JSON.stringify(body), "application/json");

export const updateBanner = async (body: IAdv): Promise<IAdv> =>
  put<string>(`${process.env.REACT_APP_ADMIN}/Banner/UpdateBanner`, JSON.stringify(body), "application/json");

export const deleteBanner = async (id: string) => remove(`${process.env.REACT_APP_ADMIN}/Banner/DeleteBanner?id=${id}`);
