import { Space } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { Dreamer } from '@entities/dreamer';
import { InformationBox, TitleWithInputBox } from '@features/moderator';
import { Button, TrafficLightInput } from '@shared/ui';
import { ModeratorPopover } from '@widgets/moderator/dreamer/ModeratorPopover';

interface IProps {
  dreamer: Dreamer;
  name: NamePath;
}

export const DreamerGoodDeed = ({ dreamer, name }: IProps) => {
  return (
    <Space size={'middle'} direction={'vertical'}>
      <TitleWithInputBox
        title={'Доброе дело'}
        strong
        input={<TrafficLightInput popover={<ModeratorPopover name={'good_deed'} />} />}
        name={[name, 'good_deed_mark']}
        rules={[{ required: true, message: 'Это поле обязательно' }]}
      />
      <InformationBox
        title={'Категория доброго дела'}
        description={dreamer.good_deed_category.label}
      />
      {dreamer.good_deed_description && (
        <InformationBox
          title={'Описание доброго дела'}
          description={dreamer.good_deed_description}
        />
      )}
      {dreamer.good_deed_url && (
        <InformationBox
          title={'Ссылка на публикацию доброго дела в социальных сетях'}
          description={
            <Button textLink type={'text'} href={dreamer.good_deed_url} target={'_blank'}>
              {dreamer.good_deed_url}
            </Button>
          }
        />
      )}
    </Space>
  );
};
