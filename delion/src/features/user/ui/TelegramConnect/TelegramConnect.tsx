import { useState } from 'react';
import { Col, Form, Row, Space, Grid } from 'antd';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { TelegramIcon } from '@shared/assets';
import { useStores } from '@shared/lib';
import { Button, Paragraph } from '@shared/ui';
import { setting } from 'config/setting';
import css from './TelegramConnect.module.scss';

export const TelegramConnect = observer(() => {
  const { userS } = useStores();
  const [subscribe] = useState(!!userS.user?.telegram_profile?.subscribe_status);
  const breakpoints = Grid.useBreakpoint();

  return (
    <div className={css.container}>
      <Form>
        <Row gutter={[16, 16]}>
          <Col span={breakpoints.xs ? 24 : 16}>
            <Space className={css.header} align='center'>
              <Space align='center'>
                <TelegramIcon />
                <div>Telegram</div>
              </Space>
              <Paragraph
                className={classNames(css.connect, {
                  [css.success]: subscribe,
                })}
              >
                {subscribe ? 'Подключен' : 'Не подключен'}
              </Paragraph>
            </Space>
          </Col>
          <Col style={{ alignSelf: 'self-end' }} span={breakpoints.xs ? 24 : 8}>
            {subscribe ? (
              <Button disabled fullWidth>
                Отключить
              </Button>
            ) : (
              <Button
                target='_blank'
                href={`https://telegram.me/${setting.telegramBotLogin}?start=${userS.user?.telegram_profile?.tg_uuid}`}
                fullWidth
                type='primary'
              >
                Подключить
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
});
