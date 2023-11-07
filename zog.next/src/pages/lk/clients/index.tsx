import axios from "axios";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import { Layout } from "../../../modules/layout/components/layout";
import { Orders } from "../../../modules/order/components/order";
import { Loading } from "../../../components/ui/Loading";
import { OrderT } from "../../../modules/order/interfaces/OrderT";
import { Pagination } from "../../../common/components/pagination/pagination";
import { paginatePageSize } from "../../../common/constants/paginatePageSize";
import { searchOrder } from "../../../api/order";
import { FilterOrderT, OrderFilterContext } from "../../../modules/order/constants/context";

interface IProps {
  orderList: OrderT[];
  totalPage: number;
}

export default function PageClients(props: IProps) {
  const didMountRef = useRef(false);
  const [totalPage, setTotalPage] = useState(props.totalPage);
  const [clientList, setClientList] = useState<OrderT[]>(props.orderList);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState<FilterOrderT>({
    searchText: "",
    status: "",
    page: 1,
  });

  useEffect(() => {
    if (didMountRef.current) {
      onSearch(filterData).then();
      return;
    }
    didMountRef.current = true;
  }, [filterData]);

  const onSearch = useCallback(async (params: FilterOrderT) => {
    setLoading(true);
    const response = await searchOrder(params).finally(() => setLoading(false));
    setClientList(response.orders);
    setTotalPage(response.totalPage);
  }, []);

  const handlerPaginate = useCallback(
    async (num: number) => {
      setLoading(true);
      setFilterData((prev) => ({ ...prev, page: num }));
      const response = await searchOrder({ ...filterData, page: num }).finally(() =>
        setLoading(false)
      );
      setClientList(response.orders);
      setTotalPage(response.totalPage);
    },
    [filterData]
  );

  const handlerDeleteClient = (id: string) => {
    setClientList((prev) => prev.filter((el) => el.id !== id));
  };

  const updateClientList = (order: OrderT) => {
    setClientList(clientList.map((el) => (el.id === order.id ? order : el)));
  };

  return (
    <>
      <Head>
        <title>Клиенты - Амрита</title>
        <meta name="description" content="Клиенты - Амрита" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container flex flex-col gap-12 px-4 py-16 ">
          {/* <ShowFor auth={"Admin"}> */}
          <OrderFilterContext.Provider value={{ filterData, setFilterData }}>
            <Orders.Filter />
          </OrderFilterContext.Provider>
          {/* </ShowFor> */}
          {loading ? (
            <Loading />
          ) : (
            <div>
              <Orders.TableOrders
                orders={clientList}
                handlerDelete={handlerDeleteClient}
                updateClientList={updateClientList}
              />
              <div className={"mt-4 flex justify-end"}>
                <Pagination
                  currentPage={filterData.page}
                  pageSize={paginatePageSize}
                  totalCount={totalPage}
                  onChange={(num) => handlerPaginate(num)}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

PageClients.getLayout = Layout.Auth;
PageClients.auth = {
  roles: ["Admin", "Consultant", "Client"],
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const options = { headers: { cookie: req.headers.cookie } };
  const orderList = await axios
    .get(`${process.env.NEXTAUTH_URL}/api/clients`, options)
    .then((res) => res.data.data);

  return { props: { orderList: orderList.orders, totalPage: orderList.totalPage } };
};
