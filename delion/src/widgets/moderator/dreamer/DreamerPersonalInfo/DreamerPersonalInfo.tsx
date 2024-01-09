import { Col, Grid, Row, Space } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import dayjs from 'dayjs';
import type { Dreamer } from '@entities/dreamer';
import { DreamerWishBox, getNosologyIcon, DreamerAvatar } from '@features/dreamer';
import { InformationBox } from '@features/moderator';
import { Button } from '@shared/ui';
import { ModeratorPopover } from '../ModeratorPopover';
import css from './DreamerPersonalInfo.module.scss';

interface IProps {
  dreamer: Dreamer;
  name: NamePath;
}

export const DreamerPersonalInfo = ({ name, dreamer }: IProps) => {
  const breakpoint = Grid.useBreakpoint();
  return (
    <Space size={breakpoint.md ? 'middle' : 'large'} direction={'vertical'}>
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
      <InformationBox
        title={'Дата рождения'}
        description={
          <Space>
            <span>{dayjs(dreamer.birth_date || '').format('D MMMM YYYY')}</span>
            <span>{dreamer.age} лет</span>
          </Space>
        }
        catalogue={'Birthday'}
        name={[name, 'birth_date']}
        popover={<ModeratorPopover name={'birthday'} />}
      />
      <InformationBox
        title={'СНИЛС'}
        description={
          <Space>
            {dreamer.snils_number && <span>{dreamer.snils_number}</span>}
            <Button textLink type={'text'} href={dreamer.snils_file.file} target={'_blank'}>
              Открыть фото
            </Button>
          </Space>
        }
        catalogue={'Snils'}
        name={[name, 'snils_number']}
        popover={<ModeratorPopover name={'snils'} />}
      />
      <InformationBox
        title={'Паспорт или свидетельство о рождении'}
        description={
          <Space>
            {dreamer.document_number && <span>{dreamer.document_number}</span>}
            <Button textLink type={'text'} href={dreamer.document_file?.file} target={'_blank'}>
              Открыть фото
            </Button>
          </Space>
        }
        name={[name, 'document_number']}
        catalogue={'Document'}
        popover={<ModeratorPopover name={'document'} />}
      />
      <InformationBox title={'Национальность'} description={dreamer.nationality} />
      <InformationBox
        title={'Нозология'}
        description={dreamer.nosology?.map(({ value, label }) => (
          <Space key={value} align='center'>
            <div className={css.nosology_icon}>{getNosologyIcon(value) || ''}</div>
            <span>{label}</span>
          </Space>
        ))}
      />
    </Space>
  );
};
