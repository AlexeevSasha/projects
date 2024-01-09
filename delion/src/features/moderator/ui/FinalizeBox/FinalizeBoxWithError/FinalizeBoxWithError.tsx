import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { Col, Row, Space } from 'antd';
import { cashCatalogue } from '@shared/lib';
import { Paragraph } from '@shared/ui';
import css from './FinalizeBoxWithError.module.scss';

interface IProps {
  values: number[];
  title: string | string[];
  description: ReactNode;
  catalogue: string;
}

export const FinalizeBoxWithError = ({ title, description, catalogue, values }: IProps) => {
  const options = useMemo(() => cashCatalogue.get(catalogue) || [], []);

  return (
    <div className={css.errors}>
      <Row align='middle' gutter={[16, 8]}>
        <Col md={15} span={24}>
          {Array.isArray(title) && Array.isArray(description) ? (
            <Space size={'middle'}>
              {title.map((el, i) => (
                <Space key={i} className={css.info} direction={'vertical'}>
                  <Paragraph className={css.info__title}>{el}</Paragraph>
                  <div className={css.info__description}> {description[i]}</div>
                </Space>
              ))}
            </Space>
          ) : (
            <Space className={css.info} direction={'vertical'}>
              <Paragraph className={css.info__title}>{title}</Paragraph>
              <div className={css.info__description}> {description}</div>
            </Space>
          )}
        </Col>
        <Col md={9} span={24}>
          <Space direction={'vertical'}>
            {options
              .filter((el) => values.includes(el.value))
              .map((el) => (
                <div className={css.errors__item} key={el.value}>
                  <Paragraph level={6}>{el.label}</Paragraph>
                </div>
              ))}
          </Space>
        </Col>
      </Row>
    </div>
  );
};
