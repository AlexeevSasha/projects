import { Row, Spin } from 'antd';

export const Spinner = () => {
  return (
    <Row justify={'center'} style={{ marginBlock: 8 }}>
      <Spin tip='Загрузка...' size='small'>
        <div style={{ padding: 50 }}></div>
      </Spin>
    </Row>
  );
};
