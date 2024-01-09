import { useCallback, type FC } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { FormInstance } from 'antd';
import type { Application } from '@entities/application';
import { messageOpen } from '@shared/lib';
import { useProtectPage } from '@shared/lib/hooks/useProtectPage';
import css from './SaveDraft.module.scss';

interface Props {
  form: FormInstance<Application>;
  saveEvent: () => Promise<unknown>;
}

export const SaveDraft: FC<Props> = ({ saveEvent }) => {
  const successFn = useCallback(() => {
    messageOpen({
      content: 'Ваши контактные данные изменены',
      icon: <CheckCircleOutlined className={css.icon} />,
    });
  }, []);

  const { handleCallback } = useProtectPage(saveEvent, successFn);

  return <Button onClick={() => handleCallback()}>Сохранить и закрыть</Button>;
};
