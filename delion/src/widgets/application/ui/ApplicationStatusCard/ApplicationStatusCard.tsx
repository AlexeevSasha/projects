import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Row, Space } from 'antd';
import Image from 'next/image';
import type { IContentStatusApplication } from '@features/application/trustee';
import { NotificationSidebar } from '@features/sidebar/ui';
import { Divider, Paragraph } from '@shared/ui';
import css from './ApplicationStatusCard.module.scss';

export const ApplicationStatusCard = (props: IContentStatusApplication) => {
  return (
    <Row gutter={[16, 0]} className={css.container}>
      <Col xl={15} span={24}>
        <Space size={32} direction={'vertical'}>
          <Image height={160} src={props.image_url} alt='Иллюстрация' />
          <Space direction={'vertical'}>
            <Space align={'center'}>
              <Paragraph strong level={2}>
                {props.title}
              </Paragraph>
              {props?.titleIcon ? (
                <div className={css.container__icon}>{props.titleIcon}</div>
              ) : null}
            </Space>
            {props.description}
          </Space>
          {props?.action}
          {props.errors?.map((error, i) => (
            <Space align={'start'} size={10} key={i} className={css.container__error}>
              <ExclamationCircleOutlined />
              <Paragraph> {error}</Paragraph>
            </Space>
          ))}
        </Space>
      </Col>
      <Col xl={9} span={24}>
        <Divider className={css.container__divider} marginTop={24} marginBottom={24} />
        <NotificationSidebar withBorder isSticky={false} />
      </Col>
    </Row>
  );
};
