import type { ReactNode } from 'react';
import { Col, Row } from 'antd';
import { Paragraph } from '@shared/ui';
import css from './FinalizeBoxWithValue.module.scss';

interface IProps {
  title: string;
  value: ReactNode;
  strong?: boolean;
}

export const FinalizeBoxWithValue = ({ title, value, strong }: IProps) => {
  return (
    <div className={css.container}>
      <Row gutter={[16, 8]} align={'middle'}>
        <Col md={15} span={24}>
          <Paragraph className={css.container__title} level={4} strong={strong}>
            {title}
          </Paragraph>
        </Col>
        <Col md={9} span={24}>
          {typeof value !== 'object' ? (
            <Paragraph className={css.container__item}>{value}</Paragraph>
          ) : (
            value
          )}
        </Col>
      </Row>
    </div>
  );
};
