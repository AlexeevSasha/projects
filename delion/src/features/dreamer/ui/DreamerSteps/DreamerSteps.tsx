import { type FC } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import type { SubMenuProps } from 'antd';
import type { ModerationError } from '@entities/application/model/application';
import type { Dreamer, DreamerSection } from '@entities/dreamer';
import { getSectionsModerationStatus } from '@features/dreamer/lib/getModerationErrors';
import { objectKeys, useStores } from '@shared/lib';
import { StatusMenuItem, StatusSubMenu } from '@shared/ui';
import css from './DreamerSteps.module.scss';

const sections: Record<DreamerSection, string> = {
  is_dreamer_info: 'О мечтателе',
  is_dreamer_category: 'Категория',
  is_additional_info: 'Доп. информация',
  is_good_deed: 'Доброе дело',
  is_dream: 'Желание',
};

interface Props extends SubMenuProps {
  dreamer: Dreamer;
  errors?: ModerationError;
  onDreamerClick: () => void;
  onSectionClick: (section: DreamerSection) => void;
  title: string;
}

export const DreamerSteps: FC<Props> = ({
  errors,
  dreamer,
  onDreamerClick,
  onSectionClick,
  title,
  ...rest
}) => {
  const { applicationS } = useStores();

  const sectionsModerationStatus = getSectionsModerationStatus(errors);

  const hasErrors = !errors
    ? false
    : objectKeys(errors).some((field) => {
        if (field === 'id' || field === 'dreamer_id') return false;

        return !!errors[field].length;
      });

  const status = hasErrors ? 'warning' : dreamer.all_fields_filled ? 'success' : 'default';

  return (
    <div className={css.container} onClick={onDreamerClick}>
      <StatusSubMenu status={status} className={css.container__item} title={title} {...rest}>
        {objectKeys(sections).map((section) => (
          <StatusMenuItem
            key={`${section}-${dreamer.id}`}
            onClick={() => onSectionClick(section)}
            status={
              sectionsModerationStatus[section]
                ? 'warning'
                : dreamer[section as DreamerSection]
                ? 'success'
                : 'default'
            }
          >
            {sections[section]}
          </StatusMenuItem>
        ))}
      </StatusSubMenu>
      {!dreamer.is_approved_moderation && (
        <CloseCircleFilled
          onClick={(e) => {
            e.stopPropagation();
            applicationS.setDeletingDreamer(dreamer);
          }}
          className={css.container__close}
        />
      )}
    </div>
  );
};
