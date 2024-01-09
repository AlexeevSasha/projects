import { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Col, Grid, Row, Tabs } from 'antd';
import cx from 'classnames';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { UserRoles } from '@entities/user';
import { ApplicationProgress } from '@features/application/executor';
import type { APP_ROOT_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Paragraph } from '@shared/ui';
import { ApplicationPageTypes } from '@widgets/executor/model/ApplicationPageTypes';
import css from './ApplicationHeader.module.scss';

export type ApplicationHeaderProps = {
  id: ApplicationPageTypes;
  baseRoleRoute: APP_ROOT_ROUTES;
};

export const ApplicationHeader = observer((props: ApplicationHeaderProps) => {
  const { id, baseRoleRoute } = props;

  const breakpoints = Grid.useBreakpoint();
  const router = useRouter();
  const { userS } = useStores();

  useEffect(() => {
    // получаем пользователя, чтобы всегда была актуальная инфа о dreams_count
    userS.fetchUser().then();
  }, []);

  const handleTabClick = (key: string) => {
    switch (key) {
      case ApplicationPageTypes.APPLICATIONS:
        router.push(`${baseRoleRoute}/${ApplicationPageTypes.APPLICATIONS}`);
        break;

      case ApplicationPageTypes.FIND_APPLICATIONS:
        router.push(`${baseRoleRoute}/${ApplicationPageTypes.FIND_APPLICATIONS}`);
        break;

      default:
        break;
    }
  };

  const items = [
    {
      label: (
        <div className={css.tabItem}>
          <Paragraph className={css.itemLabel}>Мои заявки</Paragraph>
          <Paragraph level={6} className={css.counter}>
            {userS?.user?.executor_profile?.dreams_count}
          </Paragraph>
        </div>
      ),
      key: ApplicationPageTypes.APPLICATIONS,
    },
    {
      label: (
        <div className={css.tabItem}>
          <Paragraph className={css.itemLabel}>
            {userS?.user?.userRole === UserRoles.PARTNER ? 'Другие заявки' : 'Другие мечты'}
          </Paragraph>
          <SearchOutlined size={16} style={{ margin: 0 }} />
        </div>
      ),
      key: ApplicationPageTypes.FIND_APPLICATIONS,
    },
  ];

  return (
    <Row gutter={{ lg: 16, xs: 0 }} className={cx(css.header, { [css.isMobile]: breakpoints.xs })}>
      <Col lg={14} xs={24} className={css.tabs}>
        <Tabs
          className={css.tabs}
          indicatorSize={(origin) => (breakpoints.xs ? origin : 0)}
          tabBarGutter={16}
          items={items}
          onTabClick={handleTabClick}
          activeKey={id}
          centered={breakpoints.xs}
        />
      </Col>
      {userS?.user?.executor_profile?.userApplicationProgressInfo?.total ? (
        <Col lg={6} xs={24} className={css.progressInfo}>
          <ApplicationProgress
            total={userS.user.executor_profile.userApplicationProgressInfo.total}
            completed={userS.user.executor_profile.userApplicationProgressInfo.completed}
            donePercentage={userS.user.executor_profile.userApplicationProgressInfo.donePercentage}
          />
        </Col>
      ) : null}
    </Row>
  );
});
