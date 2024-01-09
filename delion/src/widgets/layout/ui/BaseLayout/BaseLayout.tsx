import { type FC, type PropsWithChildren } from 'react';
import { Grid, Layout } from 'antd';
import cx from 'classnames';
import { observer } from 'mobx-react';
import { Header } from '@widgets/header';
import css from './BaseLayout.module.scss';

export const BaseLayout: FC<PropsWithChildren> = observer(({ children }) => {
  const breakpoints = Grid.useBreakpoint();

  return (
    <Layout
      className={cx(css.layout, {
        [css.isXS]: breakpoints.xs,
        [css.isSM]: breakpoints.sm,
        [css.isXL]: breakpoints.xl,
      })}
    >
      <div className={cx(css.wrapper, { [css.isXS]: breakpoints.xs })}>
        <Header />
        <Layout.Content>{children}</Layout.Content>
      </div>
    </Layout>
  );
});
