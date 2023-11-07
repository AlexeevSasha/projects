import type { AppProps } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import PageAccess from "../components/AppAccess/PageAccess";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session | null }> & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <PageAccess {...((Component as any).auth ?? {})}>
        {getLayout(<Component {...pageProps} />)}
        <div id="portal" />
        <ToastContainer />
      </PageAccess>
    </SessionProvider>
  );
}
