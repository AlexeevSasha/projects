import { useEffect, useMemo } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { editCheckDreams } from '@features/dreamer';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { drawer } from '@shared/ui/popup';
import { DreamerNavigate } from '@widgets/dreamer';
import { getTitle } from '../lib/getTitle';
import { useDreamStep } from '../lib/hook/useDreamStep';
import css from './DreamsPage.module.scss';

interface DreamsPageProps {
  fromTrustee?: boolean;
}

export const DreamsPage = observer(({ fromTrustee }: DreamsPageProps) => {
  const { replace } = useRouter();
  const {
    applicationS: { application },
  } = useStores();

  const { content, step, current } = useDreamStep(fromTrustee);

  useEffect(() => {
    window.history.pushState({}, document.title, window.location.pathname);
  }, []);

  const actionDreamer = useMemo(() => {
    const edit = editCheckDreams(application?.status);
    return {
      title: edit ? (
        getTitle(current)
      ) : (
        <Button
          onClick={() => {
            replace(APP_ROUTES.TRUSTEE.toString());
            drawer.close();
          }}
          icon={<LeftOutlined />}
        >
          {getTitle()}
        </Button>
      ),
      step: edit ? step : null,
    };
  }, [application?.status, current]);

  return (
    <Row className={css.container} gutter={[24, 0]}>
      <Col xl={6} md={8} span={24}>
        <DreamerNavigate hiddenAnchor={current == 2} {...actionDreamer} />
      </Col>
      <Col xl={18} md={16} span={24}>
        {content}
      </Col>
    </Row>
  );
});
