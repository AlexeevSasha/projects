import App, { AppContext, AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../global.css";
import { DataProvider } from "../src/core/dataProvider";
import { getInitialData } from "../src/core/getInitialData";
import { InitialDataType } from "../src/core/hooks/useInitialData";
import { ThemeChangeProvider } from "../src/core/themeProvider";
import { LoadingScreen } from "../src/ui/LoadingScreen ";

export type PageProps = AppProps["pageProps"] & {
  initialData: InitialDataType;
  metaTags?: Record<string, unknown>;
};

type Props = AppProps & {
  Component: AppProps["Component"] & {
    getLayout?: (page: JSX.Element, pageProps: PageProps) => JSX.Element;
  };
  pageProps: PageProps;
};

export default function _App({ Component, pageProps }: Props) {
  const [loading, setLoading] = useState(false);
  const { events } = useRouter();

  const getLayout = Component.getLayout || ((page: JSX.Element) => page);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    events.on("routeChangeStart", handleStart);
    events.on("routeChangeComplete", handleComplete);
    events.on("routeChangeError", handleComplete);
  }, []);

  // Открывает пустую подписку, чтобы при нажатии кнопки назад в браузере, заново выполнялся js на странице
  useEffect(() => {
    window.addEventListener("unload", () => {
      console.log("unload");
    });
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      <ThemeChangeProvider>
        <DataProvider value={pageProps.initialData}>{getLayout(<Component {...pageProps} />, pageProps)}</DataProvider>
      </ThemeChangeProvider>
    </>
  );
}

_App.getInitialProps = async (appContext: AppContext) => {
  appContext.ctx.res?.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=59");

  const initialData = await getInitialData({ locale: appContext.router.locale });

  const props = await App.getInitialProps(appContext);

  return {
    ...props,
    pageProps: { ...props.pageProps, initialData },
  };
};
