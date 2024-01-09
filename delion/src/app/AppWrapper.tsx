import type { PropsWithChildren, ReactNode } from 'react';
import { useEffect } from 'react';
import { App } from 'antd';
import { observer } from 'mobx-react';
import { YandexMetricaProvider } from 'next-yandex-metrica';
import { useStores } from '@shared/lib';
import { messageS } from '@shared/model';
import { FeedbackModal } from '@widgets/feedback-modal';

export type AppWrapperProps = PropsWithChildren<{}>;

export const AppWrapper = observer(({ children }: AppWrapperProps) => {
  const { modalS } = useStores();
  const staticFunction = App.useApp();
  const yandexMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  useEffect(() => {
    messageS.setMessage(staticFunction.message);
    messageS.setModal(staticFunction.modal);
    messageS.setNotification(staticFunction.notification);
  }, []);

  const YandexMetricaWrapper = ({ children }: { children: ReactNode }) => {
    if (yandexMetrikaId) {
      return (
        <YandexMetricaProvider
          tagID={Number(yandexMetrikaId)}
          initParameters={{
            defer: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
          }}
        >
          {children}
        </YandexMetricaProvider>
      );
    } else {
      return children;
    }
  };

  return (
    <YandexMetricaWrapper>
      {children}
      <FeedbackModal isOpened={modalS.isFeedbackModalOpened} />
    </YandexMetricaWrapper>
  );
});
