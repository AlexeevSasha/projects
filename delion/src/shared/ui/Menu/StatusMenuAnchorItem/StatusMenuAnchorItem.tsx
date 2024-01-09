import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { MenuItemProps } from 'antd';
import { Grid, Menu } from 'antd';
import classNames from 'classnames';
import { useStores } from '@shared/lib';
import css from './StatusMenuAnchorItem.module.scss';

interface Props extends MenuItemProps {
  anchor: string;
  errorCount?: number;
}

export const StatusMenuAnchorItem = ({ children, anchor, errorCount, ...attr }: Props) => {
  const breakpoints = Grid.useBreakpoint();
  const { uiS } = useStores();
  const offsetTop = uiS.headerHeight;

  const handleClick = () => {
    const el = document.getElementById(anchor);
    const scrollY = el?.getBoundingClientRect().top || 0;

    let top = 0;

    if (scrollY < 0) {
      top = breakpoints.xs ? 0 : breakpoints.md ? 20 : 8;
      top = -(offsetTop + top + 5);
    }

    window.scrollBy(0, scrollY + top);
  };

  return (
    <Menu.Item
      {...attr}
      className={classNames(css.menuItem, {
        [css.menuItem__error]: errorCount,
      })}
    >
      <a className={css.link} onClick={handleClick}>
        <div>{children}</div>
        {errorCount ? (
          <div className={css.menuItem__error__icon}>
            {errorCount} <ExclamationCircleOutlined />
          </div>
        ) : null}
      </a>
    </Menu.Item>
  );
};
