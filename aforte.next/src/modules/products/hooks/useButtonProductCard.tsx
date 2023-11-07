import { useContext, useMemo, useState } from "react";
import { ProductButtonCard } from "../components/ProductButtonCard";
import styled from "astroturf/react";
import { Button } from "../../../common/components/Button";
import { ProductT } from "../interfaces/product";
import { AppContext } from "../../../common/components/ContextProvider";
import { ModalNames } from "../../../common/interfaces/modal";
import { Product } from "../components/Product";
import { wordDeclension } from "../../../common/utils/wordDeclension";

type Props = Pick<ProductT, "quantity" | "analogs" | "variations" | "name" | "id">;

export const useButtonProductCard = ({ quantity, analogs, variations, name, id }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const { openModal } = useContext(AppContext);

  const renderButton = useMemo(() => {
    if (quantity && variations.length <= 1) {
      return <ProductButtonCard idProduct={id} size="md" />;
    } else if (quantity && variations.length > 1) {
      return (
        <CustomButton
          onClick={(e: Event) => {
            e.preventDefault();
            openModal(ModalNames.PRODUCT_CARD_MODAL, {
              title: name,
              subStr: `${variations.length} ${wordDeclension(variations.length, [
                "вариант",
                "варианта",
                "вариантов",
              ])}`,
              children: variations.map((el) => (
                <Product.ProductListItemModal key={el.id} variation={el} />
              )),
            });
          }}
          typeBtn={"lightBlue"}
        >
          {variations.length}{" "}
          {wordDeclension(variations.length, ["вариант", "варианта", "вариантов"])}
        </CustomButton>
      );
    } else if (!quantity && analogs.length) {
      setDisabled(true);
      return (
        <CustomButton
          onClick={(e: Event) => {
            e.preventDefault();
            openModal(ModalNames.PRODUCT_CARD_MODAL, {
              title: name,
              subStr: "Аналог",
              children: analogs.map((el) => (
                <Product.ProductListItemModal key={el.id} variation={el} />
              )),
            });
          }}
          typeBtn={"lightBlue"}
        >
          Выбрать аналог
        </CustomButton>
      );
    } else {
      setDisabled(true);
      return <div style={{ height: 36 }} />;
    }
  }, [variations.length, quantity, analogs.length]);

  return { renderButton, disabled };
};

const CustomButton = styled(Button)`
  width: 100%;
  padding: 10px 0;
`;
