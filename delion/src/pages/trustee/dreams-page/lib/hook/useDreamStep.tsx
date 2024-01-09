import { useCallback, useMemo, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Button, Paragraph } from '@shared/ui';
import { drawer } from '@shared/ui/popup';
import { DreamerCheckInformation, DreamerConfirmPhone } from '@widgets/dreamer';
import css from '../../ui/DreamsPage.module.scss';

export const useDreamStep = (fromTrustee?: boolean) => {
  const { applicationS } = useStores();
  const { replace } = useRouter();
  const [back, setBack] = useState(false);
  const [current, setCurrent] = useState(1);
  const next = useCallback(() => setCurrent((prev) => prev + 1), []);
  const prev = useCallback(() => {
    setBack(true);
    setCurrent((prev) => prev - 1);
  }, []);

  const items = useMemo(
    () => [
      {
        title: (
          <div className={css.draft}>
            <Paragraph level={4}>Черновик заявки</Paragraph>
            <Paragraph className={css.draft__second}>
              {applicationS.application.created &&
                `от ${dayjs(applicationS.application.created || '').format('D MMMM YYYY')} года`}
            </Paragraph>
            <Button
              onClick={() => {
                replace(APP_ROUTES.TRUSTEE_APPLICATION.toString());
                drawer.close();
              }}
              icon={<LeftOutlined />}
              size={'small'}
              className={css.draft__button}
            >
              Вернуться
            </Button>
          </div>
        ),
        content: '',
      },
      {
        title: 'Проверка заявки',
        content: <DreamerCheckInformation fromTrustee={fromTrustee} isBack={back} next={next} />,
      },
      {
        title: 'Подтверждение телефона',
        content: <DreamerConfirmPhone prev={prev} />,
      },
    ],
    [applicationS.application, back, fromTrustee],
  );

  const step = useMemo(
    () => <Steps progressDot direction={'vertical'} current={current} items={items} />,
    [items, current],
  );

  return { step, content: items[current].content, current };
};
