import { useCallback, useEffect, useMemo, useState } from 'react';
import { Typography } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import type { ExecutorStore } from '@features/application/executor';
import type { PartnerStore } from '@features/application/partner/model/store';
import { NotificationSidebar } from '@features/sidebar/ui';
import type { APP_ROOT_ROUTES } from '@shared/const';
import { usePagination, useStores } from '@shared/lib';
import { Paragraph } from '@shared/ui';
import { ApplicationWelcomeMessage } from '@widgets/application';
import { ApplicationPageTypes } from '@widgets/executor/model/ApplicationPageTypes';
import { ApplicationHeader } from '@widgets/executor/ui/ApplicationHeader/ApplicationHeader';
import { ApplicationsList } from '@widgets/executor/ui/ApplicationsList/ApplicationsList';
import { ApplicationLayout } from '@widgets/layout';

type TProps = {
  baseRoleRoute: APP_ROOT_ROUTES;
  store: ExecutorStore | PartnerStore;
  isLoading: boolean;
  anotherApplicationsRoute: string;
};

export const Applications = observer((props: TProps) => {
  const router = useRouter();
  const { store, isLoading, anotherApplicationsRoute, baseRoleRoute } = props;
  const { applicationS } = useStores();
  const [loader, setLoader] = useState(true);

  const { onChangePagination, paginationProps, pagination } = usePagination({ showTotal: false });

  useEffect(() => {
    store.getApplications(pagination).finally(() => {
      setLoader(isLoading);
    });
  }, [store, pagination, pagination.page, pagination.pageSize]);

  const hasApplications = applicationS?.hasApplications;

  const message = useMemo(() => {
    return (
      <>
        <Typography.Title level={4}>Добро пожаловать!</Typography.Title>
        <Paragraph>
          Выберите заявки, которые вы хотите исполнить, <br /> и они появятся тут
        </Paragraph>
      </>
    );
  }, []);

  const handleInitFlowClick = useCallback(
    () => router.push(anotherApplicationsRoute),
    [anotherApplicationsRoute, router],
  );

  const content = useMemo(() => {
    if (hasApplications) {
      return (
        <ApplicationsList
          items={applicationS?.applications}
          paginationProps={{
            ...paginationProps,
            total: applicationS?.applicationsPagination?.count,
            hideOnSinglePage: true,
          }}
          onChangePagination={onChangePagination}
        />
      );
    }

    return (
      <ApplicationWelcomeMessage
        message={message}
        buttonText='Исполнить мечты'
        onInitFlowClick={handleInitFlowClick}
      />
    );
  }, [
    applicationS?.applications,
    applicationS?.applicationsPagination?.count,
    hasApplications,
    handleInitFlowClick,
    message,
    onChangePagination,
    paginationProps,
  ]);

  return (
    <ApplicationLayout
      header={
        <ApplicationHeader id={ApplicationPageTypes.APPLICATIONS} baseRoleRoute={baseRoleRoute} />
      }
      content={content}
      sidebar={<NotificationSidebar />}
      contentBackground={hasApplications ? 'transparent' : 'white'}
      isLoading={loader}
    />
  );
});
