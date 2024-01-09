import { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { useStores } from '@shared/lib';

export const DreamerInterestSelect = () => {
  const { catalogueS } = useStores();
  const [interests, setInterests] = useState<Option[]>([]);

  useEffect(() => {
    catalogueS.request.getDreamerInterests.request().then((res) => {
      setInterests(res?.data || []);
    });
  }, []);

  return (
    <Form.Item label='Чем интересуется мечтатель?' id='interest_ids' name={'interest_ids'}>
      <Select
        mode='multiple'
        showSearch={false}
        placeholder='Выберите категорию'
        options={interests}
      />
    </Form.Item>
  );
};
