import type { Rule } from 'rc-field-form/lib/interface';
import { pluralize } from '@shared/lib';

export const RULE_MAX_LENGTH = (max: number): Rule => {
  return {
    max,
    message: `Поле не должно превышать ${max} ${pluralize(max, ['символ', 'символа', 'символов'])}`,
  };
};

export const RULE_FULL_NAME: Rule = {
  max: 100,
  message: 'Поле не должно превышать 100 символов',
};

export const RULE_REQUIRED: Rule = {
  required: true,
  message: 'Поле обязательно для заполнения',
};

export const RULE_FIO: Rule = {
  max: 100,
  message: 'Поле не должно превышать 100 символов',
};

export const RULE_URL: Rule = { type: 'url', message: 'Некорректный формат ссылки' };

export const RULE_PHONE: Rule = {
  pattern: /^\+7( \(9\d{2}\) \d{3}-\d{2}-\d{2}|9\d{9})$/,
  message: 'Укажите корректный номер телефона',
};
