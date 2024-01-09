import { Space } from 'antd';
import { Tag } from '@shared/ui';

export type DreamersAccordionInterests = {
  interest: Option[];
};

export const DreamersAccordionInterests = (props: DreamersAccordionInterests) => {
  const { interest } = props;

  return (
    <Space wrap size={4}>
      {interest.map((item, index) => (
        <Tag key={`${item.value}-${index}`} title={item.label}>
          {item.label}
        </Tag>
      ))}
    </Space>
  );
};
