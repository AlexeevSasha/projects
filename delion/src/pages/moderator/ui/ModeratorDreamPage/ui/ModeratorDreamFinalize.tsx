import { useCallback, useMemo } from 'react';
import { Space } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { DreamerCollapseTitle } from '@features/dreamer';
import { TitleWithDescriptionBlock } from '@features/moderator';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Collapse } from '@shared/ui';
import { ContactsDreamers, DreamerFinalizeCard, FinalizeButtons } from '@widgets/moderator';

interface IProps {
  prevStep: () => void;
  setLoading: (v: boolean) => void;
}

export const ModeratorDreamFinalize = observer(({ prevStep, setLoading }: IProps) => {
  const { replace } = useRouter();
  const { applicationS, moderatorS } = useStores();

  const content = useMemo(() => {
    if (!applicationS?.application?.dreamer_moderation_rate.length) return null;

    const items = applicationS.application.dreamer_moderation_rate.map((el) => ({
      key: String(el.dreamer.id),
      label: (
        <DreamerCollapseTitle
          dream_category={el.dreamer.dream_category}
          id={el.dreamer.id}
          title={`${el.dreamer.first_name} ${el.dreamer.last_name} ${el.dreamer.middle_name}`}
        />
      ),
      children: <DreamerFinalizeCard info={el} />,
      id: `dreamer${el.dreamer.id}`,
    }));

    return <Collapse showTitleWhenClose items={items} />;
  }, [applicationS?.application?.dreamer_moderation_rate]);

  const onFinish = useCallback(async () => {
    setLoading(true);
    await moderatorS.finalizeDreams(applicationS.application.id);
    replace(APP_ROUTES.MODERATOR.toString());
  }, [applicationS?.application?.id]);

  return (
    <Space style={{ marginBottom: 24 }} direction={'vertical'} size={'large'}>
      <TitleWithDescriptionBlock
        title={'Проверка данных'}
        description={
          'Пожалуйста, внимательно проверьте отмеченные вами ошибки. При необходимости вернитесь к модерации и исправьте замечания'
        }
      />
      <ContactsDreamers
        name={applicationS.application?.agent_fio || ''}
        phone={applicationS.application?.agent_phone || ''}
        settlement={applicationS.application?.settlement || ''}
      />
      {content}
      <FinalizeButtons onPrev={prevStep} onFinish={onFinish} />
    </Space>
  );
});
