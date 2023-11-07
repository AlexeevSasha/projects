import axios from "axios";
import Head from "next/head";
import { useCallback, useState } from "react";
import { Loading } from "../../../components/ui/Loading";
import { Layout } from "../../../modules/layout/components/layout";
import { Users } from "../../../modules/user/components/user";
import { UserPartnerInfoT } from "../../../modules/user/interfaces/UserT";
import { GetServerSideProps } from "next";
import { UserRoleT } from "../../../modules/user/interfaces/UserRoleT";
import { searchUser, updateUserRole } from "../../../api/user";
import { Pagination } from "../../../common/components/pagination/pagination";
import { paginatePageSize } from "../../../common/constants/paginatePageSize";

interface IProps {
  userList: UserPartnerInfoT[];
  totalPage: number;
}

export default function PageRoles(props: IProps) {
  const [totalPage, setTotalPage] = useState(props.totalPage);
  const [userList, setUserList] = useState<UserPartnerInfoT[]>(props.userList);
  const [data, setData] = useState<{ page: number; search: string; role: UserRoleT | "" }>({
    search: "",
    role: "",
    page: 1,
  });
  const [loading, setLoading] = useState(false);

  const onSearch = useCallback(async (value: string, role: UserRoleT | "") => {
    setData({ search: value, role, page: 1 });
    setLoading(true);
    const response = await searchUser(1, value, role).finally(() => setLoading(false));
    setUserList(response.userList);
    setTotalPage(response.totalPage);
  }, []);

  const handlerPaginate = useCallback(
    async (num: number) => {
      setLoading(true);
      setData((prev) => ({ ...prev, page: num }));
      const response = await searchUser(num, data.search, data.role).finally(() =>
        setLoading(false)
      );
      setUserList(response.userList);
      setTotalPage(response.totalPage);
    },
    [data]
  );

  const onUpdateRole = useCallback(
    async (role: UserRoleT, isPartner: boolean, user: UserPartnerInfoT) => {
      const update = await updateUserRole(role, isPartner, user);
      setUserList(userList.map((elem) => (elem.id === update?.id ? update : elem)));
    },
    []
  );

  const updateUsersList = (user: UserPartnerInfoT) => {
    setUserList(userList.map((el) => (el.id === user.id ? user : el)));
  };

  const handlerDeleteUser = (id: string) => {
    setUserList((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <>
      <Head>
        <title>Ролевая модель - Амрита</title>
        <meta name="description" content="Ролевая модель - Амрита" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container flex flex-col gap-8 px-4 py-16">
          <Users.SearchUser onSearch={onSearch} />
          {loading ? (
            <Loading />
          ) : (
            <div>
              <Users.TableUser
                updateUsersList={updateUsersList}
                users={userList}
                updateRole={onUpdateRole}
                handlerDeleteUser={handlerDeleteUser}
              />
              <div className={"mt-4 flex justify-end"}>
                <Pagination
                  currentPage={data.page}
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

PageRoles.getLayout = Layout.Auth;
PageRoles.auth = {
  roles: ["Admin"],
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const options = { headers: { cookie: req.headers.cookie } };
  const users = await axios
    .get(`${process.env.NEXTAUTH_URL}/api/users/getUser`, options)
    .then((response) => response.data.data);

  return { props: { userList: users?.userList || [], totalPage: users?.totalPage || 0 } };
};
