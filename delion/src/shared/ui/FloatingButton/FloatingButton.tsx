import { UnorderedListOutlined } from '@ant-design/icons';
import css from './FloatingButton.module.scss';

interface IProps {
  onClick: () => void;
}

export const FloatingButton = ({ onClick }: IProps) => {
  return (
    <div className={css.container}>
      <div onClick={onClick} className={css.container__icon}>
        <UnorderedListOutlined />
      </div>
    </div>
  );
};
