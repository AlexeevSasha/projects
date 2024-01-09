import { Col, Grid, Row, Space } from 'antd';
import classNames from 'classnames';
import type { ModeratorProfileData } from '@entities/user/model/user';
import { Paragraph } from '@shared/ui';
import css from './StatisticsBlock.module.scss';

export const StatisticsBlock = (props: ModeratorProfileData) => {
  const breakpoint = Grid.useBreakpoint();

  return (
    <Row gutter={breakpoint.md ? [12, 12] : [8, 8]} className={css.container}>
      <Col flex={'auto'} span={breakpoint.md ? 8 : 11}>
        <Item name={'Заявок на модерации'} count={props.available_apps_count} />
      </Col>
      <Col md={9} span={13}>
        <Row gutter={8}>
          <Col className={css.divider} span={12}>
            <Item name={'Желаний'} count={props.dreams_processed_total_count} />
          </Col>
          <Col span={12}>
            <Item name={'Сегодня'} count={props.dreams_processed_today_count} />
          </Col>
        </Row>
      </Col>
      <Col md={8} span={24}>
        <Row gutter={8}>
          <Col md={12} span={11} className={css.divider}>
            <Item
              error={!!props.rejects_count}
              name={'Отказы от модерации'}
              count={props.rejects_count}
            />
          </Col>
          <Col md={12} span={13}>
            <Item name={'Примерный заработок'} count={`${props.income || 0} Р`} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const Item = ({
  name,
  count,
  error,
}: {
  name: string;
  count: number | string;
  error?: boolean;
}) => {
  return (
    <Space
      className={classNames(css.item, {
        [css.item__error]: error,
      })}
      direction='vertical'
    >
      <Paragraph className={css.item__name}>{name}</Paragraph>
      <Paragraph className={css.item__price} strong level={2}>
        {count}
      </Paragraph>
    </Space>
  );
};
