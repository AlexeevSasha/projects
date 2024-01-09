import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Flex, Form, Select } from 'antd';
import { ModerationErrorHint, type ModerationError } from '@entities/application/@x/dreamer';
import { useStores } from '@shared/lib';
import { PopupHint, StatusHint } from '@shared/ui';

interface Props {
  errors?: ModerationError;
  disabled?: boolean;
}

export const DreamThemeSelect: FC<Props> = ({ errors, disabled = false }) => {
  const {
    catalogueS,
    applicationS: { selectedDreamer },
  } = useStores();
  const [themes, setThemes] = useState<Option[]>([]);
  const [themeId, setThemeId] = useState<number | undefined>(selectedDreamer?.theme_id);
  const [themesSpec, setThemesSpec] = useState<Option[]>([]);

  const { getDreamApplicationThemes, getDreamApplicationThemeSpecifications } = catalogueS.request;

  useEffect(() => {
    getDreamApplicationThemes.request().then((res) => {
      setThemes(res?.data || []);
    });
  }, []);

  useEffect(() => {
    getDreamApplicationThemeSpecifications.request({ data: { theme: themeId } }).then((res) => {
      setThemesSpec(res?.data || []);
    });
  }, [getDreamApplicationThemeSpecifications, themeId]);

  return (
    <>
      <Flex justify={'space-between'}>
        <span>Тематика желания</span>
        <PopupHint
          title={
            <StatusHint
              borderless
              text='Для нематериальных желаний следует указать тематику и детализацию тематики желания'
            />
          }
        />
      </Flex>
      <Form.Item id='theme_id' name={'theme_id'}>
        <Select
          disabled={disabled}
          options={themes}
          placeholder='Выберите тематику'
          onSelect={(value: number) => {
            setThemeId(value);
          }}
        />
      </Form.Item>
      <Form.Item
        validateStatus={errors?.theme_specification.length ? 'warning' : undefined}
        label='Детализация тематики желания'
        name={'theme_specification_id'}
        id='theme_specification_id'
      >
        <Select
          options={themesSpec}
          placeholder='Детализация тематики'
          disabled={disabled || !themeId}
        />
      </Form.Item>
      <ModerationErrorHint errors={errors?.theme_specification} />
    </>
  );
};
