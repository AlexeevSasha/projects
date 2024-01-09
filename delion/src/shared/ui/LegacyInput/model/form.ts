import type * as React from 'react';
import type { HTMLInputTypeAttribute, Key, ReactElement, ReactNode } from 'react';
import type { SizeType } from '@ant-design/pro-form/es/BaseForm';
import type {
  ColProps,
  CountdownProps,
  FormItemProps,
  InputNumberProps,
  RadioGroupProps,
  RowProps,
  SelectProps,
} from 'antd';
import type { UploadProps, UploadType } from 'antd/es/upload/interface';
import type { FormInstance } from 'antd/lib/form/hooks/useForm';
import type { NamePath, Store } from 'antd/lib/form/interface';
import type { Rule } from 'rc-field-form/lib/interface';
import type { VerificationInputProps } from 'react-verification-input';
import type { CustomButtonsProps } from '../CustomButton';
import type { MaskedInputProps } from '../CustomField/MaskedInput';
import type { InputFormFieldProps } from '../Input';

declare const CustomButtonTypes: readonly [
  'default',
  'primary',
  'secondary',
  'dashed',
  'link',
  'url',
  'text',
  'success',
  'error',
];

export interface FormButtonsProps extends CustomButtonsProps {
  title?: string;
  typeVisibly?: 'success' | 'cancel' | 'custom';
  mobileFlex?: 'none' | 'auto';
  mobileTitle?: React.ReactNode | string;
}

export type CustomButtonType = (typeof CustomButtonTypes)[number];
export type Option = { label: string; value: unknown };

export interface NestedFormProps {
  form?: FormInstance;
  name?: string;
  title?: string;
  fields?: (FormFieldProps | FormContent)[];
  fieldRows?: FormFieldRowsProps[];
  fieldCols?: ColFieldProps[];
}

export interface ColFieldProps {
  fieldRows?: FormFieldRowsProps[];
  colProps?: ColProps;
}

export interface FormProps {
  /** Instance формы, нужен для последующих манипуляций с формой внутри компонентов */
  form: FormInstance;
  /** Содерживое формы, для заполнения  текущими данными, заполняется при необходимости */
  formData?: Store;
  /** Кнопки, обязательно добавлять кнопку с типом 'success'*/
  btnList: Array<Array<React.ReactNode>>;
  btnJustify: RowProps['justify'];
  /** Обычная форма */
  // fields?: FormFieldProps[],
  // fieldRows?: FormFieldRowsProps[],
  /** Форма, которая поделена на блоки */
  forms?: NestedFormProps[];
  /** Сброс значений, обязательно для формы фильтров*/
  onReset?: () => void;

  onSubmit(e: unknown): void;

  /** Обратный отсчёт */
  countdown?: CountdownProps;
}

export interface FormFieldRowsProps {
  fields: FormFieldProps[];
  customFieldsForm?: React.ReactNode;
}

export interface FileUploadSetting extends UploadProps {
  acceptTypes?: string[];
}

interface FormContent {
  /** Контент вместо поля */
  content: React.ReactNode;
}

export interface MolMask {
  mask: string;
  maskError?: string;
  pattern?: RegExp;
}

export interface ArrayInputProps {
  minItemsCount?: number;
  maxItemsCount?: number;
  addButtonLabel?: string;
}

interface TooltipProps {
  text: string | React.ReactNode;
}

export interface FormFieldProps {
  extra?: FormItemProps['extra'];
  value?: unknown;
  name: string;
  fullName?: NamePath;
  type: UploadType | HTMLInputTypeAttribute;
  label?: string | React.ReactNode;
  hidden?: boolean;
  size?: SizeType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (e: any) => void;
  tooltip?: TooltipProps;
  /** Устанавливаются правила для валидации поля */
  rules?: Rule[];
  /** Маска, используется с типом компонента TEXT */
  mask?: MolMask;
  placeholder?: string;
  disabled?: boolean;
  /** Поля выбора для компонента SELECT */
  options?: SelectProps['options'];
  fieldNames?: SelectProps['fieldNames'];
  loading?: SelectProps['loading'];
  hasOther?: boolean;
  onSearch?: SelectProps['onSearch'];
  /** Просмотр количества введенных символов */
  showCount?: boolean;
  maxLength?: number;
  minLength?: number;
  /** Настроки для загрузки файлов */
  allowClear?: boolean;
  fileUploadSetting?: FileUploadSetting;
  /** Настройки для поля DATE */
  format?: string;
  showTime?: object;
  // TODO add type
  // eslint-disable-next-line
  dateProps?: any;
  /** Настройки для поля NUMBER */
  inputNumberProps?: InputNumberProps;
  phoneInputProps?: Partial<MaskedInputProps>;
  radioGroupProps?: Partial<RadioGroupProps>;
  /** Настройки для поля DateYear */
  // TODO add type
  // eslint-disable-next-line
  dateYearProps?: any;
  /** Настройки для поля Array (множество полей) */
  arrayInputParams?: ArrayInputProps;
  /** Настройки для поля Array (множество полей) */
  urlType?: 'vk' | 'tg';

  /** Вложенная форма */
  forms?: NestedFormProps[];
  /** Параметры отображения поля на различных экранах */
  colProps?: ColProps;
  /** Название кнопки для добавления нового элемента группы */
  addFormButtonName?: string;
  /** Список полей, от которых зависит занчение или отображение данного поля */
  dependsOn?: string[];
  /** Значение, которое присваивается полю после изменения поля, от которого оно зависит */
  // TODO add type
  // eslint-disable-next-line
  resetValue?: any;
  /** Дополнительные параметры для поля типа Select
   * ВАЖНЫЙ МОМЕНТ: пока в фильтрах для Select нужно обязательно указывать labelInValue: true,
   * чтобы теги нормально подхватывались*/
  // TODO: убрать обязательность labelInValue: true для фильров
  selectProps?: SelectProps;
  /** Дополнительные параметры для Form.Item обертки */
  customFormItemOptions?: FormItemProps & { labelIcon?: ReactElement | null };
  dadataFilterProps?: FilterFormProps;
  content?: ReactNode;

  /** Функция зависимости
   * На вход получет список значений полей от которых зависит данное, в указанном в dependsOn порядке
   * На выход предоставляются параметры данного поля */
  dependencyFunc?(value: unknown): Partial<InputFormFieldProps>;

  /** Функция получения списка элементов для поля типа Select
   * На вход получет список значений полей от которых зависит данное, в указанном в dependsOn порядке
   * На выход предоставляются список значений для выпадающего списка */
  getOptions?(value?: Option['value']): Promise<Option[]>;
  /** Колбек на успешную валидацию по маске MaskedInput'a */
  onImmidateValidation?(isValid: boolean): void;
  validateTriggers?: string[];

  verificationCodeInputProps?: VerificationInputProps;
}

export interface FormAdaptiveFieldProps extends FormFieldProps {
  /** Можно указать размер столбца от 1 до 24, по дефолту 8 */
  colLength?: number;
}

// TODO add type
export interface FilterFormProps {
  form: FormInstance;
  formData?: FormData;
  // eslint-disable-next-line
  defaultFilters?: any;
  forms: FormProps['forms'];
  setFilterFields: (e: unknown) => void;
  // eslint-disable-next-line
  filterFields: any;
  search?: {
    label: string;
  };
  loading: boolean;
}

export type TableFooterFormProps = {
  actions?: {
    options: FormFieldProps['options'];
    handleFormFinish: (arg: unknown) => void;
    isVisible: boolean;
  };
  selectedRows: Key[];
  children?: React.ReactNode;
};
