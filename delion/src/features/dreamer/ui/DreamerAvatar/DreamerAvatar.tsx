import { Avatar, Space } from 'antd';
import { Paragraph } from '@shared/ui';
import css from './DreamerAvatar.module.scss';

interface IDreamerAvatarProps {
  avatar: string;
  name: string;
}

export const DreamerAvatar = ({ avatar, name }: IDreamerAvatarProps) => {
  return (
    <Space className={css.container}>
      <Avatar size={72} shape='square' src={avatar} />
      <div className={css.container__text}>
        <Paragraph level={4}>{name}</Paragraph>
      </div>
    </Space>
  );
};
