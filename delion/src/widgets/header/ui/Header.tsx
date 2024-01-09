import { useEffect, useMemo, useRef } from 'react';
import { Grid, Layout } from 'antd';
import cx from 'classnames';
import { observer } from 'mobx-react';
import { AuthTypes } from '@features/auth';
import { useScrollDirection, useStores } from '@shared/lib';
import { Button } from '@shared/ui';
import { AuthToolbar } from '@widgets/AuthToolbar';
import css from './Header.module.scss';

export const Header = observer(() => {
  const breakpoints = Grid.useBreakpoint();
  const { userS, uiS, modalS } = useStores();

  const headerRef = useRef<HTMLDivElement>(null);

  const scrollDirection = useScrollDirection();

  const user = userS?.user;
  const isAuthorized = Boolean(user);

  const headerTopPosition = useMemo(() => {
    let top = breakpoints.xs ? 0 : breakpoints.md ? 20 : 8;

    if (headerRef?.current) {
      if (scrollDirection === 'down') {
        top = -(headerRef.current.clientHeight + top);
      }
    }

    return `${top}px`;
  }, [breakpoints, headerRef, scrollDirection]);

  useEffect(() => {
    if (headerRef.current) uiS.setHeaderHeight(headerRef.current.clientHeight);
  }, [headerRef.current?.clientHeight, uiS]);

  const onFeedbackButtonClick = () => {
    modalS.openFeedbackModal();
  };

  return (
    <Layout.Header
      ref={headerRef}
      className={cx(css.header, { [css.isMobile]: breakpoints.xs, [css.isSM]: breakpoints.sm })}
      style={{
        top: headerTopPosition,
      }}
    >
      <div className={css.logoContainer}>
        <AuthTypes isAuthorized={isAuthorized} />
      </div>
      <div className={css.rightActions}>
        {isAuthorized ? (
          <AuthToolbar />
        ) : (
          <Button type='default' onClick={onFeedbackButtonClick}>
            Задать вопрос
          </Button>
        )}
      </div>
    </Layout.Header>
  );
});
