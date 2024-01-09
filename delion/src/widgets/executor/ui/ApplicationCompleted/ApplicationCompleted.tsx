import { useCallback, useMemo } from 'react';
import { DownOutlined, StarFilled } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, Grid, List, Space } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import type { Feedback } from '@entities/application/model/application';
import { feedbackFormConfig } from '@features/application/executor';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Button, Paragraph, WelcomeBlock } from '@shared/ui';
import css from './ApplicationCompleted.module.scss';

export const ApplicationCompleted = observer(() => {
  const breakpoints = Grid.useBreakpoint();
  const router = useRouter();

  const { applicationS } = useStores();

  const applicationId = applicationS.application?.id;

  const onShowApplicationInfo = useCallback(() => {
    router.push({
      pathname: APP_ROUTES.EXECUTOR_APPLICATION.toString(),
      query: { id: applicationId, info: true },
    });
  }, [applicationId, router]);

  const onLeaveFeedbackClick = useCallback(() => {
    router.push({
      pathname: APP_ROUTES.EXECUTOR_APPLICATION_FEEDBACK.toString(),
      query: { id: applicationId },
    });
  }, [applicationId, router]);

  const items: CollapseProps['items'] = useMemo(() => {
    if (!applicationS.application.feedback) {
      return [];
    }

    const keys = Object.keys(applicationS.application.feedback);

    const feedbacks = (keys as [keyof Feedback])?.map((key) => ({
      title: feedbackFormConfig[key]?.label,
      value: applicationS.application?.feedback?.[key],
    }));

    return [
      {
        key: '1',
        label: (
          <Space className={css.feedbackTitle} styles={{ item: { display: 'flex' } }}>
            <StarFilled className={css.feedbackTitleIcon} />
            <Paragraph level={3}>Ваш отзыв</Paragraph>
            <Paragraph className={css.feedbackTitle__edit} onClick={onLeaveFeedbackClick} level={5}>
              Изменить
            </Paragraph>
          </Space>
        ),
        children: (
          <List>
            {feedbacks.map((item) => {
              return (
                <List.Item key={item.title}>
                  <Space
                    direction='vertical'
                    styles={{ item: { width: '100%', textAlign: 'left' } }}
                  >
                    <Paragraph level={6} strong>
                      {item.title}
                    </Paragraph>
                    <Paragraph>{item.value}</Paragraph>
                  </Space>
                </List.Item>
              );
            })}
          </List>
        ),
      },
    ];
  }, []);

  return (
    <Space direction='vertical' size={16}>
      <WelcomeBlock
        title='Мечты исполнены!'
        description={
          <Space direction='vertical' size={24}>
            <Paragraph level={4}>
              Спасибо вам что исполнили заявку!
              <br />
              Мечтатели точно будут вам благодарны!
            </Paragraph>
            <Space direction={breakpoints.xs ? 'vertical' : 'horizontal'}>
              <Button block onClick={onShowApplicationInfo}>
                Посмотреть заявку
              </Button>
              {!applicationS.application.feedback ? (
                <Button onClick={onLeaveFeedbackClick} block>
                  Оставить отзыв
                </Button>
              ) : null}
              <Button block>Рассказать друзьям</Button>
            </Space>
          </Space>
        }
        button={
          <Button type='primary' href={APP_ROUTES.EXECUTOR_FIND_APPLICATIONS.toString()}>
            Исполнить еще одну мечту
          </Button>
        }
      />
      {applicationS.application.feedback ? (
        <div className={css.feedbackWrapper}>
          <Collapse
            style={{ backgroundColor: 'transparent' }}
            items={items}
            expandIconPosition='end'
            expandIcon={({ isActive }) => (
              <DownOutlined style={{ fontSize: 18 }} rotate={isActive ? 180 : 0} />
            )}
            bordered={false}
            size='large'
          />
        </div>
      ) : null}
    </Space>
  );
});
