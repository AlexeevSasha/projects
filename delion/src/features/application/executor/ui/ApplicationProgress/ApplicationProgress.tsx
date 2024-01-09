import type { ReactNode } from 'react';
import React from 'react';
import { Col, Grid, Progress, Row, Space } from 'antd';
import { observer } from 'mobx-react';
import type { ProgressCalculationData } from '@shared/lib/calculateProgress';
import { Paragraph } from '@shared/ui';
import css from './ApplicationProgress.module.scss';

export type ApplicationProgressProps = Partial<ProgressCalculationData> & {
  title?: string;
  direction?: 'column' | 'column-reverse';
  button?: ReactNode;
  pluralizedCounter?: string;
};

export const ApplicationProgress = observer((props: ApplicationProgressProps) => {
  const breakpoints = Grid.useBreakpoint();
  const {
    completed,
    total,
    donePercentage,
    direction = 'column',
    title = 'Исполнено желаний',
    pluralizedCounter = '',
    button = null,
  } = props;

  return (
    <Row gutter={[24, 0]} align='middle'>
      <Col lg={button ? 16 : 24} sm={button ? 15 : 24} span={button && !breakpoints.xs ? 16 : 24}>
        <Space direction='vertical' style={{ flexDirection: direction }}>
          <div style={{ display: 'flex', alignItems: breakpoints.xs ? 'center' : 'baseline' }}>
            <Space
              size={2}
              direction={breakpoints.xs && pluralizedCounter ? 'vertical' : 'horizontal'}
              align={breakpoints.xs ? 'start' : 'center'}
              wrap={true}
              style={{
                justifyContent: 'space-between',
                textAlign: 'left',
                whiteSpace: 'nowrap',
              }}
            >
              <Paragraph className={css.progressBarTitle}>{title}</Paragraph>
              <Paragraph
                className={css.progressBarTitle}
              >{`${completed} из ${total} ${pluralizedCounter}`}</Paragraph>
            </Space>
            {button && breakpoints.xs && button}
          </div>
          <Progress showInfo={false} percent={donePercentage} />
        </Space>
      </Col>
      {button && !breakpoints.xs && (
        <Col lg={8} sm={9}>
          {button}
        </Col>
      )}
    </Row>
  );
});
