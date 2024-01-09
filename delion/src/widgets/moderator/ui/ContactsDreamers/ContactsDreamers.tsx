import { Space } from 'antd';
import { Paragraph } from '@shared/ui';
import css from './ContactsDreamers.module.scss';

interface IProps {
  name: string;
  phone: string;
  settlement: string;
}

export const ContactsDreamers = (props: IProps) => {
  return (
    <Space size={'middle'} direction={'vertical'} className={css.container}>
      <Space direction={'vertical'}>
        <Paragraph level={4} strong>
          Контакты
        </Paragraph>
        <Paragraph level={4}>{props.name}</Paragraph>
        <Paragraph className={css.container__blue} level={4}>
          {props.phone}
        </Paragraph>
      </Space>
      <Space direction={'vertical'}>
        <Paragraph level={4} strong>
          Адрес проживания
        </Paragraph>
        <Paragraph level={4}>{props.settlement}</Paragraph>
      </Space>
    </Space>
  );
};
