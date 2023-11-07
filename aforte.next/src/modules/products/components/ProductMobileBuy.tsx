import { FixToFooterContainer } from "../../../common/components/FixToFooterContainer";
import { useContext, useState } from "react";
import { IconMinus } from "../../../common/components/icons/IconMinus";
import { IconPlus } from "../../../common/components/icons/IconPlus";
import styled from "astroturf/react";
import { Button } from "../../../common/components/Button";
import { CountButton } from "./CountButton";
import { AppContext } from "../../../common/components/ContextProvider";

type Props = {
  id: string;
};

export const ProductMobileBuy = ({ id }: Props) => {
  const { allProductInBasket } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  return (
    <FixToFooterContainer>
      <ContainerFlex>
        <CustomButton onClick={() => setOpen(true)} typeBtn={"green"}>
          {open || allProductInBasket.has(id) ? "В корзине" : "Купить"}
        </CustomButton>
        {open || allProductInBasket.has(id) ? <CountButton idProduct={id} /> : null}
      </ContainerFlex>
    </FixToFooterContainer>
  );
};

const ContainerFlex = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-left: 10px;
    padding: 16px;
  }
`;

const CustomButton = styled(Button)`
  width: 100%;
  padding: 16px;
`;
