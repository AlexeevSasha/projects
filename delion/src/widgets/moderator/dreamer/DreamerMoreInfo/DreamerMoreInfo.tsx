import { Space } from 'antd';
import type { Dreamer } from '@entities/dreamer';
import { InformationBox } from '@features/moderator';
import { Paragraph } from '@shared/ui';

export const DreamerMoreInfo = (props: Dreamer) => {
  return (
    <Space size={'middle'} direction={'vertical'}>
      <Paragraph style={{ paddingLeft: 8 }} strong level={4}>
        Дополнительная информация
      </Paragraph>
      <InformationBox
        title={'Расскажите о мечтателе и его увлечениях'}
        description={props.dreamer_info}
      />
      <InformationBox
        title={'Чем интересуется мечтатель?'}
        description={props.interest.map((el, i, array) => (
          <span key={el.value}>
            {el.label}
            {i !== array.length - 1 ? ', ' : ''}
          </span>
        ))}
      />
      <InformationBox
        title={'Есть ли у мечтателя опыт участия в проектах и конкурсах? Опишите в каких'}
        description={props.participation_experience}
      />
      <InformationBox
        title={'Есть ли у мечтателя достижения? Опишите какие'}
        description={props.achievements}
      />
      <InformationBox
        title={'Как у мечтателя возникло заветное желание?'}
        description={props.cherished_desire}
      />
    </Space>
  );
};
