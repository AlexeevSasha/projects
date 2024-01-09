import { useLayoutEffect, useState } from 'react';
import { Col, Row, Spin } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { UserRoles } from '@entities/user';
import { knowledgeData } from '@features/const';
import KnowledgeImage from '@shared/assets/moderator/moderator-knowledge.svg';
import WelcomeImage from '@shared/assets/moderator/moderator-welcome.svg';
import { APP_ROUTES } from '@shared/const';
import { messageError, useStores } from '@shared/lib';
import { Button, Divider, WelcomeBlock } from '@shared/ui';
import { drawer } from '@shared/ui/popup';
import { StatisticsBlock } from '@widgets/moderator';
import css from './ModeratorPage.module.scss';

interface ModeratorPageProps {
  fromDream?: boolean;
}

export const ModeratorPage = observer(({ fromDream }: ModeratorPageProps) => {
  const [disabled, setDisabled] = useState(true);
  const { userS } = useStores();
  const { replace } = useRouter();

  const onKnowledgeClick = () => {
    drawer.openKnowledge({
      title: 'База знаний',
      dataSource: knowledgeData[UserRoles.MODERATOR],
    });
  };

  const onTake = () => {
    if (!userS.user?.moderator_profile?.available_apps_count) {
      messageError('Отсутствуют заявки на модерацию');
      return;
    }
    replace('/moderator/dream');
  };

  useLayoutEffect(() => {
    if (userS.user?.moderated_dream_application) {
      replace(APP_ROUTES.MODERATOR_DREAM.toString());
    } else {
      setDisabled(false);
    }

    fromDream && userS.fetchUser();
  }, []);

  return (
    <Spin spinning={disabled}>
      <div className={css.container}>
        {userS.user?.moderator_profile && <StatisticsBlock {...userS.user?.moderator_profile} />}
        <Divider className={css.container__divider} />
        <Row gutter={[24, 16]}>
          <Col md={16} span={24} className={css.col}>
            <WelcomeBlock
              img={WelcomeImage}
              title={'Добро пожаловать'}
              button={
                <Button disabled={disabled} loading={disabled} type={'primary'} onClick={onTake}>
                  Получить заявку
                </Button>
              }
              description={
                'Получите заявку, внимательно проверьте ее и одобрите или отправьте на доработку'
              }
            />
          </Col>
          <Col flex={'auto'} md={8} span={24}>
            <WelcomeBlock
              img={KnowledgeImage}
              title={'База знаний'}
              button={<Button onClick={onKnowledgeClick}>База знаний</Button>}
              description={
                <>
                  Не знаете как модерировать заявки? <br /> Получите инструкции здесь
                </>
              }
            />
          </Col>
        </Row>
      </div>
    </Spin>
  );
});
