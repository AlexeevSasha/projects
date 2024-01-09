import type { ReactNode } from 'react';
import { InfoCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Grid, Popover, Space } from 'antd';
import classNames from 'classnames';
import { Button } from '@shared/ui';
import css from './KnowledgePopover.module.scss';

interface IKnowledgePopoverProps {
  content: ReactNode;
  onClick: () => void;
  size?: 'md';
}

export const KnowledgePopover = ({ content, onClick, size }: IKnowledgePopoverProps) => {
  const breakpoint = Grid.useBreakpoint();

  return (
    <Popover
      placement={'topRight'}
      trigger={breakpoint.md ? 'hover' : 'click'}
      rootClassName={css.container}
      content={
        <Space size={'middle'} direction={'vertical'}>
          <div className={css.container__content}>{content}</div>
          <Button onClick={onClick} size={'small'}>
            База знаний
            <RightOutlined style={{ fontSize: '12px' }} />
          </Button>
        </Space>
      }
    >
      <div className={classNames(css.icon, css[`icon__${size}`])}>
        <InfoCircleOutlined />
      </div>
    </Popover>
  );
};
