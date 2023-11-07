import axios from "axios";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import { Layout } from "../../../modules/layout/components/layout";
import { IPrimaryOrder } from "../../../modules/primary-order/interfaces/PrimaryOrder";
import { PrimaryOrder } from "../../../modules/primary-order/components/PrimaryOrder";
import { useCallback, useEffect, useRef, useState } from "react";
import { Loading } from "../../../components/ui/Loading";
import {
  FilterPrimaryOrderT,
  PrimaryOrderFilterContext,
} from "../../../modules/primary-order/constants/context";
import { searchPrimaryOrder } from "../../../api/primary-order";
import { Pagination } from "../../../common/components/pagination/pagination";
import { paginatePageSize } from "../../../common/constants/paginatePageSize";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  primaryOrders: IPrimaryOrder[];
  totalPage: number;
}

export default function PrimaryOrderPage(props: IProps) {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const searchMountRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(props.totalPage);
  const [primaryOrderList, setPrimaryOrderList] = useState(props.primaryOrders);
  const [filterData, setFilterData] = useState<FilterPrimaryOrderT>({
    searchText: "",
    status: "",
    page: 1,
  });

  useEffect(() => {
    if (searchMountRef.current) {
      onSearch(filterData).then();
      return;
    }
    searchMountRef.current = true;
  }, [filterData]);

  const onSearch = useCallback(async (params: FilterPrimaryOrderT) => {
    setLoading(true);
    const response = await searchPrimaryOrder({ ...params, page: 1 }).finally(() =>
      setLoading(false)
    );
    setPrimaryOrderList(response.primaryOrders);
    setTotalPage(response.totalPage);
  }, []);

  const handlerPaginate = useCallback(
    async (num: number) => {
      setLoading(true);
      searchMountRef.current = false;
      setFilterData((prev) => ({ ...prev, page: num }));
      const response = await searchPrimaryOrder({ ...filterData, page: num }).finally(() =>
        setLoading(false)
      );
      setPrimaryOrderList(response.primaryOrders);
      setTotalPage(response.totalPage);
      searchMountRef.current = true;
    },
    [filterData]
  );

  const onDeletePrimaryOrder = (id: string) => {
    setPrimaryOrderList((prev) => prev.filter((el) => el.id !== id));
  };

  const onChangePrimaryOrder = (order: IPrimaryOrder) => {
    setPrimaryOrderList((prev) => prev.map((el) => (el.id === order.id ? order : el)));
  };

  return (
    <>
      <Head>
        <title>Первичные заявки - Амрита</title>
        <meta name="description" content="Первичные заявки - Амрита" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <h1 className={"mt-4 mb-4 text-2xl"}>{lang.primaryOrder.all_initial_applications}</h1>
        <div className={" mb-6 mt-3"}>
          <PrimaryOrderFilterContext.Provider value={{ filterData, setFilterData }}>
            <PrimaryOrder.FilterPrimaryOrders />
          </PrimaryOrderFilterContext.Provider>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <PrimaryOrder.PrimaryOrderTable
              primaryOrderList={primaryOrderList}
              onDeletePrimaryOrder={onDeletePrimaryOrder}
              onChangePrimaryOrder={onChangePrimaryOrder}
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
      </main>
    </>
  );
}

PrimaryOrderPage.getLayout = Layout.Auth;
PrimaryOrderPage.auth = {
  roles: ["Admin"],
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const options = { headers: { cookie: req.headers.cookie } };
  const data = await axios
    .get(`${process.env.NEXTAUTH_URL}/api/primary-order/get`, options)
    .then((res) => res.data.data);

  return { props: { primaryOrders: data.primaryOrders, totalPage: data.totalPage } };
};
