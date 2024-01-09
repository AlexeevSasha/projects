import { UserRoles } from '@entities/user';
import { SHARED_VALIDATION_RULE } from '@shared/const';
import type { FormFieldProps } from '@shared/ui/LegacyInput/model/form';

export const schemaUserDataForm: Record<UserRoles, FormFieldProps[]> = {
  [UserRoles.EXECUTOR]: [
    {
      type: 'text',
      label: 'Ваше имя',
      placeholder: 'Имя',
      name: 'first_name',
      rules: [{ required: true }, SHARED_VALIDATION_RULE],
      customFormItemOptions: {
        labelIcon: null,
      },
    },
    {
      type: 'text',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      name: 'last_name',
      rules: [SHARED_VALIDATION_RULE],
      customFormItemOptions: {
        labelIcon: null,
      },
    },
    {
      type: 'text',
      label: 'Отчество (необязательно)',
      placeholder: 'Отчество',
      name: 'middle_name',
      rules: [SHARED_VALIDATION_RULE],
      customFormItemOptions: {
        labelIcon: null,
      },
    },
  ],
  [UserRoles.PARTNER]: [
    {
      type: 'text',
      label: 'Ваше имя',
      placeholder: 'Имя',
      name: 'first_name',
      rules: [{ required: true }, SHARED_VALIDATION_RULE],
      customFormItemOptions: {
        labelIcon: null,
      },
    },
    {
      type: 'text',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      name: 'last_name',
      rules: [SHARED_VALIDATION_RULE],
      customFormItemOptions: {
        labelIcon: null,
      },
    },
    {
      type: 'text',
      label: 'Отчество (необязательно)',
      placeholder: 'Отчество',
      name: 'middle_name',
      rules: [SHARED_VALIDATION_RULE],
      customFormItemOptions: {
        labelIcon: null,
      },
    },
  ],
  [UserRoles.DREAMER]: [],
  [UserRoles.MODERATOR]: [
    {
      type: 'text',
      label: 'Ваше имя',
      placeholder: 'Имя',
      name: 'first_name',
      rules: [{ required: true }, SHARED_VALIDATION_RULE],
      customFormItemOptions: {
        labelIcon: null,
      },
    },
    {
      type: 'text',
      label: 'Фамилия (необязательно)',
      placeholder: 'Фамилия',
      name: 'last_name',
      rules: [SHARED_VALIDATION_RULE],
      customFormItemOptions: {
        labelIcon: null,
      },
    },
    {
      type: 'text',
      label: 'Отчество (необязательно)',
      placeholder: 'Отчество',
      name: 'middle_name',
      rules: [SHARED_VALIDATION_RULE],
      customFormItemOptions: {
        labelIcon: null,
      },
    },
  ],
};
