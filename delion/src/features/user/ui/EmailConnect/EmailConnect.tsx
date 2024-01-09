import type { ChangeEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { Col, Divider, Form, Input, Row, Space, Grid } from 'antd';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { UserRoles } from '@entities/user';
import { EmailIcon } from '@shared/assets';
import { useStores } from '@shared/lib';
import { Button, Paragraph } from '@shared/ui';
import css from './EmailConnect.module.scss';

export const EmailConnect = observer(() => {
  const { userS } = useStores();
  const isEdit = useMemo(() => UserRoles.DREAMER !== userS.user?.userRole, [userS.user?.userRole]);
  const breakpoints = Grid.useBreakpoint();

  const [isBind, setIsBind] = useState(!userS?.user?.email_verified);
  const [subscribe, setSubscribe] = useState(!!userS.user?.notify_via_email);
  const [loading, setLoading] = useState(false);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (userS.user?.email && event.target.value === userS.user?.email) {
      setIsBind(false);
    } else {
      setIsBind(true);
    }
  }, []);

  const onFinish = useCallback((values: { email: string }) => {
    setLoading(true);
    userS.sendEmail(values.email).finally(() => setLoading(false));
  }, []);

  const onSubscribe = useCallback(() => {
    userS
      .actionSubscriptionEmail(userS.user?.notify_via_email ? 'off' : 'on')
      .then((res) => res && setSubscribe((prev) => !prev));
  }, [subscribe]);

  return (
    <Form initialValues={{ email: userS.user?.email || '' }} onFinish={onFinish}>
      <Row gutter={[16, 16]}>
        <Col span={breakpoints.xs ? 24 : 16}>
          <Space className={css.header} align={'center'}>
            <Space>
              <EmailIcon width={40} height={40} />
              <div>Email</div>
            </Space>
            <Paragraph
              className={classNames(css.connect, {
                [css.connect__off]: !subscribe,
              })}
            >
              {!subscribe ? 'Не подключен' : 'Подключен'}
            </Paragraph>
          </Space>
        </Col>
        <Col style={{ alignSelf: 'self-end' }} span={24}>
          <Row gutter={[16, 16]}>
            <Col span={breakpoints.xs ? 24 : 16}>
              <Form.Item
                className={css.email}
                name={'email'}
                rules={[{ type: 'email', message: 'Невалидный email' }, { required: true }]}
              >
                <Input onChange={onChange} disabled={!isEdit} />
              </Form.Item>
            </Col>
            <Col span={breakpoints.xs ? 24 : 8}>
              {isBind ? (
                <Button htmlType={'submit'} loading={loading} type={'primary'} fullWidth>
                  Привязать
                </Button>
              ) : (
                <Button onClick={onSubscribe} type={subscribe ? 'default' : 'primary'} fullWidth>
                  {subscribe ? 'Отключить' : 'Подключить'}
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider className={css.divider} />
    </Form>
  );
});
