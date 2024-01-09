import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { FormInstance, FormItemProps } from 'antd';
import { AutoComplete, Form, Input } from 'antd';
import { delay } from 'lodash';
import { useStores } from '@shared/lib';
import type { Dadata, DadataRequest, LocationNames } from '@shared/model';
import css from './DadataAutoComplete.module.scss';

interface Props extends FormItemProps {
  form: FormInstance;
  defaultValue?: string;
  // ограничения по типу локации
  to_bound?: LocationNames | 'house-flat' | 'street-flat';
  from_bound?: LocationNames;
  placeholder?: string;
  disabled?: boolean;

  required?: boolean;
  resetFlag?: boolean;
}

export const DadataAutoComplete: FC<Props> = ({
  name,
  defaultValue = '',
  form,
  to_bound,
  from_bound = to_bound,
  placeholder,
  disabled,
  required = false,
  resetFlag,
  rules = [],
  ...rest
}) => {
  const [regions, setRegions] = useState<Dadata[]>([]);
  const [search, setSearch] = useState('');
  const [value, setValue] = useState('');
  const { dadataS } = useStores();

  rules = required ? [...rules, { required: true, message: 'Выберите город из списка' }] : rules;

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue, resetFlag]);

  const getDadata = useCallback(() => {
    const request: DadataRequest = {
      query: search,
      to_bound: {
        value: to_bound,
      },
      from_bound: {
        value: from_bound,
      },
    };

    !search
      ? setRegions([])
      : dadataS.fetchAddress(request).then((res) => {
          setRegions(res);
        });
  }, [search, to_bound, from_bound, dadataS]);

  useEffect(() => {
    if (!search.length) return;

    const timeout = delay(getDadata, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [getDadata, search]);

  const handleChange = useCallback(
    (value: string) => {
      setValue(value);
      form.setFieldValue(name, null);
    },
    [form, name],
  );

  return (
    <div className={css.container}>
      <Form.Item id={name} name={name} rules={rules} {...rest}>
        <Input disabled={disabled} style={{ display: 'none' }} />
      </Form.Item>
      <AutoComplete
        disabled={disabled}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={css.container__autoComplete}
        options={regions}
        onSelect={(_, dadata) => {
          setValue(dadata.value);

          form.setFieldValue(name, dadata);
          form.validateFields([name]);
        }}
        onBlur={() => required && form.validateFields([name])}
        onSearch={(value) => setSearch(value)}
      />
    </div>
  );
};
