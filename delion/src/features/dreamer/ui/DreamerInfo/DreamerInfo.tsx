import type { ReactNode } from 'react';
import { Col, Divider, Row, Space } from 'antd';
import classNames from 'classnames';
import { Paragraph } from '@shared/ui';
import css from './DreamerInfo.module.scss';

type DreamerInfo = {
  name?: string;
  description: ReactNode;
  color?: 'blue';
  hidden?: boolean;
};

interface IDreamerInfoProps {
  info: (DreamerInfo | null)[];
  title?: string;
  hint?: ReactNode;
  divider?: boolean;
}

export const DreamerInfo = ({ info, title, ...attr }: IDreamerInfoProps) => {
  return (
    <Row gutter={[16, 8]}>
      <Col className={css.wrapper} xl={17} span={24}>
        {title && (
          <Paragraph level={4} strong>
            {title}
          </Paragraph>
        )}

        {info.map((el, i) => {
          if (!el) return null;

          const { description, name, color = '', hidden = false } = el;

          if (hidden) return null;

          return (
            <Space
              align={'start'}
              key={i}
              size={'middle'}
              className={classNames(css.container, {
                [css.items]: name,
              })}
            >
              {name && <Paragraph className={css.title}>{name}</Paragraph>}
              <Paragraph className={css[color]}>{description}</Paragraph>
            </Space>
          );
        })}
        {attr.divider && (
          <Divider className={classNames(css.divider, { [css.divider__visible]: !attr.hint })} />
        )}
      </Col>
      {attr.hint && (
        <Col xl={7} span={24}>
          {attr.hint}
          {attr.divider && <Divider className={classNames(css.divider, css.divider__mobile)} />}
        </Col>
      )}
    </Row>
  );
};
