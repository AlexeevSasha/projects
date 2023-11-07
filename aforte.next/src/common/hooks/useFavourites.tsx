import { useCallback, useEffect, useState } from "react";
import { getCookie } from "../utils/getCookie";

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<{ id: string; isPharmacy: boolean }[]>([]);

  const addFavourites = useCallback((id: string, isPharmacy?: boolean) => {
    setFavourites((prev) => {
      document.cookie = `favourites=${JSON.stringify([
        ...prev,
        { id, isPharmacy: !!isPharmacy },
      ])};path=/`;
      return [...prev, { id, isPharmacy: !!isPharmacy }];
    });
  }, []);

  const deleteFavourites = useCallback((id: string) => {
    setFavourites((prev) => {
      const index = prev.findIndex((el) => el.id === id);
      document.cookie = `favourites=${JSON.stringify(
        prev.slice(0, index).concat(prev.slice(index + 1))
      )};path=/`;
      return prev.slice(0, index).concat(prev.slice(index + 1));
    });
  }, []);

  useEffect(() => {
    const favourites = JSON.parse(getCookie("favourites") || "[]") as [];
    favourites.length && setFavourites(favourites);
  }, []);

  return {
    favourites,
    addFavourites,
    deleteFavourites,
  };
};
