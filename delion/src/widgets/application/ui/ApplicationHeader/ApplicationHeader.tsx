import type { FC, ReactNode } from 'react';
import { Space } from 'antd';
import dayjs from 'dayjs';
import { useStores } from '@shared/lib';
import { Paragraph } from '@shared/ui';
import css from './ApplicationHeader.module.scss';

interface Props {
  tools?: ReactNode;
}

export const ApplicationHeader: FC<Props> = ({ tools }) => {
  const { applicationS } = useStores();

  const date = dayjs(applicationS.application.created).format('DD.MM.YYYY');

  return (
    <div className={css.container}>
      <Space direction='vertical' size={0}>
        <Paragraph level={4}>Черновик заявки №{applicationS.application.id}</Paragraph>
        <Paragraph type='secondary'>от {date}</Paragraph>
      </Space>
      <div className={css.container__buttonList}>{tools}</div>
    </div>
  );
};
