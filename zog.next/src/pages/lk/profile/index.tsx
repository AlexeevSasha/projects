import Head from "next/head";
import { Layout } from "../../../modules/layout/components/layout";
import { UserT } from "../../../modules/user/interfaces/UserT";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Users } from "../../../modules/user/components/user";

interface IProps {
  user: UserT;
}

export default function PageRoles({ user }: IProps) {
  return (
    <>
      <Head>
        <title>Профиль - Амрита</title>
        <meta name="description" content="Профиль модель - Амрита" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center">
        <div className="container flex flex-col gap-8 px-4 py-16">
          {user ? <Users.Profile user={user} /> : "Данные не найдены"}
        </div>
      </div>
    </>
  );
}

PageRoles.getLayout = Layout.Auth;
PageRoles.auth = true;

export const getServerSideProps: GetServerSideProps = async (param) => {
  const session = await getSession(param);

  return { props: { user: session?.user || [] } };
};
