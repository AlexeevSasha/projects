import { useCallback, useMemo } from 'react';
import type { FormInstance } from 'antd';
import { Avatar, Form, Grid } from 'antd';
import type { Application } from '@entities/application';
import { DreamersMenuAnchor } from '@features/dreamer';
import { useStores } from '@shared/lib';
import { FloatingButton } from '@shared/ui';
import { drawer } from '@shared/ui/popup';
import css from './ModeratorMenuAnchor.module.scss';

interface IProps {
  form: FormInstance<Application>;
}

const fieldNames = [
  'agreement_file',
  'birth_date',
  'document_front_file',
  'document_number',
  'dream_category',
  'parent_fio',
  'present_link_1',
  'present_link_2',
  'snils_number',
  'theme_specification',
];

export const ModeratorMenuAnchor = ({ form }: IProps) => {
  const breakpoint = Grid.useBreakpoint();
  const { applicationS } = useStores();

  const dreamers = useMemo(
    () =>
      applicationS.application.dreamer_moderation_rate.map(({ dreamer }) => ({
        id: dreamer.id,
        name: `${dreamer.first_name} ${dreamer.last_name}`,
        image: <Avatar size={16} src={dreamer.photo.file} />,
      })),
    [applicationS.application],
  );

  const values = Form.useWatch(['dreamer_moderation_rate'], form);

  const errors = useMemo(() => {
    if (!values && !applicationS.application.dreamer_moderation_rate.length) return [];
    return (
      (values || applicationS.application.dreamer_moderation_rate)?.map((field) => {
        let count = 0;
        Object.entries(field).forEach(([key, value]) => {
          if (fieldNames.includes(key)) {
            count += value?.length ? 1 : 0;
          }
        });
        return count;
      }) || []
    );
  }, [values, applicationS.application]);

  const openMobileMenu = useCallback(() => {
    drawer.open(<DreamersMenuAnchor dreamers={dreamers} errors={errors} />, {
      title: 'Список мечтателей',
    });
  }, [errors, dreamers]);

  if (!applicationS?.application?.dreamer_moderation_rate.length) return null;
  return breakpoint.md ? (
    <div className={css.container}>
      <DreamersMenuAnchor dreamers={dreamers} errors={errors} />
    </div>
  ) : (
    <FloatingButton onClick={openMobileMenu} />
  );
};
