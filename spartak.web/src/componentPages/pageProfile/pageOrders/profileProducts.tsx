import { useRouter } from "next/router";
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import type { IOrderDetails, IOrders } from "../../../api/dto/IOrders";
import { shopRepository } from "../../../api/shopRepository";
import { theme } from "../../../assets/theme/theme";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { Pagination } from "../../../components/pagination/pagination";
import { EmptyScreenMatches } from "../../pageMatches/emptyScreenMatches/emptyScreenMatches";
import { OrderInfo } from "./orderInfo";
import { Product } from "./product";
import { ProductList } from "./productList";
import { ThemeContext } from "../../../core/themeProvider";
import { LoadingScreen } from "../../../ui/LoadingScreen ";

type Props = {
  products: IOrders;
  fetchOrders: () => void;
};

export const ProfileProducts = ({ products, fetchOrders }: Props) => {
  const { locale = "ru", query } = useRouter();
  const [loading, setLoading] = useState(false);
  const productsDetails = useRef<Record<string, IOrderDetails>>({});
  const { isDarkTheme } = useContext(ThemeContext);

  const onShowPanel = (id: string) => {
    if (productsDetails.current[id]) return;

    setLoading(true);
    shopRepository.fetchOrderDetail(id).then((res) => {
      productsDetails.current[id] = res;
      setLoading(false);
    });
  };

  return products.list.length ? (
    <>
      {loading && <LoadingScreen />}

      {products.list.map((elem) => {
        const order = productsDetails.current[elem.id]?.order;

        return (
          <DropdownList
            key={elem.id}
            title={lang[locale].profileOrders.profileProductsTitle(elem.num, elem.create_at)}
            onClick={() => onShowPanel(elem.id)}
          >
            <Container>
              {order && (
                <>
                  <ProductList>
                    {order?.basket?.map((product, index) => (
                      <Product key={index} product={product} />
                    ))}
                  </ProductList>
                  <OrderInfo order={order} fetchOrders={fetchOrders} setLoading={setLoading} />
                </>
              )}
            </Container>
          </DropdownList>
        );
      })}

      <Pagination
        currentPage={query.page ? +query.page : 1}
        itemsCount={products?.maxPage ? products?.maxPage * 10 : 0}
        pageSize={10}
      />
    </>
  ) : (
    <EmptyScreenMatches
      title={lang[locale].tickets.noProducts}
      text={lang[locale].tickets.noOrdersPlaced}
      srcImg={`/images/profile/emptyScreen/${isDarkTheme ? "darkTheme" : "lightTheme"}/shirtEmptyScreen_v1.0.0.png`}
    />
  );
};

const Container = styled.div`
  display: flex;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: block;
  }
`;
