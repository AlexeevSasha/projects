import { App as AntdApp, ConfigProvider } from 'antd';
import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { observer, Provider } from 'mobx-react';
import moment from 'moment';
import type { NextComponentType } from 'next';
import App from 'next/app';
import type { AppContextType, NextPageContext } from 'next/dist/shared/lib/utils';
import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '@app/styles/style.scss';
import 'moment/locale/ru';
import 'moment-duration-format';
import 'dayjs/locale/ru';
import { formConfig } from '@app/config';
import { PageAccess } from '@app/providers/PageAccess/PageAccess';
import type { RootStore } from '@app/store/RootStore';
import { initRootStore } from '@app/store/RootStore';
import { theme } from '@app/theme';
import type { UserRoles } from '@entities/user';
import { AFTER_LOGIN_REDIRECT_URL } from '@features/auth/model/auth';
import { BaseLayout } from '@widgets/layout';
import { PopupRootContainer } from '@widgets/popup';
import { AppWrapper } from './AppWrapper';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale('ru');
dayjs.tz.setDefault('Europe/Moscow');

moment().locale('ru');

//Binding events.
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface NextPageContextWithStore extends NextPageContext {
  rootStore?: RootStore;
}

interface AppContext extends AppContextType {
  ctx: NextPageContextWithStore;
}

@observer
class InitApp extends App {
  rootStore: RootStore;

  constructor(props: NextComponentType & { initialState: RootStore }) {
    super(props);

    const isServer = typeof window === 'undefined';

    this.rootStore = isServer ? props.initialState : initRootStore(props.initialState);
  }

  static async getInitialProps(appContext: AppContext) {
    let pageProps = {};
    let err;

    const rootStore = initRootStore({} as RootStore);
    appContext.ctx.rootStore = rootStore;

    const { ctx } = appContext;
    const { req, res } = ctx;

    if (req) {
      // TODO: find out to avoid this. Seems like next@13 doesnt have it in interface, but have in inner implementation
      // @ts-ignore
      const { cookies } = req;
      let oauthCookies: { access: string; refresh: string; userRole?: UserRoles } | undefined =
        undefined;

      if (cookies.hasOwnProperty('code') && cookies.hasOwnProperty('code_verifier')) {
        await rootStore.userS
          .loginWithRddm({
            code: cookies['code'],
            code_verifier: cookies['code_verifier'],
          })
          .then((response) => {
            oauthCookies = response;
          })
          .finally(() => {
            const withOauthCookies = oauthCookies
              ? [`accessToken=${oauthCookies?.access}`, `refreshToken=${oauthCookies?.refresh}`]
              : '';

            res?.setHeader('Set-Cookie', [
              'code=; Max-Age=0',
              'code_verifier=; Max-Age=0',
              'session_state=; Max-Age=0',
              ...withOauthCookies,
            ]);

            if (oauthCookies?.userRole) {
              res?.writeHead(307, { Location: AFTER_LOGIN_REDIRECT_URL[oauthCookies.userRole] });
              res?.end();
            }
          });
      }
    }

    if (appContext.Component.getInitialProps) {
      try {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
      } catch (error) {
        err = error;
        // Sentry.captureException(error);
      }
    }

    return {
      initialState: rootStore,
      pageProps,
      err: err,
    };
  }

  render() {
    const { Component, pageProps, err } = this.props;

    return (
      <>
        <Head>
          <script src='https://widget.cloudpayments.ru/bundles/cloudpayments.js' async />
          <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
          <title>Ёлка желаний</title>
        </Head>
        <>
          <Provider {...this.rootStore}>
            <ConfigProvider form={formConfig} theme={theme} locale={locale}>
              <AntdApp message={{ maxCount: 1 }}>
                <PageAccess {...Component?.auth}>
                  <AppWrapper>
                    {pageProps.customLayout ? (
                      <Component {...pageProps} err={err} />
                    ) : (
                      <BaseLayout>
                        <Component {...pageProps} err={err} />
                      </BaseLayout>
                    )}
                  </AppWrapper>
                  <PopupRootContainer />
                </PageAccess>
              </AntdApp>
            </ConfigProvider>
          </Provider>
        </>
      </>
    );
  }
}

export default withRouter(InitApp);
