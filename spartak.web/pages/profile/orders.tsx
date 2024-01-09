import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import type { IOrders } from "../../src/api/dto/IOrders";
import { ProfileTicket } from "../../src/api/dto/TicketDto";
import { shopRepository } from "../../src/api/shopRepository";
import { ticketsRepository } from "../../src/api/ticketsRepository";
import { getProfileLayout } from "../../src/componentPages/pageProfile/profileLayout";
import { LoadingScreen } from "../../src/ui/LoadingScreen ";
import { MessageModal } from "../../src/components/modal/messageModal";
import { lang } from "../../public/locales/lang";
import { GetServerSideProps } from "next";
import seodata from "../../public/seo/seoData.json";
import { TicketsFilter } from "../../src/componentPages/pageProfile/pageOrders/ticketsfilter";
import { ProductsFilter } from "../../src/componentPages/pageProfile/pageOrders/productsFilter";
import { OrdersLayout } from "../../src/componentPages/pageProfile/pageOrders/ordersLayout";
import { ProfileTickets } from "../../src/componentPages/pageProfile/pageOrders/profileTickets";
import { ProfileProducts } from "../../src/componentPages/pageProfile/pageOrders/profileProducts";

export default function OrdersPage() {
  const { query, replace, push, pathname, locale = "ru" } = useRouter();
  const [loading, setLoading] = useState(true);
  const [textModal, setTextModal] = useState<string | undefined>(undefined);
  const ticketsRef = useRef<{ Items: ProfileTicket[]; Count: number } | undefined>();
  const tickets = ticketsRef.current;
  const productRef = useRef<IOrders | undefined>();
  const products = productRef.current;
  const tab = query.tab ? String(query.tab) : "tickets";
  const Filter = tab === "tickets" ? TicketsFilter : ProductsFilter;

  const setTab = (tab: string) => push({ pathname, query: { tab } });

  const fetchOrders = () => {
    setLoading(true);
    const Page = Number(query.page);

    if (tab === "tickets") {
      const filter = {
        "Paged.PageSize": 10,
        "Paged.Page": Page,
        "Filter.DateFrom": query.DateFrom,
        "Filter.DateTo": query.DateTo,
        "Filter.PayStatus": query.PayStatus,
      };

      ticketsRepository
        .fetchOrdersTickets(filter)
        .then((res: { Items: ProfileTicket[]; Count: number; status?: number }) => {
          if (res.status === 400) {
            setTextModal(lang[locale].modalWindow.modalTitle.enterCorrectDate);
          }
          ticketsRef.current = res;
        })
        .catch((e) => {
          setTextModal(e.message);
        })
        .finally(() => setLoading(false));
    }

    if (tab === "products") {
      if (query.Order === "history") {
        shopRepository
          .fetchOrderHistoryList(Page)
          .then((res) => (productRef.current = res))
          .finally(() => setLoading(false));
      } else {
        shopRepository
          .fetchOrderList(Page)
          .then((res) => (productRef.current = res))
          .finally(() => setLoading(false));
      }
    }
  };

  useEffect(() => {
    setTextModal(undefined);
    !query.page || !query.tab ? replace({ query: { page: 1, tab } }, undefined, { shallow: true }) : fetchOrders();
  }, [query]);

  return (
    <OrdersLayout tab={tab} setTab={setTab} filter={<Filter />}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {tab === "tickets" && tickets && <ProfileTickets tickets={tickets} fetchOrders={fetchOrders} />}
          {tab === "products" && products && <ProfileProducts products={products} fetchOrders={fetchOrders} />}
        </>
      )}
      {textModal && <MessageModal message={textModal} onClose={() => setTextModal(undefined)} />}
    </OrdersLayout>
  );
}

OrdersPage.getLayout = getProfileLayout;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
  return {
    props: {
      metaTags: (seodata as Record<string, any>)["/profile/tickets"] || null,
    },
  };
};
