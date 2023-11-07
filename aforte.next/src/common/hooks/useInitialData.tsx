import { useEffect, useState } from "react";
import seoData from "../../../public/seo/seoData.json";
import NodeCache from "node-cache";
import { CategoryT } from "modules/categories/interfaces/category";
import { MetaTagsT } from "common/components/baseMeta/baseMeta";
import { getCategories } from "api/categoriesApi";
import { LocationT } from "common/interfaces/location";
import { getUserLocation } from "api/outletsApi";

if (globalThis && !(globalThis as any).dataCache) {
  (globalThis as any).dataCache = new NodeCache();
}

export type InitialDataT = {
  metaTags?: MetaTagsT;
  mainCategories?: CategoryT[];
  userLocation?: LocationT;
};

type Props = {
  pathname?: string;
};
// Метод для получения общих данных для всех страниц
export const getInitialData = async ({ pathname }: Props = {}) => {
  const dataCache = (globalThis as any).dataCache;

  const data: Partial<InitialDataT> = {
    mainCategories: dataCache.get("mainCategories"),
    userLocation: dataCache.get("userLocation"),
    metaTags: pathname ? (seoData as Record<string, any>)[pathname] : null,
  };

  if (!data.mainCategories || !data.mainCategories.length) {
    const result = await getCategories({ parent: null });
    data.mainCategories = result.errors && !result.errors?.length ? result.data.items : [];
    data.mainCategories.length && dataCache.set("mainCategories", data.mainCategories, 60);
  }

  if (!data.userLocation) {
    const result = await getUserLocation();
    data.userLocation = result.errors && !result.errors?.length ? result.data.items[0] : undefined;
    data.userLocation && dataCache.set("userLocation", data.userLocation, 60);
  }

  return data;
};

type PropsHook = {
  initialData?: InitialDataT;
};
// Хук для подписки на изменение и получение общих данных на все страницы
export const useInitialData = ({ initialData }: PropsHook) => {
  const [data, setData] = useState<InitialDataT | undefined>(initialData);

  useEffect(() => {
    initialData && setData({ ...data, ...initialData });
  }, [initialData]);

  const updateLocation = (location: LocationT) => {
    document.cookie = `regionFias=${location.regionFias}; expires=3600; path=/`;
    setData({ ...data, userLocation: location });
  };

  return { initialData: data, updateLocation };
};
