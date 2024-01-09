// functions for FormFilter (maybe don't need)
import type { FormInstance, UploadFile } from 'antd';
import type { Store } from 'antd/es/form/interface';
import type { Dayjs } from 'dayjs';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import type { FilterFormProps, FormFieldProps, FormProps } from '@shared/ui/LegacyInput/model/form';

const getFileFieldValue = (fieldValue: UploadFile | UploadFile[], maxCount = 1) => {
  try {
    if (fieldValue) {
      if (Array.isArray(fieldValue)) {
        if (maxCount > 1) {
          return fieldValue.map((file) => file.response?.id);
        }
        return fieldValue[0].response?.id;
      } else {
        return fieldValue.response?.id;
      }
    }

    return undefined;
  } catch (e) {
    console.log('getFileFieldValue', e);
    return undefined;
  }
};

const getDateFieldValue = (fieldValue: Dayjs) => {
  try {
    return fieldValue.format('YYYY-MM-DD');
  } catch (e) {
    console.log('getDateFieldValue', e);
    return fieldValue;
  }
};

const getDateTimeFieldValue = (fieldValue: Dayjs) => {
  try {
    return fieldValue.format('YYYY-MM-DD HH:mm');
  } catch (e) {
    return fieldValue;
  }
};

export const getFormFields = (forms?: FormProps['forms']): FormFieldProps[] => {
  /** Получение полей формы */
  let formFields: FormFieldProps[] = [];
  const cols = forms?.flatMap(({ fieldCols }) => fieldCols).filter((item) => item !== undefined);

  formFields = formFields?.concat(
    // @ts-ignore
    (cols?.length ? cols : forms)
      // @ts-ignore
      ?.flatMap(({ fieldRows }) => fieldRows)
      ?.flatMap(({ fields }) => fields),
  );
  return formFields.filter((field) => field);
};

export const getFormValues = (
  { forms }: FormProps | FilterFormProps,
  formData?: FormProps['formData'],
  isDisabledFilter: boolean = false,
  isFilterForm: boolean = false,
) => {
  let formFields: FormFieldProps[] = getFormFields(forms);
  const formValues: Record<string, unknown> = {};
  if (isDisabledFilter) {
    formFields = formFields.filter((field) => !field.disabled);
  }
  if (isFilterForm) formFields?.push({ name: 'search', type: 'text' });
  formFields?.forEach((field) => {
    if (!formData || !formData.hasOwnProperty(field.name)) return;
    switch (field.type) {
      case 'date':
        formValues[field.name] = formData[field.name]
          ? getDateFieldValue(formData[field.name])
          : formData.get(field.name);
        break;
      case 'datetime':
        formValues[field.name] = formData[field.name]
          ? getDateTimeFieldValue(formData[field.name])
          : formData[field.name];
        break;
      case 'dateYearPicker':
        formValues[field.name] = formData[field.name]
          ? getDateFieldValue(formData[field.name])
          : formData[field.name];
        break;
      case 'dateRange':
        if (formData[field.name]?.length == 2) {
          const value = formData[field.name];
          if (value[0]) formValues[`${field.name}_after`] = getDateFieldValue(value[0]);
          if (value[1]) formValues[`${field.name}_before`] = getDateFieldValue(value[1]);
        } else {
          formValues[`${field.name}_after`] = undefined;
          formValues[`${field.name}_before`] = undefined;
        }
        if (isFilterForm) {
          formValues[field.name] = formData[field.name];
        }
        formData[field.name] = undefined;
        break;
      case 'file': {
        const fieldName_ID =
          field.fileUploadSetting?.maxCount && field.fileUploadSetting.maxCount > 1
            ? `${field.name}_ids`
            : `${field.name}_id`;
        formValues[fieldName_ID] = getFileFieldValue(
          formData[field.name],
          field.fileUploadSetting?.maxCount,
        );
        break;
      }
      case 'select':
        formValues[field.name] =
          formData[field.name] !== undefined
            ? formData[field.name]?.value !== undefined
              ? formData[field.name]?.value
              : formData[field.name]
            : undefined;
        break;
      case 'multipleSelect':
        formValues[field.name] =
          formData[field.name] === undefined
            ? []
            : formData[field.name].map((val: Store) => val.value || val);
        break;
      case 'selectDadataSettlement':
        if (isFilterForm)
          formValues[field.name] = formData[field.name]?.data?.fias_id || formData[field.name];
        else formValues[field.name] = formData[field.name];
        break;
      default:
        if (field.name) {
          formValues[field.name] =
            formData[field.name] === '' || formData[field.name] === undefined
              ? null
              : formData[field.name];
        }
        break;
    }
  });
  return formValues;
};

export const getValidValuesOnly = async (form: FormInstance) => {
  try {
    return await form.validateFields({ validateOnly: true });
  } catch (error) {
    if (!error) return;

    if (
      typeof error === 'object' &&
      error?.hasOwnProperty('errorFields') &&
      error?.hasOwnProperty('values')
    ) {
      const { values, errorFields } = error as ValidateErrorEntity;

      errorFields.forEach(({ name }) => {
        delete values[name.join('')];
      });

      return values;
    }

    throw Error('unknown error');
  }
};
