import type { FC } from 'react';
import { Form, Input } from 'antd';
import { FormBlock } from '@entities/application';
import { DreamerInterestSelect } from '@entities/dreamer';
import { Divider, StatusHint } from '@shared/ui';

export const DreamerInfo: FC = () => {
  return (
    <FormBlock
      hints={
        <StatusHint text='Убедитесь, что подробно заполнили этот раздел и указали подробную информацию о мечтателе. Это увеличит вероятность того, что исполнитель откликнется на загаданное желание.' />
      }
      titleHint={{
        title: (
          <StatusHint
            borderless
            text='Убедитесь, что подробно заполнили этот раздел и указали подробную информацию о мечтателе. Это увеличит вероятность того, что исполнитель откликнется на загаданное желание.'
          />
        ),
      }}
      title='Дополнительная информация'
      description='В данном разделе максимально расскажите о мечтателе: чем он увлекается, в каких мероприятиях и конкурсах принимает участие, какие имеет достижения.'
    >
      <Form.Item
        id='is_additional_info'
        name='dreamer_info'
        label='Расскажите о мечтателе и его увлечениях'
        rules={[
          {
            max: 500,
            message: 'Поле не должно превышать 500 символов',
          },
        ]}
      >
        <Input.TextArea placeholder='Расскажите о мечтателе' />
      </Form.Item>
      <DreamerInterestSelect />
      <Form.Item
        id='participation_experience'
        name={'participation_experience'}
        label='Есть ли у мечтателя опыт участия в проектах и конкурсах? Опишите в каких'
        rules={[
          {
            max: 500,
            message: 'Поле не должно превышать 500 символов',
          },
        ]}
      >
        <Input.TextArea placeholder='Опишите достижения мечтателя' />
      </Form.Item>
      <Form.Item
        id='achievements'
        name={'achievements'}
        label='Есть ли у мечтателя достижения? Опишите какие'
        rules={[
          {
            max: 500,
            message: 'Поле не должно превышать 500 символов',
          },
        ]}
      >
        <Input.TextArea placeholder='Опишите достижения мечтателя' />
      </Form.Item>
      <Form.Item
        id='cherished_desire'
        name={'cherished_desire'}
        label='Как у мечтателя возникло заветное желание?'
        rules={[
          {
            max: 500,
            message: 'Поле не должно превышать 500 символов',
          },
        ]}
      >
        <Input.TextArea placeholder='Расскажите о заветном желании' />
      </Form.Item>
      <Divider />
    </FormBlock>
  );
};
