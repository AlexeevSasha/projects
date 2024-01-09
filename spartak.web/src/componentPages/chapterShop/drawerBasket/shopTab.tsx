import { useRouter } from "next/router";
import { useContext, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { shopRepository } from "../../../api/shopRepository";
import { goodsDeclination } from "../../../assets/helpers/goodsDeclination";
import { ClearCartIcon } from "../../../assets/icon/clearCartIcon";
import { theme } from "../../../assets/theme/theme";
import { MessageModal } from "../../../components/modal/messageModal";
import { DataContext } from "../../../core/dataProvider";
import { EmptyShopBacket } from "./emptyShopBacket";
import { SellItemDrawer } from "./SellItemDrawer";

export const ShopTab = () => {
  const { locale = "ru", push } = useRouter();
  const { shop: { products = undefined } = {}, setListShop, setLoading } = useContext(DataContext);
  const [removeItemId, setRemoveItemId] = useState<number | undefined>();
  const [modal, setModal] = useState<"" | "item" | "all">("");

  const handleDelete = (id?: number) => {
    if (id) {
      setLoading(true);
      shopRepository
        .deleteBasketProduct(id)
        .then(() => shopRepository.fetchShopBasket().then((res) => setListShop(res)))
        .finally(() => setLoading(false));
    }
  };

  const handleClear = () => {
    setLoading(true);
    shopRepository.clearAllBasket().then(() =>
      shopRepository
        .fetchShopBasket()
        .then((res) => setListShop(res))
        .finally(() => setLoading(false))
    );
  };

  return (
    <Content>
      {products?.list?.length ? (
        <>
          <HeaderContent>
            <CountItems>
              {products.list.length}&nbsp;{goodsDeclination(products.list.length, locale)}
            </CountItems>

            <ClearContainer onClick={() => setModal("all")}>
              <Text>{lang[locale].shop.clearAll}</Text> &nbsp;
              <ClearCartIcon />
            </ClearContainer>
          </HeaderContent>

          <div>
            {products?.list.map((item, index) => (
              <SellItemDrawer
                setLoading={setLoading}
                setList={setListShop}
                onDelete={(id) => {
                  setRemoveItemId(id);
                  setModal("item");
                }}
                key={index}
                item={item}
              />
            ))}
          </div>

          <BottomBlock>
            <TotalBottom>
              {lang[locale].shop.sum}:&nbsp;
              {products.denarii ? (
                <>
                  {products.totalN} <Denary src={"/images/gladiator.svg"} alt="denarii" />
                </>
              ) : (
                products.total
              )}
            </TotalBottom>

            <GoToCartButton onClick={() => push(`${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}/shop/cart`)}>
              {lang[locale].shop.checkout}
            </GoToCartButton>
          </BottomBlock>
        </>
      ) : (
        <EmptyShopBacket
          text={lang[locale].shop.whenAddToCart}
          title={lang[locale].shop.cartEmpty}
          defaultUrl={`${process.env.NEXT_PUBLIC_SHOP_URL_FRONT}`}
          buttonText={lang[locale].shop.toStore}
        />
      )}

      {modal && (
        <MessageModal
          onClose={() => {
            setModal("");
            setRemoveItemId(undefined);
          }}
          onConfirm={modal === "all" ? handleClear : () => handleDelete(removeItemId)}
          message={modal === "all" ? lang[locale].shop.clearCartConfirmText : lang[locale].shop.removeItemConfirmText}
          type="confirm"
        />
      )}
    </Content>
  );
};

const Content = styled.div`
  color: ${theme.colors.black};
  position: relative;
  width: 100%;
  padding: 0 1.25vw 4.06vw;
  box-sizing: border-box;
  flex: 1;

  & * {
    box-sizing: border-box;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 3.13vw 12.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0 4.27vw 23.8vw;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 5.93vw;
  }
`;

const CountItems = styled.div`
  font-size: 0.83vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const ClearContainer = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 0.63vw;
  color: ${theme.colors.red};
  cursor: pointer;
  height: auto;

  svg {
    width: 1.25vw;
    height: 1.25vw;

    path {
      stroke: ${theme.colors.red};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.56vw;
    svg {
      width: 3.13vw;
      height: 3.13vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;

    svg {
      width: 6.4vw;
      height: 6.4vw;
    }
  }
`;

const BottomBlock = styled.div`
  background: ${theme.colors.red};
  position: fixed;
  bottom: 0;
  right: 0;
  height: 4.06vw;
  width: 28.44vw;
  color: ${theme.colors.white};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 71.84vw;
    height: 10.17vw;
    font-size: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100vw;
    height: 20.8vw;
    font-size: 2.3vw;
  }
`;

const TotalBottom = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.83vw;
  font-weight: 700;
  font-size: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-left: 1.2vw;
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-left: 4.27vw;
    font-size: 4.27vw;
  }
`;

const Denary = styled.img`
  width: 1.04vw;
  height: 1.04vw;
  cursor: pointer;
  margin-left: 0.21vw;
  border: 1px solid ${theme.colors.white};
  border-radius: 50%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 2.6vw;
    height: 2.6vw;
    margin-left: 0.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 4.27vw;
    height: 4.27vw;
    margin-left: 1.07vw;
  }
`;

const GoToCartButton = styled.div`
  cursor: pointer;
  margin-right: 1.2vw;
  width: fit-content;
  font-size: 0.73vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.white};
  padding: 0.73vw 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.83vw 3.13vw;
    font-size: 1.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding: 3.73vw 6.4vw;
    margin-right: 4.27vw;
  }
`;

const Text = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
`;
