import { useState, type FC } from 'react';
import { Button, Flex, Form, Grid, Input } from 'antd';
import type { ModerationError } from '@entities/application/@x/dreamer';
import { FormBlock, ModerationErrorHint } from '@entities/application/@x/dreamer';
import type { DreamCategory } from '@entities/catalogue/@x/dreamer';
import type { DreamerKnowledgeKey } from '@shared/const';
import { RULE_MAX_LENGTH, RULE_URL } from '@shared/const/rules';
import { useStores } from '@shared/lib';
import { StatusHint } from '@shared/ui';
import { DreamSubcategorySelect } from '../DreamCategorySelect/DreamCategorySelect';

interface Props {
  errors?: ModerationError;
  onKnowledgeClick: (name: DreamerKnowledgeKey) => void;
}

export const DreamerMaterialWish: FC<Props> = ({ errors, onKnowledgeClick }) => {
  const {
    applicationS: { selectedDreamer },
  } = useStores();
  const [dreamCategory, setDreamCategory] = useState<DreamCategory>();
  const breakpoint = Grid.useBreakpoint();

  const disabled =
    selectedDreamer?.is_approved_moderation ||
    (!dreamCategory && !selectedDreamer?.dream_category_id);

  return (
    <Flex vertical gap={12}>
      <FormBlock
        errors={errors?.theme_specification}
        hints={[
          <StatusHint
            key={'material-warning'}
            status={'warning'}
            text='В этом году сумма подарка не может превышать 20 000 ₽ для общих категорий, и 30 000 ₽ для подарков из категории музыкальных инструментов и спортивного инвентаря'
          />,
          !!dreamCategory && (
            <StatusHint key={'wish-subcategory-info'} title={dreamCategory?.hint} />
          ),
          <StatusHint key={'material-link-knowledge'} title='Как прикрепить подарок?'>
            <Button
              onClick={() => onKnowledgeClick('giftInstruction')}
              style={{ zIndex: 1 }}
              disabled={false}
              size={'small'}
            >
              Читать инструкцию
            </Button>
          </StatusHint>,
        ]}
      >
        <DreamSubcategorySelect
          validateStatus={errors?.theme_specification.length ? 'warning' : undefined}
          dreamCategoryId={1}
          onChange={(category) => setDreamCategory(category)}
        />
        {!breakpoint.md && (
          <StatusHint
            key={'material-warning'}
            status={'warning'}
            text='В этом году сумма подарка не может превышать 20 000 ₽ для общих категорий, и 30 000 ₽ для подарков из категории музыкальных инструментов и спортивного инвентаря'
          />
        )}
      </FormBlock>
      <FormBlock errors={errors?.present_link_1}>
        <Form.Item
          validateStatus={errors?.present_link_1.length ? 'warning' : undefined}
          label='Ссылка на подарок из одного интернет-магазина'
          extra='В качестве источника подойдут Ozon, Wildberries, Спортмастер, Детский мир, DNS, М.Видео или Леонардо'
          name={'present_link_1'}
          id='present_link_1'
          rules={[RULE_URL, RULE_MAX_LENGTH(500)]}
        >
          <Input placeholder='Ссылка' disabled={disabled} />
        </Form.Item>
        <ModerationErrorHint errors={errors?.present_link_1} />
      </FormBlock>

      <FormBlock errors={errors?.present_link_2}>
        <Form.Item
          validateStatus={errors?.present_link_2.length ? 'warning' : undefined}
          label='Ссылка на подарок из другого интернет-магазина'
          extra='Подарок должен быть одинаковым на обоих ресурсах'
          name={'present_link_2'}
          id='present_link_2'
          rules={[RULE_URL, RULE_MAX_LENGTH(500)]}
        >
          <Input placeholder='Ссылка' disabled={disabled} />
        </Form.Item>
        <ModerationErrorHint errors={errors?.present_link_2} />
        {!breakpoint.md && (
          <StatusHint key={'material-link-knowledge'}>
            <Button
              size={'small'}
              type={'link'}
              disabled={false}
              onClick={() => onKnowledgeClick('giftInstruction')}
            >
              Как прикрепить подарок?
            </Button>
          </StatusHint>
        )}
      </FormBlock>
    </Flex>
  );
};
