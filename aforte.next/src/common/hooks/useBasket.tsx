import { useEffect, useState } from "react";
import { getCookie } from "../utils/getCookie";

export const useBasket = () => {
  const [allProductInBasket, setAllProduct] = useState<Map<string, number>>(new Map());

  const addProductToBasket = (id: string, count: number) => {
    setAllProduct((prev) => {
      const newProducts = new Map(prev).set(id, count);
      document.cookie = `basket=${JSON.stringify([...Array.from(newProducts)])};path=/`;
      return newProducts;
    });
  };

  const deleteProductFromBasket = (id: string, deleteAll?: boolean, ids?: string[]) => {
    setAllProduct((prev) => {
      const newProducts = new Map(prev);
      deleteAll ? ids?.forEach((el) => newProducts.delete(el)) : newProducts.delete(id);
      document.cookie = `basket=${JSON.stringify([...Array.from(newProducts)])};path=/`;
      return newProducts;
    });
  };

  useEffect(() => {
    const allProduct = JSON.parse(getCookie("basket") || "[]") as [string, number][];
    allProduct.length && setAllProduct(new Map(allProduct));
  }, []);

  return {
    allProductIdsBasket: Array.from(allProductInBasket.keys()),
    allProductInBasket,
    addProductToBasket,
    deleteProductFromBasket,
  };
};
