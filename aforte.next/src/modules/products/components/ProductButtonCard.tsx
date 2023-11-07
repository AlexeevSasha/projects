import { Button, ButtonType } from "../../../common/components/Button";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import styled from "astroturf/react";
import Link from "next/link";
import { CountButton } from "./CountButton";
import { AppContext } from "../../../common/components/ContextProvider";

type Props = {
  size?: "sm" | "md" | "lg";
  idProduct: string;
  toCart?: boolean;
  type?: ButtonType;
};

export const ProductButtonCard = ({ size = "md", idProduct, type = "blue", toCart }: Props) => {
  const { allProductInBasket, addProductToBasket } = useContext(AppContext);

  const open = useMemo(
    () => allProductInBasket.has(idProduct),
    [Array.from(allProductInBasket).length]
  );

  const handlerClick = useCallback(() => {
    addProductToBasket(idProduct, 1);
  }, []);

  return (
    <div onClick={(e) => e.preventDefault()}>
      {open ? (
        <>
          <CountButton idProduct={idProduct} size={size} />
          {toCart && (
            <Link href={"/basket"}>
              <CustomButton style={{ marginTop: 8 }} size={size} typeBtn={type}>
                Перейти в корзину
              </CustomButton>
            </Link>
          )}
        </>
      ) : (
        <CustomButton size={size} onClick={handlerClick} typeBtn={type}>
          Купить
        </CustomButton>
      )}
    </div>
  );
};

const CustomButton = styled(Button)<{ size?: Props["size"] }>`
  width: 100%;

  &.size-sm {
    padding: 7px 0;
  }
  &.size-md {
    padding: 10px 0;
  }
  &.size-lg {
    padding: 22px 0;
  }
`;
