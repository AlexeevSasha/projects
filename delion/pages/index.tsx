import React, { useEffect } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { AFTER_LOGIN_REDIRECT_URL } from '@features/auth/model/auth';
import HomeApplication from '@shared/assets/home-application.svg';
import HomeDream from '@shared/assets/home-dream.svg';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Button, HomeWelcomeBlock } from '@shared/ui';

const Page = observer(() => {
  const router = useRouter();
  const {
    userS,
    featureFlags: {
      featureFlags: { trustee_auth_flag, executor_auth_flag },
    },
  } = useStores();

  useEffect(() => {
    // TODO: Временный подход с редиректом на стороне клиента.
    // После добавления клейма роли в токен - можно будет делать серверный редирект
    if (userS?.user?.userRole) {
      router.replace(AFTER_LOGIN_REDIRECT_URL[userS.user.userRole]);
    }
  }, [router, userS.user?.userRole]);

  const onBackButtonClick = () => {
    window.location.href = 'https://елкажеланий.рф';
  };

  return (
    <>
      <Row gutter={[24, 16]} style={{ paddingTop: 32, paddingBottom: 32 }}>
        <Col sm={24} style={{ position: 'relative' }}>
          <Button icon={<LeftOutlined />} onClick={onBackButtonClick}>
            На главную
          </Button>
        </Col>
      </Row>
      <Row justify='center' gutter={[24, 16]} style={{ paddingBottom: 32 }}>
        <Col md={12} sm={24}>
          <HomeWelcomeBlock
            image={HomeDream}
            title='Загадать желание'
            subtitle='Поделитесь новогодним желанием своего ребенка на сайте акции и дайте возможность увидеть её исполнителям'
            button={
              <Button
                type='primary'
                disabled={!trustee_auth_flag}
                onClick={() => userS.onOAuthLogin()}
              >
                Стать мечтателем
              </Button>
            }
            locked={!trustee_auth_flag}
          />
        </Col>
        <Col md={12} sm={24}>
          <HomeWelcomeBlock
            image={HomeApplication}
            title='Исполнить желание'
            subtitle=' Станьте частью большого и доброго дела, подарив нуждающимся детям радость и новогоднее
              чудо'
            button={
              <Button type='primary' disabled={!executor_auth_flag} href={APP_ROUTES.LOGIN}>
                Стать исполнителем
              </Button>
            }
            locked={!executor_auth_flag}
          />
        </Col>
      </Row>
    </>
  );
});

export default Page;
