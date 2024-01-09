import { PhoneOutlined } from '@ant-design/icons';
import { Button, Divider, Space } from 'antd';
import { Paragraph } from '@shared/ui';
import css from './ContactPerson.module.scss';

export type ContactInfoProps = {
  title?: string;
  fullName?: string;
  phone?: string;
};

export const ContactPerson = (props: ContactInfoProps) => {
  const { title = 'Контактное лицо', fullName, phone } = props;

  return (
    <Space
      direction='vertical'
      align='start'
      size={16}
      className={css.wrapper}
      styles={{
        item: { width: '100%' },
      }}
    >
      <Space direction='vertical' align='start' size={4}>
        <Paragraph className={css.title}>{title}</Paragraph>
        <Paragraph className={css.fullName} level={3}>
          {fullName}
        </Paragraph>
      </Space>
      {phone && (
        <Space
          direction='vertical'
          align='start'
          size={12}
          split={<Divider style={{ margin: 0 }} />}
        >
          {phone && (
            <Button type='link' className={css.contact} href={`tel:${phone}`}>
              <PhoneOutlined />
              <Paragraph style={{ color: 'inherit' }}>{phone}</Paragraph>
            </Button>
          )}
        </Space>
      )}
    </Space>
  );
};
