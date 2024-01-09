import { useCallback } from 'react';
import { Grid, Space } from 'antd';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { APP_ROUTES } from '@shared/const';
import type { EllipsisMenuProps } from '@shared/ui';
import { BackButton, EllipsisMenu, Paragraph } from '@shared/ui';
import css from './ApplicationNavigation.module.scss';

export type ApplicationNavigationProps = {
  applicationId: number;
  settlement?: string;
  isInfoMode: boolean;
  ellipsisMenuConfig: EllipsisMenuProps['items'];
};

export const ApplicationNavigation = (props: ApplicationNavigationProps) => {
  const breakpoints = Grid.useBreakpoint();
  const { applicationId, settlement, ellipsisMenuConfig, isInfoMode = false } = props;
  const router = useRouter();

  const handleInfoModeBack = useCallback(() => {
    router.push({
      pathname: APP_ROUTES.EXECUTOR_APPLICATION,
      query: {
        id: router.query.id,
      },
    });
  }, [router]);

  return (
    <div className={cx(css.container, { [css.isMobile]: breakpoints.xs })}>
      {isInfoMode ? (
        <div className={css.infoMode}>
          <BackButton onBack={handleInfoModeBack} />
          <Paragraph level={4} className={css.infoLabel}>
            Информация о заявке
          </Paragraph>
        </div>
      ) : (
        <Space size={24} align='center' style={{ justifyContent: 'space-between' }}>
          <div className={css.leftSide}>
            <BackButton onBack={() => router.push(APP_ROUTES.EXECUTOR_APPLICATIONS)} />
            <div className={css.applicationInfo}>
              {applicationId && (
                <Paragraph className={css.applicationId}>{`Заявка №${applicationId}`}</Paragraph>
              )}
              {settlement && (
                <Paragraph level={6} className={css.settelement}>
                  {settlement}
                </Paragraph>
              )}
            </div>
          </div>
          <EllipsisMenu items={ellipsisMenuConfig} />
        </Space>
      )}
    </div>
  );
};
