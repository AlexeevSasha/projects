import { useCallback, useEffect, useMemo } from 'react';
import { Grid, Typography } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { NotificationSidebar } from '@features/sidebar/ui';
import { APP_ROUTES } from '@shared/const';
import { ProtectPageData } from '@shared/lib/protectPageData';
import { BackButton } from '@shared/ui';
import { ApplicationFeedback } from '@widgets/executor';
import { ApplicationLayout } from '@widgets/layout';
import css from './FeedbackPage.module.scss';

const { Title } = Typography;

export const FeedbackPage = observer(() => {
  const router = useRouter();
  const breakpoints = Grid.useBreakpoint();
  const protectPage = useMemo(() => new ProtectPageData(), []);

  useEffect(() => {
    protectPage.enable();

    return () => {
      protectPage.disable();
    };
  }, []);

  const onBack = useCallback(() => {
    router.push({ pathname: APP_ROUTES.EXECUTOR_APPLICATION, query: { id: router.query.id } });
  }, [router]);

  const header = (
    <div className={css.header}>
      <BackButton onBack={onBack} />
      <Title level={5} style={{ margin: 0, width: '100%', textAlign: 'center' }}>
        Отзыв
      </Title>
    </div>
  );

  return (
    <ApplicationLayout
      header={breakpoints.xs ? <div className={css.mobileHeader}>{header}</div> : null}
      content={<ApplicationFeedback header={!breakpoints.xs ? header : null} />}
      sidebar={<NotificationSidebar />}
      contentBackground={'transparent'}
      contentCols={breakpoints.lg ? 12 : undefined}
    />
  );
});
