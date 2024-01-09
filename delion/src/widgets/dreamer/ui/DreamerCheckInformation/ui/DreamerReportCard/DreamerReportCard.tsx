import { Space } from 'antd';
import Image from 'next/image';
import type { Application } from '@entities/application';
import { DreamerInfo } from '@features/dreamer';
import { Button } from '@shared/ui';
import css from './DreamerReportCard.module.scss';

export const DreamerReportCard = ({
  report,
  report_text,
}: Pick<Application, 'report_text' | 'report'>) => {
  return (
    <DreamerInfo
      info={[
        {
          name: 'Поделитесь коротким комментарием об исполненном желании:',
          description: report_text,
        },
        {
          name: 'Подтверждающее фото',
          description: (
            <Space wrap>
              {report?.map(({ file, id }) => {
                return (
                  <Button target={'_blank'} className={css.button} key={id} href={file}>
                    <Image height={96} width={96} src={file} alt='Картинка отчёта' />
                  </Button>
                );
              })}
            </Space>
          ),
        },
      ]}
    />
  );
};
