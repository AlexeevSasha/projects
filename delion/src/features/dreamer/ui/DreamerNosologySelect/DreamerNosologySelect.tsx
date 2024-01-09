import { useEffect, useState } from 'react';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { useStores } from '@shared/lib';

export const DreamerNosologySelect = (props: SelectProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const { catalogueS } = useStores();

  useEffect(() => {
    catalogueS.request.getNosologies.request().then((res) => {
      setOptions(res?.data || []);
    });
  }, []);

  return (
    <Select
      mode='multiple'
      placeholder='Выберите нозологию'
      showSearch={false}
      options={options}
      {...props}
    />
  );
};
