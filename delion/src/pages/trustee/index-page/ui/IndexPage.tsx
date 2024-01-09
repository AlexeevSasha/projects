import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import { MainBlock } from '@pages/trustee/index-page/ui/main-block';
import { useStores } from '@shared/lib';
import { WelcomeBlock } from '@shared/ui';
import { ApplicationTermsOfParticipation } from '@widgets/application';

export const IndexPage = observer(() => {
  const { userS, trusteeS, applicationS } = useStores();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const applicationId = userS.user?.dream_application_id || applicationS.application.id;

  useEffect(() => {
    applicationId && trusteeS.getApplication(applicationId);
  }, [applicationId, trusteeS]);

  if (applicationId) return <MainBlock />;

  return (
    <WelcomeBlock
      title={'Добро пожаловать'}
      button={
        <Button type={'primary'} onClick={() => setIsOpenModal(true)}>
          Создать заявку
        </Button>
      }
      description={
        <>
          Вы здесь, чтобы подать заявку на участие в «Ёлке желаний».
          <br />
          Внимательно следуйте инструкциям.
        </>
      }
    >
      <ApplicationTermsOfParticipation
        isOpenModal={isOpenModal}
        setIsOpenModal={(val) => setIsOpenModal(val)}
      />
    </WelcomeBlock>
  );
});
