import type { FormInstance } from 'antd/lib/form/hooks/useForm';
import type { FieldData, NamePath, ValidatorRule } from 'rc-field-form/es/interface';

export const mustBeGreaterOrEqualThan = (
  form: FormInstance,
  field: NamePath,
  msg: string,
): ValidatorRule => {
  return {
    validator: (_, value) => {
      const compValue = form.getFieldValue(field);
      if (value && compValue && value < compValue) {
        return Promise.reject(msg);
      }
      return Promise.resolve();
    },
  };
};

export const mustBeGreaterOrEqualThanDepend = (dependValue: number, msg: string): ValidatorRule => {
  return {
    validator: (_, value) => {
      if (value && dependValue && value < dependValue) {
        return Promise.reject(msg);
      }
      return Promise.resolve();
    },
  };
};

const patternValidator = (pattern: RegExp, msg: string): ValidatorRule => {
  return {
    validator: (_, value) => {
      if (value && !pattern?.test(value)) {
        return Promise.reject(msg);
      }
      return Promise.resolve();
    },
  };
};

export const valueRangeValidator = (
  minValue: number,
  maxValue: number,
  msg: string,
): ValidatorRule => {
  return {
    validator: (_, value) => {
      if (value < minValue || value > maxValue) {
        return Promise.reject(msg);
      }
      return Promise.resolve();
    },
  };
};

export const urlValidator = () => {
  const pattern =
    /^(https?:\/\/)?(?:www\.)?[-a-zA-Z\d@:%._+~#=]{1,256}\.[a-zA-Z\d()]{1,6}\b(?:[-a-zA-Z\d()@:%_+.~#?&=/]*)$/;
  const msg = 'Введите корректную ссылку';
  return patternValidator(pattern, msg);
};

export const vkValidator = () => {
  const pattern = /^(?:https?:\/\/)?(?:m\.)?vk\.(com|ru)\/\b[-a-zA-Z\d()@:%_+.~#?&=/]*$/;
  const msg = 'Введите корректную ссылку';
  return patternValidator(pattern, msg);
};

export const tgValidator = () => {
  const pattern = /^(?:https?:\/\/)?t(?:elegram)?\.me\/[-a-zA-Z\d._]+(\/\S*)?$/;
  const msg = 'Введите корректную ссылку';
  return patternValidator(pattern, msg);
};

export const clearFieldErrors = (form: FormInstance, fields: FieldData[]) => {
  const updatedFields = fields
    .filter((name) => form.getFieldError(name).length)
    .map((name) => ({ name, errors: [] }));
  form.setFields(updatedFields);
};
