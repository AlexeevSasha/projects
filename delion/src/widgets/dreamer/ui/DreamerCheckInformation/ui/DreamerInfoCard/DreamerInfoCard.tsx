import { Col, Flex, Row, Space } from 'antd';
import dayjs from 'dayjs';
import type { Dreamer } from '@entities/dreamer';
import {
  DreamerAvatar,
  DreamerHints,
  DreamerInfo,
  DreamerWishBox,
  getNosologyIcon,
} from '@features/dreamer';
import { pluralizeYears } from '@shared/lib';
import { Button, Paragraph } from '@shared/ui';
import css from './DreamersInfoCard.module.scss';
import { useDreamInfoCategory } from './lib/hook/useDreamInfoCategory';
import { useDreamInfoWish } from './lib/hook/useDreamInfoWish';

export const DreamerInfoCard = (dreamer: Dreamer) => {
  const renderCategory = useDreamInfoCategory(dreamer);
  const renderWish = useDreamInfoWish(dreamer);

  return (
    <Space size={0} direction={'vertical'}>
      <Space direction={'vertical'} size={'large'}>
        <Row gutter={[16, 16]}>
          <Col xl={8} span={24}>
            <DreamerAvatar
              avatar={dreamer?.photo?.file}
              name={`${dreamer.first_name} ${dreamer.last_name}`}
            />
          </Col>
          <Col xl={9} span={24}>
            <DreamerWishBox dream_category={dreamer.dream_category} />
          </Col>
        </Row>
        <DreamerInfo
          info={[
            {
              name: 'Дата рождения',
              description: (
                <Flex gap={16}>
                  <Paragraph>{dayjs(dreamer.birth_date || '').format('D MMMM YYYY')}</Paragraph>
                  <Paragraph type={'secondary'}>
                    {+dreamer?.age || 0} {pluralizeYears(+dreamer?.age)}
                  </Paragraph>
                </Flex>
              ),
            },
            {
              name: 'СНИЛС',
              description: (
                <Space size={16}>
                  {dreamer.snils_number && <span>{dreamer.snils_number}</span>}
                  <Button
                    style={{ padding: 0, fontSize: '14px', height: 'auto' }}
                    type={'link'}
                    href={dreamer.snils_file.file}
                    target={'_blank'}
                  >
                    Открыть фото
                  </Button>
                </Space>
              ),
            },
            {
              name: 'Паспорт или свидетельство о рождении',
              description: (
                <Space size={16}>
                  {dreamer.document_number && <span>{dreamer.document_number}</span>}
                  <Button
                    style={{ padding: 0, fontSize: '14px', height: 'auto' }}
                    type={'link'}
                    href={dreamer.document_file?.file}
                    target={'_blank'}
                  >
                    Открыть фото
                  </Button>
                </Space>
              ),
            },
            {
              name: 'Нозология',
              description: dreamer.nosology?.map(({ value, label }) => (
                <Space key={value} align='center'>
                  <div className={css.icon}>{getNosologyIcon(value) || ''}</div>
                  <span>{label}</span>
                </Space>
              )),
            },
          ]}
          divider
          hint={
            <DreamerHints
              title={'Проверьте номер документа'}
              text={'Убедитесь, что на фото видны все данные'}
            />
          }
        />
      </Space>
      {renderCategory}
      <DreamerInfo
        title={'Дополнительная информация'}
        info={[
          {
            name: 'Расскажите о мечтателе и его увлечениях',
            description: dreamer.dreamer_info,
          },
          {
            name: 'Чем интересуется мечтатель?',
            description: dreamer.interest.map((el, i, array) => (
              <span key={el.value}>
                {el.label}
                {i !== array.length - 1 ? ', ' : ''}
              </span>
            )),
          },
          {
            name: 'Есть ли у мечтателя опыт участия в проектах и конкурсах? Опишите в каких',
            description: dreamer.participation_experience,
          },
          {
            name: 'Есть ли у мечтателя достижения? Опишите какие',
            description: dreamer.achievements,
          },
          {
            name: 'Как у мечтателя возникло заветное желание?',
            description: dreamer.cherished_desire,
          },
        ]}
        divider
      />
      <DreamerInfo
        title={'Доброе дело'}
        info={[
          {
            name: 'Категория доброго дела',
            description: dreamer.good_deed_category?.label,
          },
          {
            name: 'Описание доброго дела',
            description: dreamer.good_deed_description,
            hidden: !dreamer.good_deed_description,
          },
          {
            name: 'Ссылка на публикацию доброго дела в социальных сетях',
            hidden: !dreamer.good_deed_url,
            description: (
              <Button
                style={{ padding: 0, fontSize: '14px', height: 'auto' }}
                type={'link'}
                href={dreamer.good_deed_url}
                target={'_blank'}
                textLink
              >
                {dreamer.good_deed_url}
              </Button>
            ),
          },
        ]}
        divider
      />
      {renderWish}
    </Space>
  );
};
