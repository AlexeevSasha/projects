import localFont from "@next/font/local";
import { MetaTagsT } from "common/components/baseMeta/baseMeta";
import { ContextProvider } from "common/components/ContextProvider";
import { LoadingScreen } from "common/components/LoadingScreen";
import { getInitialData, InitialDataT } from "common/hooks/useInitialData";
import { NextPage } from "next";
import App, { AppContext, AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "styles/style.scss";

export type PageProps = AppProps["pageProps"] & {
  initialData: InitialDataT;
  metaTags?: MetaTagsT;
};
// Подключение шрифтов
export const myFont = localFont({
  src: [
    {
      path: "../../public/fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

type Props = {
  Component: NextPage<PageProps> & {
    getLayout?: (page: JSX.Element, pageProps: PageProps) => JSX.Element;
  };
  pageProps: PageProps;
};

export default function _App({ Component, pageProps }: Props) {
  const [loading, setLoading] = useState(false);
  const { events } = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    events.on("routeChangeStart", handleStart);
    events.on("routeChangeComplete", handleComplete);
    events.on("routeChangeError", handleComplete);
  }, []);

  const getLayout = Component.getLayout || ((page: JSX.Element) => page);

  return (
    <>
      {loading && <LoadingScreen />}
      <ContextProvider initialValues={pageProps.initialData}>
        {getLayout(<Component {...pageProps} />, pageProps)}
      </ContextProvider>
    </>
  );
}

_App.getInitialProps = async (appContext: AppContext) => {
  appContext.ctx.res?.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=59");

  const initialData = await getInitialData();

  const props = await App.getInitialProps(appContext);

  return { ...props, pageProps: { ...props.pageProps, initialData } };
};
