import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { Checkbox, Flex, Form, type FormInstance, Input, Space } from 'antd';
import { type ContactsFields, FormBlock } from '@entities/application';
import { DadataAutoComplete } from '@features/dadata';
import hintImage from '@shared/assets/dreamer-hint.svg';
import { RULE_PHONE, RULE_REQUIRED } from '@shared/const/rules';
import { useStores } from '@shared/lib';
import { Divider, ImageHint, PopupHint, StatusHint } from '@shared/ui';
import { MaskedInput } from '@shared/ui/Inputs/MaskedInput/MaskedInput';

interface Props {
  form: FormInstance<ContactsFields>;
  nextBlock: ReactNode;
}

export const ContactsBlock: FC<Props> = ({ form, nextBlock }: Props) => {
  const {
    applicationS: { application, isContactDisabled },
  } = useStores();

  const [reset, setReset] = useState(false);

  return (
    <Space size={0} direction='vertical'>
      <FormBlock
        id='contacts'
        title={'Контактные данные представителя'}
        description={
          'Здесь будет храниться информация о вас, как о представителе мечтателя. Например, вы родитель или опекун ребенка.'
        }
        hints={
          <ImageHint
            title='Кто такой представитель?'
            description='Представитель — это вы. Как родитель и ответственное лицо вы подаете заявку на исполнение желания одного или нескольких мечтателей — ваших родных или опекаемых детей '
            image={hintImage}
          />
        }
        titleHint={{
          title: 'Кто такой представитель?',
          body: (
            <ImageHint
              description='Представитель — это вы. Как родитель и ответственное лицо вы подаете заявку на исполнение желания одного или нескольких мечтателей — ваших родных или опекаемых детей '
              image={hintImage}
            />
          ),
        }}
      >
        <Form.Item
          name={'agent_phone'}
          label='Телефон'
          extra='Укажите ваш актуальный номер телефона'
          rules={[RULE_REQUIRED, RULE_PHONE]}
        >
          {/* TODO replace with PhoneInput */}
          <MaskedInput
            disabled={isContactDisabled}
            mask={'+7 (000) 000-00-00'}
            pattern={/^\+7 \(9\d{2}\) \d{3}-\d{2}-\d{2}$/}
            placeholder='+7 (000) 000-00-00'
          />
        </Form.Item>
        <Form.Item
          name={'agent_email'}
          label='Email'
          extra='Будем пытаться связаться по почте, если телефон будет недоступен'
        >
          <Input type={'email'} disabled placeholder='Введите электронную почту' />
        </Form.Item>
      </FormBlock>
      <FormBlock
        title='Адрес проживания'
        description='Укажите фактический регион и населенный пункт проживания ребенка. Важно указать полное название города (села) на русском языке'
      >
        <DadataAutoComplete
          label={'Населённый пункт'}
          defaultValue={application.settlement}
          name='settlement'
          form={form}
          disabled={isContactDisabled}
          placeholder='Ставрополь'
          to_bound={'settlement'}
          from_bound={'city'}
          onReset={() => setReset((prev) => !prev)}
          resetFlag={reset}
          required
        />
      </FormBlock>
      <FormBlock
        hints={<StatusHint text='Если вы представитель детского дома, выберите этот пункт' />}
        hintAlign={'center'}
      >
        <Divider />
        <Flex>
          <Form.Item name={'orphanage'} valuePropName='checked'>
            <Checkbox disabled={isContactDisabled}>Я представитель детского дома </Checkbox>
          </Form.Item>
          <PopupHint
            title={
              <StatusHint
                borderless
                title='Если вы представитель детского дома, выберите этот пункт'
              />
            }
          />
        </Flex>
      </FormBlock>
      <FormBlock>{nextBlock}</FormBlock>
    </Space>
  );
};
