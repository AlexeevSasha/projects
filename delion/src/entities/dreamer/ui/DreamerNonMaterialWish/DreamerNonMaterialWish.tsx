import { type FC, useState } from 'react';
import { Flex, Form, Input } from 'antd';
import type { ModerationError } from '@entities/application/@x/dreamer';
import { FormBlock, ModerationErrorHint } from '@entities/application/@x/dreamer';
import type { DreamCategory } from '@entities/catalogue/@x/dreamer';
import { DreamSubcategorySelect, DreamThemeSelect } from '@entities/dreamer';
import { RULE_MAX_LENGTH, RULE_URL } from '@shared/const/rules';
import { useStores } from '@shared/lib';
import { PopupHint, StatusHint } from '@shared/ui';

interface Props {
  errors?: ModerationError;
}

export const DreamerNonMaterialWish: FC<Props> = ({ errors }) => {
  const [selected, setSelected] = useState<DreamCategory>();
  const {
    applicationS: { selectedDreamer },
  } = useStores();

  const disabled =
    selectedDreamer?.is_approved_moderation || (!selected && !selectedDreamer?.dream_category_id);

  return (
    <>
      <FormBlock errors={errors?.dream_category}>
        <DreamSubcategorySelect
          onChange={(value) => setSelected(value)}
          validateStatus={errors?.dream_category.length ? 'warning' : undefined}
          dreamCategoryId={2}
        />
        <ModerationErrorHint errors={errors?.dream_category} />
      </FormBlock>
      <FormBlock
        hints={
          <StatusHint text='Для нематериальных желаний следует указать тематику и детализацию тематики желания' />
        }
        errors={errors?.theme_specification}
      >
        <DreamThemeSelect errors={errors} disabled={disabled} />
      </FormBlock>
      <FormBlock
        hints={
          <StatusHint text='Опишите желание мечтателя. Например, «Иван мечтает посетить мастер-класс по программированию». Чем короче и яснее вы опишите желание, тем быстрее модераторы проверят заявку.' />
        }
      >
        <Flex justify={'space-between'}>
          <span>Описание мечты</span>
          <PopupHint
            title={
              <StatusHint
                borderless
                text='Для нематериальных желаний следует указать тематику и детализацию тематики желания'
              />
            }
          />
        </Flex>
        <Form.Item id='dream_description' rules={[RULE_MAX_LENGTH(500)]} name={'dream_description'}>
          <Input.TextArea placeholder='Опишите мечту' disabled={disabled} />
        </Form.Item>
        <Form.Item
          validateStatus={errors?.present_link_1.length ? 'warning' : undefined}
          name={'present_link_1'}
          id='present_link_1'
          label='Дополнительно можете прикрепить ссылку, при наличии'
          rules={[RULE_URL, RULE_MAX_LENGTH(500)]}
        >
          <Input placeholder='Ссылка' disabled={disabled} />
        </Form.Item>
        <ModerationErrorHint errors={errors?.present_link_1} />
      </FormBlock>
    </>
  );
};
