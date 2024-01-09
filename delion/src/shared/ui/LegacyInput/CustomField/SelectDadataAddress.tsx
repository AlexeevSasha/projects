import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Select } from 'antd';
import type { FormInstance } from 'antd/lib/form/hooks/useForm';
import debounce from 'lodash/debounce';
import { useStores } from '@shared/lib';
import { Spinner } from '@shared/ui';
import type { FormFieldProps, FormProps, Option } from '@shared/ui/LegacyInput/model/form';

interface SelectDadataAddressFormFieldProps extends FormFieldProps {
  form: FormInstance;
  currentValue?: FormProps['formData'];
  // TODO put type for dadata getAddress request
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dadataFilterProps: any;
  onChange: (e: string) => void;
  suffix?: ReactNode;
}

export const SelectDadataAddress = (props: SelectDadataAddressFormFieldProps) => {
  const { dadataS } = useStores();
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');

  const { onChange, currentValue, dadataFilterProps, suffix, ...inputProps } = props;

  useEffect(() => {
    if (currentValue) {
      if (typeof currentValue === 'string') {
        setOptions([{ label: currentValue, value: currentValue }]);
      } else {
        setOptions([{ label: String(currentValue?.value), value: JSON.stringify(currentValue) }]);
      }
    }
  }, [currentValue]);

  useEffect(() => {
    if ((selectedValue !== search && search === '') || search === '') setSearch(selectedValue);
  }, [search, selectedValue]);

  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      // setOptions([]);
      setFetching(true);

      dadataS
        .fetchAddress({
          query: value,
          ...dadataFilterProps,
        })
        .then(() => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return;
          }
          if (dadataS.request.fetchAddress.result.status) {
            if (value !== '')
              setOptions(
                // TODO: 04.09.2023: Get rid of any
                (dadataS.request.fetchAddress.result.data as { value: string }[]).map((item) => {
                  return { label: item.value, value: JSON.stringify(item) };
                }),
              );
          } else {
            setOptions([]);
          }
          setFetching(false);
        });
    };

    return debounce(loadOptions, 300);
  }, [dadataS.request.fetchAddress, 300]);

  return (
    <div style={{ position: 'relative' }}>
      <Select
        {...inputProps}
        onSearch={(value) => {
          setSearch(value);
          debounceFetcher(value);
        }}
        searchValue={search}
        filterOption={false}
        showSearch
        suffixIcon={null}
        notFoundContent={fetching ? <Spinner /> : search ? <div>Данный адрес не найден</div> : null}
        options={options}
        onChange={(e) => {
          if (typeof e === 'string') {
            setSelectedValue(JSON.parse(e)?.value);
            onChange(JSON.parse(e));
          } else {
            setSelectedValue('');
            onChange('');
          }
        }}
      />
      <div style={{ position: 'absolute', top: '25%', right: 16 }}>{suffix}</div>
    </div>
  );
};
