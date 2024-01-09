import type { ReactNode } from 'react';
import { Menu, Space } from 'antd';
import classNames from 'classnames';
import { StatusMenuAnchorItem } from '@shared/ui';
import css from './DreamersMenuAnchor.module.scss';

interface IProps {
  dreamers: {
    name: string;
    id: number | string;
    image: ReactNode;
  }[];
  errors?: number[];
}

export const DreamersMenuAnchor = ({ dreamers, errors }: IProps) => {
  return (
    <div className={classNames(css.menu)}>
      <Menu defaultSelectedKeys={[dreamers[0].id.toString()]}>
        {dreamers.map((dreamer, i) => (
          <StatusMenuAnchorItem
            errorCount={errors?.[i] || 0}
            anchor={`dreamer${dreamer.id}`}
            key={dreamer.id}
          >
            <Space>
              {dreamer.image}
              <span>{dreamer.name}</span>
            </Space>
          </StatusMenuAnchorItem>
        ))}
      </Menu>
    </div>
  );
};
