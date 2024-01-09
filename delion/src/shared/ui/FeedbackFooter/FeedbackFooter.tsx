import React from 'react';
import { Grid, Space, Typography } from 'antd';
import cx from 'classnames';
import { useStores } from '@shared/lib';
import { Button, Paragraph } from '@shared/ui';
import css from './FeedbackFooter.module.scss';

export const FeedbackFooter = () => {
  const { modalS } = useStores();
  const breakpoints = Grid.useBreakpoint();
  const onFeedbackButtonClick = () => {
    modalS.openFeedbackModal();
  };

  return (
    <Space
      direction={breakpoints.xs ? 'vertical' : 'horizontal'}
      className={cx(css.feedback, { [css.isMobile]: breakpoints.xs })}
    >
      <div>
        <Typography.Title level={breakpoints.xs ? 5 : 4}>Остались вопросы?</Typography.Title>
        <Paragraph>
          Если у вас возникли вопросы, оставьте заявку и мы свяжемся с вами в ближайшее время
        </Paragraph>
      </div>
      <Button type='default' onClick={onFeedbackButtonClick} fullWidth={breakpoints.xs}>
        Задать вопрос
      </Button>
    </Space>
  );
};
