import { useMemo, type FC } from 'react';
import { Flex, Space } from 'antd';
import type { ModerationError } from '@entities/application/model/application';
import { objectKeys, useStores } from '@shared/lib';
import { Paragraph, StatusHint } from '@shared/ui';
import css from './ModerationErrorsBlock.module.scss';

interface Props {
  errors: ModerationError[];
}

export const ModerationErrorsBlock: FC<Props> = ({ errors }) => {
  const { applicationS } = useStores();

  const errorMessages = useMemo(
    () =>
      errors.reduce<string[]>((prev, current) => {
        objectKeys(current).forEach((key) => {
          if (key === 'id' || key === 'dreamer_id') return;
          current[key].forEach((field) => {
            prev.push(field.label);
          });
        });
        return prev;
      }, []),
    [errors],
  );

  const attemptsCount = useMemo(
    () => 2 - applicationS.application.attempts_count,
    [applicationS.application.attempts_count],
  );

  return (
    <StatusHint status={'warning'}>
      <Space direction={'vertical'}>
        <Flex vertical>
          <Paragraph level={4} style={{ marginBottom: '8px' }}>
            Ваша заявка отправлена на доработку.
          </Paragraph>
          <Paragraph>
            Исправьте указанные замечания и отправьте ее снова. Будьте внимательны!
          </Paragraph>
          <Paragraph>
            У вас осталось {attemptsCount} попытки отправить заявку. После этого при несоответствии
            условиям участия в акции - заявка будет отклонена!
          </Paragraph>
        </Flex>
        <Flex gap={'small'} wrap={'wrap'}>
          {errorMessages.map((error, index) => (
            <Paragraph level={6} className={css.error} key={index}>
              {error}
            </Paragraph>
          ))}
        </Flex>
      </Space>
    </StatusHint>
  );
};
