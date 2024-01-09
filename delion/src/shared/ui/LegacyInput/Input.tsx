import type { CSSProperties, ElementType, FC, FocusEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import {
  Checkbox,
  Col,
  DatePicker,
  Form as FormAntd,
  Grid,
  Input as InputAntd,
  InputNumber,
  Radio,
  Rate,
  Select,
  Skeleton,
  theme,
  Tooltip,
} from 'antd';
import type { InputNumberProps, RateProps } from 'antd';
import type { useWatch } from 'antd/es/form/Form';
import type { TextAreaProps } from 'antd/es/input';
import type { BaseOptionType } from 'antd/es/select';
import type { SelectProps } from 'antd/lib';
import dayjs from 'dayjs';
import { isNil } from 'lodash';
import debounce from 'lodash/debounce';
import { observer } from 'mobx-react';
import { OTHER_TEXT, OTHER_TEXT_VALUE } from '@shared/const';
import { tgValidator, urlValidator, vkValidator } from '@shared/lib';
import { Spinner } from '@shared/ui';
import type { MaskedInputProps } from './CustomField/MaskedInput';
import { MaskedInput } from './CustomField/MaskedInput';
import { SelectDadataAddress } from './CustomField/SelectDadataAddress';
import { UploadDragger } from './CustomField/UploadDragger';
import { VerificationCode } from './CustomField/VerificationCode';
import { YearPicker } from './CustomField/YearPicker';
import { FormItem } from './FormItem';
import css from './Input.module.scss';
import type { FormFieldProps, FormProps } from './model/form';

const { RangePicker } = DatePicker;

export interface InputFormFieldProps extends FormFieldProps {
  form?: FormProps['form'];
  currentValue?: FormProps['formData'];
}

const VERIFICATION_CODE_DEFAULT_LENGTH = 4;

export const Input: FC<InputFormFieldProps> = observer((props) => {
  const {
    label,
    name,
    fullName,
    type,
    hidden,
    fileUploadSetting,
    inputNumberProps,
    phoneInputProps,
    radioGroupProps,
    dateProps,
    dateYearProps,
    selectProps,
    form,
    currentValue,
    options,
    dependencyFunc,
    getOptions,
    dependsOn,
    hasOther,
    onSearch,
    urlType,
    tooltip,
    dadataFilterProps,
    validateTriggers,
    onImmidateValidation,
    ...rest
  } = props;

  let { customFormItemOptions, mask, rules = [], colProps, ...inputProps } = rest;
  let Widget: ElementType = InputAntd;
  let customWidgetOptions = {};
  let contentInWidget = undefined;
  let labelIcon = undefined;
  const dependWatch: (typeof useWatch)[] = [];
  let selectOptions: InputFormFieldProps['options'] = [];
  let validateTrigger = validateTriggers;

  const [additionalProps, setAdditionalProps] = useState<Partial<InputFormFieldProps>>();
  const [customOptions, setCustomOptions] = useState(options);
  const [isHidden, setIsHidden] = useState(hidden);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [status, setStatus] = useState('');

  const fieldWatch = FormAntd.useWatch(name, form);

  const breakpoints = Grid.useBreakpoint();
  const {
    token: { size, colorPrimary, colorPrimaryBg, colorBgLayout },
  } = theme.useToken();

  const getSameLevelFieldName = (fieldName: string) => {
    return (fullName as (string | number)[]).slice(0, -1).concat([fieldName]);
  };

  if (dependsOn) {
    dependsOn.forEach((dependField) => {
      dependWatch.push(FormAntd.useWatch(getSameLevelFieldName(dependField), form));
    });
  }

  // TODO: Добавлено для сброса ошибок с бека для полей select,
  //  возможно нужно переписать,
  //  либо оставить, если все работает корректно
  //  Нужно учесть что могут сломаться другие поля!!!

  useEffect(() => {
    if (!form) return;

    form.setFields([{ name }]);
  }, [fieldWatch]);

  useEffect(() => {
    const newAdditionalProps = dependencyFunc && dependencyFunc(dependWatch);
    if (getOptions) {
      setIsLoading(true);
      setCustomOptions([]);
      try {
        getOptions(dependWatch)
          .then((res) => {
            // @ts-ignore
            setCustomOptions(res);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (e) {
        setIsLoading(false);
      }
    }
    setAdditionalProps(newAdditionalProps);
    newAdditionalProps?.hidden !== undefined && setIsHidden(newAdditionalProps?.hidden); //todo change

    if (form && form.isFieldsTouched()) {
      if (newAdditionalProps?.resetValue !== undefined) {
        form.setFields([{ name: fullName, value: newAdditionalProps?.resetValue, errors: [] }]);
      }
    }
    delete newAdditionalProps?.resetValue;
  }, []);

  useEffect(() => {
    if (!form) return;
    /** Валидация поля после изменения значения поля, от которого оно зависит.
     * Добавлено из-за того, что при добавлении на триггер изменения значения сравнивалось с предыдущим значением.
     * Возможно понадобится добавление флага необходимости принудительной валидации, чтобы не делать ее лишний раз */
    if (fullName && form.isFieldTouched(fullName)) {
      form.validateFields([fullName]);
    }
  }, [fullName, form]);

  useEffect(() => {
    /** Получение данных для селекта с бэкенда.*/
    if (onSearch) {
      setIsSearching(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onSearch(searchValue).then((res) => {
        setCustomOptions(res);
        setIsSearching(false);
      });
    }
  }, [searchValue]);

  const InputTooltip = observer(({ title }: { title: ReactNode }) => {
    return (
      <Tooltip title={title}>
        <InfoCircleOutlined style={{ color: colorPrimary, opacity: 0.75 }} />
      </Tooltip>
    );
  });

  if (['select', 'multipleSelect'].indexOf(type) !== -1) {
    selectOptions = customOptions?.length ? customOptions : options ? options : [];
    selectOptions =
      selectOptions && hasOther
        ? [...selectOptions, { value: OTHER_TEXT_VALUE, label: OTHER_TEXT }]
        : selectOptions;
  }

  const handleSearch = debounce((value) => {
    setSearchValue(value);
  }, 300);

  const setMaskInputOptions = () => {
    const isRequired = rules
      ? rules.filter((rule) => rule.hasOwnProperty('required') && rule).length > 0
      : false;

    rules = [
      ...(rules || []),
      {
        validator: (_, value) => {
          if (!value && isRequired) {
            setStatus('error');
            return Promise.reject('');
          }

          const isValid = !value || (mask?.pattern && mask?.pattern?.test(value));

          onImmidateValidation?.(Boolean(isValid));

          if (isValid) {
            return Promise.resolve();
          } else {
            return Promise.reject(mask?.maskError ?? `Введите данные в формате ${mask?.mask}`);
          }
        },
      },
    ];

    const handleStatusChange = (newValue: string) => {
      setStatus(newValue);
    };

    customWidgetOptions = {
      ...customWidgetOptions,
      mask: mask?.mask,
      molPattern: mask?.pattern,
      molForm: form,
      fullName: fullName,
      status,
      handleStatusChange: handleStatusChange,
    } as MaskedInputProps;

    (customWidgetOptions as MaskedInputProps).onFocus = () => {
      setStatus('');
    };
    (customWidgetOptions as MaskedInputProps).onBlur = () => {
      if (!form) return;

      const value = form.getFieldValue(fullName);
      if (value) {
        if (mask?.pattern && !mask?.pattern?.test(value)) {
          setStatus('error');
          if (!form.getFieldError(fullName).length) {
            form.setFields([
              {
                name: fullName,
                errors: [mask?.maskError ?? `Введите данные в формате ${mask?.mask}`],
              },
            ]);
          }
        } else {
          setStatus('');
        }
      } else {
        if (isRequired) {
          setStatus('error');
          form.setFields([
            {
              name: fullName,
              errors: ['Обязательное поле'],
            },
          ]);
        }
      }
    };
  };

  if (isHidden) return <></>;

  switch (type) {
    case 'childForm':
      break;
    case 'email':
      Widget = InputAntd;
      rules = [
        ...rules,
        {
          type: 'email',
          message: 'Введите корректный e-mail',
        },
      ];
      break;
    case 'password':
      Widget = InputAntd.Password;
      rules = rules.some((rule) => rule?.hasOwnProperty('min'))
        ? [...rules]
        : [
            {
              min: 8,
              message: 'Минимальная длина пароля 8 символов',
            },
            ...rules,
          ];
      break;
    case 'checkbox':
      Widget = Checkbox;
      customFormItemOptions = {
        ...customFormItemOptions,
        valuePropName: 'checked',
        label: undefined,
      };
      contentInWidget = label;
      colProps = {
        ...colProps,
        style: breakpoints.md ? { display: 'flex', alignItems: 'end' } : {},
      };
      break;
    case 'date':
      Widget = DatePicker;
      customWidgetOptions = {
        format: inputProps.format || 'DD.MM.YYYY',
        placeholder: inputProps.placeholder || 'дд.мм.гггг',
        style: { width: '100%' },
        ...dateProps,
      };
      break;
    case 'datetime':
      Widget = DatePicker;
      customWidgetOptions = {
        format: 'DD.MM.YYYY HH:mm',
        style: { width: '100%' },
        showTime: { format: 'HH:mm' },
        ...dateProps,
      };
      break;
    case 'dateYearPicker':
      Widget = DatePicker;
      customWidgetOptions = {
        format: 'YYYY',
        style: { width: '100%' },
        picker: 'year',
        ...dateProps,
      };
      break;
    case 'dateYear':
      Widget = YearPicker;
      customWidgetOptions = {
        minValue: 1965,
        maxValue: dayjs().year(),
        ...dateYearProps,
      };
      break;
    case 'dateRange':
      Widget = RangePicker;
      customWidgetOptions = {
        format: inputProps.format || 'DD.MM.YYYY',
        placeholder: inputProps.placeholder || ['дд.мм.гггг', 'дд.мм.гггг'],
        style: { width: '100%' },
        allowEmpty: [true, true],
        ...dateProps,
      };
      break;
    case 'radiogroup':
      Widget = Radio.Group;
      customWidgetOptions = { ...radioGroupProps };
      contentInWidget =
        options?.map((item, i) => (
          <Radio key={i} value={item.value}>
            {item.label}
          </Radio>
        )) || [];
      break;
    case 'select':
      Widget = Select;
      customWidgetOptions = {
        options: selectOptions,
        showSearch: true,
        onSearch: handleSearch,
        allowClear: true,
        notFoundContent: isSearching ? <Spinner /> : undefined,
        filterOption: (input, option) =>
          (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase()),
        ...selectProps,
      } as SelectProps;
      break;
    case 'multipleSelect':
      Widget = Select;
      customWidgetOptions = {
        mode: 'multiple',
        maxTagCount: 'responsive',
        optionFilterProp: 'label',
        showSearch: true,
        onSearch: handleSearch,
        options: selectOptions,
        allowClear: true,
        onChange: (e: SelectProps['onChange']) => {
          setSearchValue('');
          if (inputProps.onChange) {
            inputProps.onChange(e);
          }
        },
        onBlur: () => setSearchValue(''),
        notFoundContent: isLoading ? <Spinner /> : undefined,
        filterOption: (input: string, option: BaseOptionType) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
        ...selectProps,
      };
      break;
    case 'textarea':
      Widget = InputAntd.TextArea;
      customWidgetOptions = {
        onBlur: (e) => {
          form?.setFieldValue(fullName, e.target.value.trim());
          form?.validateFields([fullName]);
        },
      } as TextAreaProps;
      break;
    case 'number':
      Widget = InputNumber;
      customWidgetOptions = {
        style: '100%',
        ...inputNumberProps,
        ...customWidgetOptions,
      } as InputNumberProps;
      validateTrigger = ['onChange', 'onSubmit'];
      break;
    case 'file':
      Widget = UploadDragger;
      labelIcon = <ExclamationCircleOutlined style={{ color: '#009a8e' }} />;
      customWidgetOptions = { fileUploadSetting: fileUploadSetting, form, name };
      break;
    case 'selectDadataSettlement':
      Widget = SelectDadataAddress;
      customWidgetOptions = {
        form,
        name,
        currentValue,
        dadataFilterProps: {
          from_bound: { value: 'city' },
          to_bound: { value: 'settlement' },
          ...dadataFilterProps,
        },
      };
      break;
    case 'selectDadataAddress':
      Widget = SelectDadataAddress;
      customWidgetOptions = {
        form,
        name,
        currentValue,
        dadataFilterProps,
      };
      rules = [
        ...rules,
        {
          validator: (_, value) => {
            if (value && !value?.data?.house) {
              return Promise.reject(`Пожалуйста, укажите адрес с точностью до квартиры или дома.`);
            }
            return Promise.resolve();
          },
        },
      ];
      break;
    case 'rate':
      Widget = Rate;
      customWidgetOptions = {
        form,
        name,
        currentValue,
        allowClear: false,
        className: 'rate-input',
        character: ({ index = 0, value = 0 }) => {
          let rateStyle: CSSProperties = {
            padding: breakpoints.md ? size : 14,
            border: `1px solid ${colorBgLayout}`,
            borderRadius: 4,
          };
          let IconWidget;
          if (index < value) {
            rateStyle = {
              ...rateStyle,
              backgroundColor: colorPrimaryBg,
            };
            IconWidget = StarFilled;
          } else {
            IconWidget = StarOutlined;
          }
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center',
              }}
            >
              <div style={rateStyle}>
                <IconWidget />
              </div>
              <div style={{ color: 'black' }}>{index + 1}</div>
            </div>
          );
        },
      } as RateProps;
      customFormItemOptions = {
        ...customFormItemOptions,
        label: undefined,
      };
      break;
    case 'phone':
      Widget = MaskedInput;
      mask = mask ?? {
        mask: '+7 (000) 000-0000',
        maskError: 'Введите корректный номер телефона',
        pattern: /^\+7 \(9\d{2}\) \d{3}-\d{4}$/,
      };
      inputProps.placeholder = inputProps?.placeholder ?? '+7 (___) ___-____';

      customWidgetOptions = {
        ...customWidgetOptions,
        ...phoneInputProps,
        className: 'mol-masked-input',
      };
      setMaskInputOptions();
      break;
    case 'url': {
      Widget = InputAntd;
      const urlValidators = (urlType: FormFieldProps['urlType']) => {
        switch (urlType) {
          case 'tg':
            return tgValidator();
          case 'vk':
            return vkValidator();
          default:
            return urlValidator();
        }
      };
      rules = [...(rules || []), urlValidators(urlType)];
      inputProps.maxLength = inputProps.maxLength ?? 200;
      break;
    }
    case 'verificationCode': {
      Widget = VerificationCode;

      customWidgetOptions = {
        length: VERIFICATION_CODE_DEFAULT_LENGTH,
        placeholder: '',
        autoFocus: true,
        validChars: '0-9',
        inputProps: {
          inputMode: 'numeric',
        },
        classNames: {
          container: css.verificationCodeContainer,
          character: css.verificationCodeCharacter,
          characterSelected: css.verificationCodeCharacterSelected,
          ...inputProps.verificationCodeInputProps?.classNames,
        },
        ...inputProps.verificationCodeInputProps,
      };
      break;
    }
    default:
      if (isNil(mask)) {
        Widget = InputAntd;
        customWidgetOptions = {
          onBlur: (e: FocusEvent<HTMLInputElement>) => {
            if (!form) return;
            form.setFieldValue(fullName, e.target.value.trim());
            form.validateFields([fullName]);
          },
        };
        inputProps.maxLength = inputProps.maxLength ?? 255;
      } else {
        Widget = MaskedInput;
        customWidgetOptions = {
          className: 'mol-masked-input',
        };
        setMaskInputOptions();
      }
  }

  if (tooltip) {
    customWidgetOptions = {
      suffix: <InputTooltip title={tooltip.text} />,
      ...customWidgetOptions,
    };
  }

  return (
    <Col {...colProps}>
      <FormItem
        label={label}
        labelIcon={labelIcon}
        name={name}
        rules={additionalProps?.rules || rules}
        validateTrigger={validateTrigger ?? ['onBlur', 'onSubmit']}
        {...customFormItemOptions}
      >
        {!isLoading ? (
          <Widget {...inputProps} {...customWidgetOptions} {...additionalProps}>
            {contentInWidget}
          </Widget>
        ) : (
          <Skeleton.Input style={{ width: '100%' }} active={true} />
        )}
      </FormItem>
    </Col>
  );
});
