import { useCallback } from 'react';
import type { FormListFieldData } from 'antd';
import type { Application } from '@entities/application';
import { DreamerCollapseTitle } from '@features/dreamer';
import { useCategoryModerator } from '@features/moderator/lib/hook/useCategoryModerator';
import { useStores } from '@shared/lib';
import { Collapse } from '@shared/ui';
import { DreamerCard } from '@widgets/moderator';

interface IProps {
  setForm: (app: Application) => void;
}

export const useDreamers = ({ setForm }: IProps) => {
  const { applicationS } = useStores();
  const loadedCategory = useCategoryModerator();

  const getDreamers = useCallback(
    (fields: FormListFieldData[]) => {
      if (!applicationS?.application?.dream_application_id || !loadedCategory) return null;

      const items = applicationS.application.dreamer_moderation_rate.map((el, i) => ({
        key: String(el.dreamer.id),
        label: (
          <DreamerCollapseTitle
            dream_category={el.dreamer.dream_category}
            id={el.dreamer.id}
            title={`${el.dreamer.first_name} ${el.dreamer.last_name} ${el.dreamer.middle_name}`}
          />
        ),
        children: <DreamerCard name={fields[i]?.name} info={el} key={fields[i]?.key} />,
        id: `dreamer${el.dreamer.id}`,
      }));

      setTimeout(() => setForm(applicationS.application), 100);
      return <Collapse items={items} />;
    },
    [loadedCategory],
  );

  return {
    getDreamers,
    info: {
      settlement: applicationS?.application?.settlement || '',
      phone: applicationS?.application?.agent_phone || '',
      name: applicationS?.application?.agent_fio || '',
    },
    loaded: !!applicationS?.application?.dreamer_moderation_rate.length && loadedCategory,
    moderation_time: applicationS?.application?.moderation_time,
    id: applicationS?.application?.id,
    number_dream: applicationS?.application?.dream_application_id,
  };
};
