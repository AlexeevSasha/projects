import { QueryT } from "./../common/interfaces/query.d";
import { LocationT } from "common/interfaces/location";
import { api, setQueryParams } from "./baseApi";

export const getUserLocation = () => api.get<LocationT>("outlets/locations?page=1&limit=10");

export const getLocationsWithAbort = (query: QueryT) => {
  const abortController = new AbortController();
  return {
    promise: api.get<LocationT>(`outlets/locations?${setQueryParams(query)}`, {
      signal: abortController.signal,
    }),
    abortController,
  };
};
