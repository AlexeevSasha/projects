import { useCallback } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse as AntdCollapse } from 'antd';
import css from './Collapse.module.scss';

export interface DreamerCollapseProps extends CollapseProps {
  showTitleWhenClose?: boolean;
}

export const Collapse = ({ showTitleWhenClose, ...attr }: DreamerCollapseProps) => {
  const onChange = useCallback((active: string | string[]) => {
    if (!showTitleWhenClose) return;
    const keys = attr.items?.map((el) => String(el.key));
    keys?.forEach((key) => {
      const item = document.getElementById(`collapse-${key}`);
      if (!item) return;
      item.classList.toggle(css.item, !active.includes(key));
    });
  }, []);

  return (
    <AntdCollapse
      rootClassName={css.container}
      expandIconPosition='end'
      defaultActiveKey={attr.items?.map((el) => String(el.key))}
      collapsible='icon'
      onChange={onChange}
      {...attr}
      bordered={false}
      ghost
      expandIcon={({ isActive }) => (
        <DownOutlined className={css.container__icon} rotate={isActive ? 180 : 0} />
      )}
    />
  );
};
