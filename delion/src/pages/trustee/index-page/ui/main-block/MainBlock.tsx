import { useCallback, useMemo } from 'react';
import { Col, Flex, Grid, Row, Steps } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '@shared/lib';
import { FloatingButton, StatusHint } from '@shared/ui';
import { drawer } from '@shared/ui/popup';
import {
  ApplicationStatusCard,
  getContentStatusApplication,
  useApplicationStatusHistory,
} from '@widgets/application';
import css from './MainBlock.module.scss';

export const MainBlock = observer(() => {
  const breakpoint = Grid.useBreakpoint();
  const { trusteeS, applicationS } = useStores();
  const { items } = useApplicationStatusHistory();

  const openMobileMenu = useCallback(() => {
    drawer.open(<Steps progressDot direction={'vertical'} items={items} />, {
      title: 'Статус заявки',
    });
  }, [items]);

  const content = useMemo(() => {
    if (!applicationS.application.id) return null;
    const content = getContentStatusApplication(applicationS.application, () =>
      trusteeS.cancelDreams().then(),
    );
    return content ? <ApplicationStatusCard {...content} /> : null;
  }, [applicationS.application]);

  return (
    <>
      <Row className={css.container} gutter={24}>
        <Col xl={6} md={8} span={24}>
          {breakpoint.md ? (
            <div className={css.step}>
              <Steps progressDot direction={'vertical'} items={items} />
            </div>
          ) : (
            <FloatingButton onClick={openMobileMenu} />
          )}
        </Col>
        <Col xl={18} md={16} span={24}>
          <Flex vertical gap={12}>
            {!breakpoint.md && (
              <StatusHint
                status={'warning'}
                text={
                  'Подавать заявку проще с компьютера, а отслеживать ее статус можно и с телефона!'
                }
              />
            )}
            {content}
          </Flex>
        </Col>
      </Row>
    </>
  );
});
