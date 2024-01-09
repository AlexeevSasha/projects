import { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Grid, Modal, Space, Tooltip } from 'antd';
import cx from 'classnames';
import { Button, Paragraph } from '@shared/ui';
import css from './EllipsisMenu.module.scss';

export type EllipsisMenuItem = {
  title: string;
  titleColor?: 'danger' | 'default';
  onClick?(): void;
};

export type EllipsisMenuProps = {
  items: EllipsisMenuItem[];
};

export const EllipsisMenu = (props: EllipsisMenuProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const breakpoints = Grid.useBreakpoint();

  const { items } = props;

  const content = (
    <Space direction='vertical' size={10}>
      {items.map((item, index) => {
        return (
          <Button
            key={`${item.title}-${index}`}
            fullWidth
            className={css.tooltipButton}
            onClick={item?.onClick}
          >
            <Paragraph level={4} className={cx(css.itemTitle, css[item.titleColor ?? 'default'])}>
              {item.title}
            </Paragraph>
          </Button>
        );
      })}
    </Space>
  );

  const onOpen = () => setIsOpened(!isOpened);

  if (breakpoints.xs) {
    const onClose = () => setIsOpened(false);

    return (
      <>
        <Modal
          title={null}
          open={isOpened}
          centered={false}
          footer={null}
          className={css.modal}
          closeIcon={null}
          onCancel={onClose}
          maskClosable={true}
        >
          {content}
          <div className={css.buttonWrapper}>
            <Button type='text' fullWidth className={css.closeButton} onClick={onClose}>
              Закрыть
            </Button>
          </div>
        </Modal>
        <Button type='text' onClick={onOpen}>
          <MoreOutlined style={{ fontSize: 18 }} rotate={90} />
        </Button>
      </>
    );
  }

  return (
    <Tooltip title={content} placement='bottom' overlayClassName={css.overlay}>
      <Button type='text'>
        <MoreOutlined style={{ fontSize: 18 }} rotate={90} />
      </Button>
    </Tooltip>
  );
};
