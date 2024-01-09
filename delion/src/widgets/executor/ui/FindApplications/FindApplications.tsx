import { useCallback, useEffect, useState } from 'react';
import { Col, Form, Grid, Row, Space, Typography } from 'antd';
import { observer } from 'mobx-react';
import Image from 'next/image';
import type { ValueType } from 'rc-input-number';
import { DadataAutoComplete } from '@features/dadata';
import welcomeImageUrl from '@shared/assets/contacts-hint.png';
import DecemberCalendar from '@shared/assets/december-calendar.svg';
import { useStores } from '@shared/lib';
import { Button, MinMaxNumberInput, Paragraph, RadioGroup } from '@shared/ui';
import { ApplicationWelcomeMessage } from '@widgets/application';
import type { FindApplicationFormValues } from '@widgets/executor/model/FindApplicationFormValues';
import { FindApplicationsGiftsChoices } from '@widgets/executor/model/FindApplicationGiftsChoices';
import css from './FindApplications.module.scss';

const MAX_PRICE_AMOUNT_RUB = 300000;

const SHARED_NUMBER_INPUT_PROPS = {
  style: { width: '100%' },
  min: 0,
  max: MAX_PRICE_AMOUNT_RUB,
  formatter: priceFormatter,
  addonAfter: '₽',
  controls: false,
};

export type FindApplicationsProps = {
  onFinish(values: FindApplicationFormValues): void;
};

export const FindApplications = observer((props: FindApplicationsProps) => {
  const { onFinish } = props;
  const {
    featureFlags: {
      featureFlags: { dreams_on_showcase_available_flag },
    },
  } = useStores();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const breakpoints = Grid.useBreakpoint();

  const [submittable, setSubmittable] = useState(false);

  const onBlur = useCallback(() => {
    const minPrice = values['price_min'];
    const maxPrice = values['price_max'];

    if (minPrice && maxPrice) {
      // Если значение верхней границы суммы больше чем значение меньшей -> меняем местами
      if (minPrice > maxPrice) {
        return form.setFieldsValue({ ['price_max']: minPrice, ['price_min']: maxPrice });
      }

      // Если минимальная граница цены больше чем максимально допустимое -> меняем верхнее значение на максимальное
      if (minPrice >= MAX_PRICE_AMOUNT_RUB) {
        return form.setFieldsValue({
          ['price_max']: MAX_PRICE_AMOUNT_RUB,
          ['price_min']: undefined,
        });
      }
    }
  }, [form, values]);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setSubmittable(true),
      () => setSubmittable(false),
    );
  }, [values, form]);

  if (dreams_on_showcase_available_flag) {
    return (
      <ApplicationWelcomeMessage
        message={
          <>
            <Typography.Title level={5}>Исполнение желаний с 1декабря</Typography.Title>
            <Paragraph>
              Выбрать заявку и исполнить мечту можно будет <br /> с 1 декабря 2023 года появятся тут
            </Paragraph>
          </>
        }
        image={{
          src: DecemberCalendar,
          alt: 'Иллюстрация календаря',
          height: 200,
        }}
        buttonText=''
        onInitFlowClick={() => {}}
      />
    );
  }

  return (
    <Row align='middle' justify='center' className={css.container} gutter={[16, 16]}>
      <Col lg={16} sm={24} xs={24}>
        <Space direction={breakpoints?.xs ? 'vertical' : 'horizontal'} size={32} align='center'>
          <Image height={126} alt='Найдите мечтателей иллюстрация.' src={welcomeImageUrl} />
          <div>
            <Typography.Title level={5}>Найдите мечтателей</Typography.Title>
            <Paragraph>Выберите город и регион, чтобы увидеть заявки мечтателей</Paragraph>
          </div>
        </Space>
      </Col>

      <Col lg={16} sm={24} xs={24}>
        <Form
          onFinish={onFinish}
          form={form}
          initialValues={{
            suprises: FindApplicationsGiftsChoices.WITH_SURPRISES,
          }}
          onBlur={onBlur}
        >
          <div style={{ marginBottom: 30 }}>
            <DadataAutoComplete
              form={form}
              name='place'
              rules={[{ required: true }]}
              placeholder='Введите город или район'
            />
          </div>
          <Space
            styles={{ item: { width: '100%' } }}
            direction={breakpoints.xs ? 'vertical' : 'horizontal'}
            size={[24, 0]}
          >
            <MinMaxNumberInput
              minInput={{
                name: 'price_min',
                placeholder: 'Стоимость от',
                ...SHARED_NUMBER_INPUT_PROPS,
              }}
              maxInput={{
                name: 'price_max',
                placeholder: 'До',
                ...SHARED_NUMBER_INPUT_PROPS,
              }}
            />
            <RadioGroup
              name='suprises'
              options={[
                { label: 'Все подарки', value: FindApplicationsGiftsChoices.WITH_SURPRISES },
                { label: 'Без сюрпризов', value: FindApplicationsGiftsChoices.NO_SUPRISES },
              ]}
              optionType='button'
              className={css.suprisesToggle}
            />
          </Space>

          <Button type='primary' htmlType='submit' fullWidth disabled={!submittable}>
            Найти мечтателей
          </Button>
        </Form>
      </Col>
    </Row>
  );
});

function priceFormatter(value?: ValueType) {
  if (!value) {
    return '';
  }

  return new Intl.NumberFormat('ru').format(Number(value));
}
