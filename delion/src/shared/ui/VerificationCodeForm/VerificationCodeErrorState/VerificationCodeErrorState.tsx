import { Col, Flex, Row } from 'antd';
import { observer } from 'mobx-react';
import { AlertIcon80 } from '@shared/assets';
import { useStores } from '@shared/lib';
import { Button, Paragraph } from '@shared/ui';
import css from './VerificationCodeErrorState.module.scss';

export const VerificationCodeErrorState = observer(() => {
  const { modalS } = useStores();
  return (
    <Row align='middle' justify='center' className={css.wrapper}>
      <Col span={24}>
        <AlertIcon80 />
      </Col>
      <Col span={24}>
        <Flex vertical align='center' gap={24}>
          <Paragraph level={4}>
            Мы не смогли отправить вам код.
            <br />
            Свяжитесь с Технической поддержкой чтобы решить эту проблему
          </Paragraph>

          <Button type='primary' onClick={() => modalS.openFeedbackModal()}>
            Техническая поддержка
          </Button>
        </Flex>
      </Col>
    </Row>
  );
});
