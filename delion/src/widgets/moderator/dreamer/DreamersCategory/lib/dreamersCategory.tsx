import { InfoCircleOutlined } from '@ant-design/icons';
import type { FormListFieldData } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import dayjs from 'dayjs';
import type { Dreamer } from '@entities/dreamer';
import { InformationBox, TitleWithDescriptionBlock } from '@features/moderator';
import { Button } from '@shared/ui';
import { ModeratorPopover } from '@widgets/moderator/dreamer/ModeratorPopover';

const parent = (props: Dreamer, name: FormListFieldData) => {
  return (
    <>
      <TitleWithDescriptionBlock
        description={
          'Проверьте данные родителя, который находится в непосредственном контакте с ребенком'
        }
        icon={<InfoCircleOutlined style={{ fontSize: 18 }} />}
        isBorder
      />
      <InformationBox
        title={'Категория'}
        description={props.category?.label}
        catalogue={'ParentInfo'}
        name={[name, 'parent_fio']}
        popover={<ModeratorPopover name={'parent_system'} />}
      />
      <InformationBox title={'ФИО'} description={props.parent_fio} />
      <InformationBox
        title={'Дата рождения'}
        description={dayjs(props.parent_birth_date || '').format('D MMMM YYYY')}
      />
      <InformationBox
        title={'Населенный пункт проживания родителя'}
        description={props.parent_settlement}
      />
      <InformationBox title={'Адрес регистрации родителя'} description={props.parent_address} />
    </>
  );
};

const twoDocs = (props: Dreamer, name: NamePath) => {
  return (
    <>
      <InformationBox title={'Категория'} description={props.category?.label} />

      <InformationBox
        title={['Лицевая сторона', 'Оборотная сторона']}
        description={[
          <Button
            key={'desc_front'}
            textLink
            type={'text'}
            href={props.document_front_file?.file}
            target={'_blank'}
          >
            Открыть фото
          </Button>,
          <Button
            key={'desc_back'}
            textLink
            type={'text'}
            href={props.document_back_file?.file}
            target={'_blank'}
          >
            Открыть фото
          </Button>,
        ]}
        name={[name, 'document_front_file']}
        multipleContent
        catalogue={'CategoryDocument'}
        popover={<ModeratorPopover name={'category_document'} />}
      />
    </>
  );
};

const docs = (props: Dreamer, name: NamePath) => {
  return (
    <>
      <InformationBox title={'Категория'} description={props.category?.label} />
      <InformationBox
        title={'Подтверждающий документ'}
        description={
          <Button
            key={'desc_back'}
            textLink
            type={'text'}
            href={props.document_front_file.file}
            target={'_blank'}
          >
            Открыть фото
          </Button>
        }
        catalogue={'CategoryDocument'}
        name={[name, 'document_front_file']}
        popover={<ModeratorPopover name={'category_document'} />}
      />
    </>
  );
};

export const dreamersCategory = {
  docs,
  parent,
  twoDocs,
};
