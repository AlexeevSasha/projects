import { useMemo } from 'react';
import { Col, Row, Typography, Grid } from 'antd';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { BackButton } from '@shared/ui';
import { ProfileSettingsTabs } from '@widgets/profile-settings';
import css from './ProfileSettingsPage.module.scss';

export const ProfileSettingsPage = () => {
  const router = useRouter();
  const breakpoints = Grid.useBreakpoint();

  const header = useMemo(() => {
    return (
      <Col span={24} className={cx(css.header, { [css.isMobile]: breakpoints.xs })}>
        <BackButton onBack={() => router.back()} />
        <Typography.Title className={css.title} level={breakpoints.xs ? 5 : 4}>
          Настройки
        </Typography.Title>
      </Col>
    );
  }, [breakpoints.xs, router]);

  return (
    <div className={css.layout}>
      {breakpoints.xs && (
        <Row align='middle' justify='center'>
          {header}
        </Row>
      )}
      <div className={css.wrapper}>
        <Row align='middle' justify='center'>
          {!breakpoints.xs && header}
          <Col span={24}>
            <ProfileSettingsTabs />
          </Col>
        </Row>
      </div>
    </div>
  );
};
