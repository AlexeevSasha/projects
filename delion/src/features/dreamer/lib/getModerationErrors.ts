import type { ModerationError, ModerationFields } from '@entities/application';
import type { DreamerSection } from '@entities/dreamer';
import { objectKeys } from '@shared/lib';

const sections: Record<DreamerSection, ModerationFields[]> = {
  is_dreamer_info: ['birth_date', 'document_number', 'snils_number', 'agreement_file'],
  is_dreamer_category: ['document_front_file'],
  is_additional_info: [],
  is_good_deed: [],
  is_dream: ['present_link_1', 'present_link_2', 'dream_category', 'theme_specification'],
};

export const getSectionsModerationStatus = (error: ModerationError | undefined) => {
  const sectionStatuses: Record<DreamerSection, boolean> = {
    is_dreamer_info: false,
    is_dreamer_category: false,
    is_additional_info: false,
    is_good_deed: false,
    is_dream: false,
  };
  if (!error) return sectionStatuses;

  objectKeys(sections).forEach((section) => {
    sectionStatuses[section] = sections[section].some((field) => error[field].length);
  });
  return sectionStatuses;
};
