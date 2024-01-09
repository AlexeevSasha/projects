import { useMemo } from 'react';
import { Space } from 'antd';
import type { StepProps } from 'antd/es/steps';
import dayjs from 'dayjs';
import { getStatusApplicationStepInfo } from '@features/application/trustee';
import { editCheckDreams } from '@features/dreamer';
import { PrevIcon } from '@shared/assets';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Button, Paragraph } from '@shared/ui';
import { drawer } from '@shared/ui/popup';

export const useApplicationStatusHistory = () => {
  const { applicationS } = useStores();

  const buttonDream = useMemo(() => {
    const isEdit = editCheckDreams(applicationS.application.status);

    const link =
      applicationS.application.is_contact_filled &&
      applicationS.application.dreamers.some((el) => !el.all_fields_filled)
        ? APP_ROUTES.TRUSTEE_APPLICATION
        : APP_ROUTES.TRUSTEE_APPLICATION_DREAMS;

    return (
      <Button
        icon={isEdit ? <PrevIcon /> : null}
        onClick={() => drawer.close()}
        href={isEdit ? link.toString() : APP_ROUTES.TRUSTEE_APPLICATION_DREAMS.toString()}
      >
        {isEdit ? 'Вернуться к заявке' : 'Просмотреть заявку'}
      </Button>
    );
  }, [applicationS.application]);

  const stepItem = useMemo(() => {
    if (!applicationS.application.id) return [];

    const items: StepProps[] = [
      {
        status: 'finish',
        title: (
          <Paragraph type={'secondary'} level={3}>
            Заявка №{applicationS.application.id}
          </Paragraph>
        ),
        description: (
          <Space direction={'vertical'} size={8}>
            <Paragraph type={'secondary'}>
              от {dayjs(applicationS.application?.created).format('D MMMM YYYY')} года
            </Paragraph>
            {buttonDream}
          </Space>
        ),
      },
    ];

    applicationS.application?.status_history?.forEach(({ status, created }, i, array) => {
      const data = getStatusApplicationStepInfo(status);
      const className = data.isWarn && array.length === i + 1 ? 'ant-steps-item-warn' : '';
      items.push({
        className,
        status: array.length === i + 1 ? data.status : 'finish',
        title: <Paragraph level={3}>{data.title}</Paragraph>,
        description: data.showDate ? (
          <Paragraph type={'secondary'}>{dayjs(created).format('D MMMM YYYY')} года</Paragraph>
        ) : null,
      });
    });

    return items;
  }, [applicationS.application, buttonDream]);

  return { items: stepItem };
};
