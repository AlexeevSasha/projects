import { useMemo } from 'react';
import { Drawer as DrawerAntd } from 'antd';
import type { DrawerProps } from 'antd';
import { DrawerCloseIcon } from '@shared/assets/icons/CloseIcon';
import css from './Drawer.module.scss';

export const Drawer = ({ children, ...props }: DrawerProps) => {
  const placement = useMemo(() => (window.innerWidth >= 768 ? 'right' : 'bottom'), []);

  return (
    <DrawerAntd
      {...props}
      rootClassName={css.drawer}
      extra={
        <div onClick={props?.onClose} className={css.drawer__close}>
          <DrawerCloseIcon />
        </div>
      }
      placement={props.placement || placement}
      closeIcon={false}
    >
      {children}
    </DrawerAntd>
  );
};
