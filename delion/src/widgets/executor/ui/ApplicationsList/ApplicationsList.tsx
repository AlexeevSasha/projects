import { Col, Pagination, Row, Space } from 'antd';
import type { PaginationProps } from 'antd/lib';
import type { Application } from '@entities/application';
import { ApplicationItem } from '@features/application/executor';

type ApplicationsListProps = {
  paginationProps: PaginationProps;
  items: Application[];
  onChangePagination(page: number, pageSize: number): void;
};

export const ApplicationsList = (props: ApplicationsListProps) => {
  const { items, paginationProps, onChangePagination } = props;

  return (
    <Row style={{ width: '100%' }} gutter={[0, 24]}>
      <Col span={24}>
        <Space direction='vertical' size={16}>
          {items.map((item) => (
            <ApplicationItem {...item} key={item.id} />
          ))}
        </Space>
      </Col>
      <Col>
        <Pagination {...paginationProps} onChange={onChangePagination} />
      </Col>
    </Row>
  );
};
