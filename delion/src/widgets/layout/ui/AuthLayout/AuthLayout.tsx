import type { ReactElement } from 'react';
import React, { useMemo } from 'react';
import { Col, Grid, Layout, Row, Space } from 'antd';
import cx from 'classnames';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { AuthTypes } from '@features/auth';
import { BackButton, Paragraph } from '@shared/ui';
import { VerificationCodeErrorState } from '@shared/ui/VerificationCodeForm/VerificationCodeErrorState/VerificationCodeErrorState';
import css from './AuthLayout.module.scss';

type AuthLayoutProps = {
  title: ReactElement | string;
  image: string;
  hasError?: boolean;
  form: ReactElement;
  onBack?(): void;
};

export const AuthLayout = observer((props: AuthLayoutProps) => {
  const breakpoints = Grid.useBreakpoint();
  const { title, onBack, form, hasError, image } = props;

  const header = useMemo(() => {
    return (
      <header className={cx(css.header, { [css.isMobile]: breakpoints.xs })}>
        <BackButton onBack={onBack} />
        <div className={css.logos}>
          <AuthTypes withResponsiveIcons={false} />
        </div>
      </header>
    );
  }, [breakpoints.xs, onBack]);

  return (
    <Layout className={cx(css.layout, { [css.isMobile]: breakpoints.xs })}>
      {breakpoints.xs && header}

      <Row
        wrap={false}
        justify='center'
        align={breakpoints.xs ? 'top' : 'middle'}
        style={{ height: '100%' }}
        className={cx(css.container, { [css.isMobile]: breakpoints.xs })}
      >
        <Col span={6} className={cx(css.card, { [css.isMobile]: breakpoints.xs })}>
          {!breakpoints.xs && header}
          {hasError ? (
            <VerificationCodeErrorState />
          ) : (
            <Row justify='center' align='middle' gutter={[0, 32]} className={css.card__content}>
              <Image src={image} alt='Иллюстрация авторизации' className={css.placeholder} />
              <Col span={20} className={css.formWrapper}>
                <Space direction='vertical' size={24} className={css.wrapper}>
                  <Paragraph level={4}>{title}</Paragraph>
                  {React.isValidElement(form) && form}
                </Space>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Layout>
  );
});
