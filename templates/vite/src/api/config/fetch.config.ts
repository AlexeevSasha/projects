// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { storage } from "@/common/utils/storage";
import { StorageEnum } from "@/common/interfaces/storage";
import { urlApi } from "@/common/constants/urlApi";
import { useUserStore } from "@/modules/user/store";

const originalFetch = fetch;
// eslint-disable-next-line no-native-reassign,no-global-assign
fetch = (...args: [input: RequestInfo | URL, init?: RequestInit | undefined]): Promise<Response> => {
  return originalFetch.apply(this, args).then(async (data) => {
    if (data.status === 401) {
      const response = await originalFetch(import.meta.env.VITE_BASE_URL + urlApi.auth.refresh, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 403 || response.status === 401) {
        await useUserStore.getState().logout();
        return data;
      }

      const { access_token } = await response.json();
      storage.set(StorageEnum.ACCESS_TOKEN, access_token);

      return fetch(args[0], { ...args[1], headers: { ...args[1]?.headers, Authorization: `Bearer ${access_token}` } });
    }
    return data;
  });
};

export default fetch;
