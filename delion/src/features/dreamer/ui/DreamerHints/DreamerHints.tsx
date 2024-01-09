import { InfoCircleOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Paragraph } from '@shared/ui';
import css from './DreamerHints.module.scss';

interface IDreamerHintsProps {
  text: string;
  title?: string;
}

export const DreamerHints = ({ text, title }: IDreamerHintsProps) => {
  return (
    <div className={css.container}>
      <InfoCircleOutlined />
      <Space size={'middle'} direction={'vertical'}>
        {title && <Paragraph>{title}</Paragraph>}
        <Paragraph level={6}>{text}</Paragraph>
      </Space>
    </div>
  );
};
