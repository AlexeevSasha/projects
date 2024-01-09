import React, { useCallback } from 'react';
import { Col, Divider, Row, Space } from 'antd';
import dayjs from 'dayjs';
import type { DreamModerationRate } from '@entities/dreamer';
import { DreamerAvatar, DreamerWishBox } from '@features/dreamer';
import { FinalizeBoxWithError, FinalizeBoxWithValue } from '@features/moderator';
import { Button, TrafficLightInput } from '@shared/ui';

export const DreamerFinalizeCard = ({ info }: { info: DreamModerationRate }) => {
  const { dreamer } = info;
  const {
    dream_category: { type: dream_category_type },
  } = dreamer;

  const check = useCallback((keys: (keyof DreamModerationRate)[]) => {
    const check = keys.filter((el) => {
      const value = info[el];
      return Array.isArray(value) ? !!value.length : !!value;
    });

    return !!check.length;
  }, []);

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <Row gutter={[16, 16]}>
          <Col md={15} span={24}>
            <DreamerAvatar
              avatar={dreamer.photo?.file}
              name={`${dreamer.first_name} ${dreamer.last_name}`}
            />
          </Col>
          <Col md={9} span={24}>
            <DreamerWishBox dream_category={dreamer.dream_category} />
          </Col>
        </Row>
      </div>
      {check(['birth_date', 'snils_number', 'document_number', 'agreement_file']) && (
        <Space direction={'vertical'} size={'middle'}>
          {!!info.birth_date.length && (
            <FinalizeBoxWithError
              values={info.birth_date}
              catalogue={'Birthday'}
              title={'Дата рождения'}
              description={
                <Space>
                  <span>{dayjs(dreamer.birth_date || '').format('D MMMM YYYY')}</span>
                  <span>{dreamer.age} лет</span>
                </Space>
              }
            />
          )}
          {!!info.snils_number.length && (
            <FinalizeBoxWithError
              values={info.snils_number}
              catalogue={'Snils'}
              title={'СНИЛС'}
              description={
                <Space>
                  {dreamer.snils_number && <span>{dreamer.snils_number}</span>}
                  <Button textLink type={'text'} href={dreamer.snils_file.file} target={'_blank'}>
                    Открыть фото
                  </Button>
                </Space>
              }
            />
          )}
          {!!info.document_number.length && (
            <FinalizeBoxWithError
              values={info.document_number}
              catalogue={'Document'}
              title={'Паспорт или свидетельство о рождении'}
              description={
                <Space>
                  {dreamer.document_number && <span>{dreamer.document_number}</span>}
                  <Button
                    textLink
                    type={'text'}
                    href={dreamer.document_file?.file}
                    target={'_blank'}
                  >
                    Открыть фото
                  </Button>
                </Space>
              }
            />
          )}
          {!!info.agreement_file.length && (
            <FinalizeBoxWithError
              catalogue={'Agreement'}
              values={info.agreement_file}
              title={'Согласие на обработку данных'}
              description={
                <Button textLink type={'text'} href={dreamer.agreement_file.file} target={'_blank'}>
                  Открыть фото
                </Button>
              }
            />
          )}
          <Divider style={{ margin: '0 0 16px' }} />
        </Space>
      )}

      {check(['parent_fio', 'document_front_file']) && (
        <Space direction={'vertical'} size={'middle'}>
          {!!info.parent_fio.length && (
            <FinalizeBoxWithError
              catalogue={'ParentInfo'}
              values={info.agreement_file}
              title={'Категория'}
              description={dreamer.category?.label}
            />
          )}
          {!!info.document_front_file.length && <DocumentFile {...info} />}
          <Divider style={{ margin: '0 0 16px' }} />
        </Space>
      )}

      <Space direction={'vertical'} size={'middle'}>
        <FinalizeBoxWithValue
          strong
          title={'Доброе дело'}
          value={<TrafficLightInput disabled value={+info.good_deed_mark} />}
        />
        <Divider style={{ margin: '0 0 16px' }} />
      </Space>

      {dream_category_type !== 3 && (
        <Space direction={'vertical'} size={'middle'}>
          <FinalizeBoxWithValue
            strong
            title={'Желание мечтателя'}
            value={<TrafficLightInput disabled value={+info.dream_mark} />}
          />
          {!!info.dream_category.length && (
            <FinalizeBoxWithError
              catalogue={'DreamCategory'}
              values={info.dream_category}
              title={'Подкатегория'}
              description={dreamer.dream_category.label}
            />
          )}
          {!!info.present_link_1.length && (
            <FinalizeBoxWithError
              catalogue={'PresentLink'}
              values={info.present_link_1}
              title={'Ссылка на подарок из первого источника'}
              description={
                <Button textLink type={'text'} href={dreamer.present_link_1} target={'_blank'}>
                  {dreamer.present_link_1}
                </Button>
              }
            />
          )}
          {!!info.present_link_2.length && (
            <FinalizeBoxWithError
              catalogue={'PresentLink'}
              values={info.present_link_2}
              title={'Ссылка на подарок из второго источника'}
              description={
                <Button textLink type={'text'} href={dreamer.present_link_2} target={'_blank'}>
                  {dreamer.present_link_2}
                </Button>
              }
            />
          )}
          {!!info.theme_specification.length && (
            <FinalizeBoxWithError
              catalogue={'ThemeSpecification'}
              values={info.theme_specification}
              title={'Детализация тематики желания'}
              description={dreamer.theme_specification.label}
            />
          )}
          {info.short_dream_description && (
            <FinalizeBoxWithValue
              title={'Отредактируйте описание желания согласно правилам'}
              value={info.short_dream_description}
            />
          )}
          {info.present_title && (
            <FinalizeBoxWithValue title={'Название подарка'} value={info.present_title} />
          )}
          {info.price && <FinalizeBoxWithValue title={'Стоимость подарка'} value={info.price} />}
        </Space>
      )}
    </>
  );
};

const DocumentFile = (info: DreamModerationRate) => {
  if (info.dreamer.category.two_side_doc) {
    return (
      <FinalizeBoxWithError
        catalogue={'CategoryDocument'}
        values={info.document_front_file}
        title={['Лицевая сторона', 'Оборотная сторона']}
        description={[
          <Button
            key={'desc_front'}
            textLink
            type={'text'}
            href={info.dreamer.document_front_file?.file}
            target={'_blank'}
          >
            Открыть фото
          </Button>,
          <Button
            key={'desc_back'}
            textLink
            type={'text'}
            href={info.dreamer.document_back_file?.file}
            target={'_blank'}
          >
            Открыть фото
          </Button>,
        ]}
      />
    );
  }

  return (
    <FinalizeBoxWithError
      catalogue={'CategoryDocument'}
      values={info.document_front_file}
      title={'Подтверждающий документ'}
      description={
        <Button
          key={'desc_front'}
          textLink
          type={'text'}
          href={info.dreamer.document_front_file?.file}
          target={'_blank'}
        >
          Открыть фото
        </Button>
      }
    />
  );
};
