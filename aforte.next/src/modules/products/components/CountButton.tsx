import { memo, useCallback, useContext, useEffect, useState } from "react";
import { IconMinus } from "../../../common/components/icons/IconMinus";
import { IconPlus } from "../../../common/components/icons/IconPlus";
import styled from "astroturf/react";
import { AppContext } from "../../../common/components/ContextProvider";

type Props = {
  size?: "sm" | "md" | "lg";
  idProduct: string;
};

export const CountButton = memo(({ size, idProduct }: Props) => {
  const { addProductToBasket, allProductInBasket } = useContext(AppContext);

  const [count, setCount] = useState(1);
  const decrement = useCallback(
    () =>
      setCount((prev) => {
        const number = prev - 1;
        addProductToBasket(idProduct, number);
        return number;
      }),
    []
  );
  const increment = useCallback(
    () =>
      setCount((prev) => {
        const number = prev + 1;
        addProductToBasket(idProduct, number);
        return number;
      }),
    []
  );

  useEffect(() => {
    if (allProductInBasket.get(idProduct)) {
      setCount(allProductInBasket.get(idProduct) as number);
    }
  }, [allProductInBasket]);

  return (
    <Container size={size}>
      <IconContainer disable={count === 1} onClick={decrement}>
        <IconMinus />
      </IconContainer>
      <span>{count}</span>
      <IconContainer onClick={increment}>
        <IconPlus />
      </IconContainer>
    </Container>
  );
});

const Container = styled.div<{ size?: Props["size"] }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 16px;
  background: rgba(224, 233, 247, 0.3);
  border-radius: 16px;
  width: 100%;

  &.size-lg {
    padding: 20px 16px;
  }
`;

const IconContainer = styled.span<{ disable?: boolean }>`
  cursor: pointer;

  &.disable {
    pointer-events: none;

    svg path {
      fill: #c4c4c4;
    }
  }
`;
